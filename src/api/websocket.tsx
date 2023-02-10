import { setLoadingWS } from "../app/slices/clientSlice";
import { RootState } from "../app/store";
import { chatApi } from "./api";
import { Msg } from "./types/msg";
import { Guild } from "./types/guild";
import Events from "./types/events";
import {
  addDmMsg,
  addGuildMsg,
  editMsg,
  removeAuthorMsg,
  removeDmMsg,
  removeGuildMsg,
} from "../app/slices/msgSlice";
import { addGuild, addInvite, removeGuild, removeInvite, updateGuild } from "../app/slices/guildSlice";
import { Invite } from "./types/guild";

enum OpCodes {
  DISPATCH = 0,
  IDENTIFY,
  HELLO,
  READY,
  CLOSE = 8,
  HEARTBEAT = 9,
  HEARTBEATACK = 10,
}

type DataFrame = {
  Op: OpCodes;
  Data: any;
  Event: string;
};

type HelloFrame = {
  Token: string;
};

type HelloResFrame = {
  HeartbeatInterval: number;
};

export const gatewayApi = chatApi.injectEndpoints({
  endpoints: (builder) => ({
    startWS: builder.query({
      queryFn: () => ({ data: null }),
      onCacheEntryAdded: async (
        arg,
        { dispatch, getState, cacheEntryRemoved, updateCachedData }
      ) => {
        const ws = new WebSocket("ws://localhost:8080/ws");
        //put a recursive function if it disconnects or something later
        dispatch(setLoadingWS(true));
        ws.onopen = () => {
          console.log("ws connected");
        };
        ws.onmessage = (e) => {
          console.log(e);
          const data: DataFrame = JSON.parse(e.data);
          switch (data.Op) {
            case OpCodes.HELLO:
              const hello: HelloResFrame = e.data.Data;
              setInterval(() => {
                ws.send(
                  JSON.stringify({
                    Op: OpCodes.HEARTBEAT,
                    Data: null,
                    Event: "",
                  } as DataFrame)
                );
              }, hello.HeartbeatInterval);
              break;
            case OpCodes.IDENTIFY:
              console.log("identify");
              ws.send(
                JSON.stringify({
                  Op: OpCodes.IDENTIFY,
                  Data: {
                    Token: (getState() as RootState).auth.token,
                  } as HelloFrame,
                  Event: "",
                } as DataFrame)
              );
              break;
            case OpCodes.CLOSE:
              console.log("close");
              break;
            case OpCodes.DISPATCH:
              console.log("dispatch");

              switch (data.Event) {
                case Events.CREATE_GUILD_MESSAGE: {
                  const eventData: Msg = data.Data;
                  dispatch(
                    addGuildMsg({
                      guildId: eventData.GuildId,
                      msg: eventData,
                    })
                  );
                  break;
                }
                case Events.DELETE_GUILD_MESSAGE: {
                  const eventData: Msg = data.Data;
                  dispatch(removeGuildMsg(eventData));
                  break;
                }
                case Events.UPDATE_GUILD_MESSAGE:
                case Events.UPDATE_DM_MESSAGE: {
                  const eventData: Msg = data.Data;
                  dispatch(editMsg(eventData));
                  break;
                }
                case Events.CLEAR_USER_DM_MESSAGES:
                case Events.CLEAR_USER_MESSAGES: {
                  const eventData: Msg = data.Data;
                  dispatch(removeAuthorMsg(eventData));
                  break;
                }
                case Events.DELETE_DM_MESSAGE: {
                  const eventData: Msg = data.Data;
                  dispatch(removeDmMsg(eventData));
                  break;
                }
                case Events.CREATE_DM_MESSAGE: {
                  const eventData: Msg = data.Data;
                  dispatch(addDmMsg(eventData));
                  break;
                }
                case Events.CREATE_INVITE: {
                  const eventData: Invite = data.Data;
                  dispatch(addInvite(eventData));
                  break;
                }
                case Events.DELETE_INVITE: {
                  const eventData: Invite = data.Data;
                  dispatch(removeInvite(eventData));
                  break;
                }
                case Events.CREATE_GUILD: {
                  const eventData: Guild = data.Data;
                  dispatch(addGuild(eventData));
                  break;
                }
                case Events.DELETE_GUILD: {
                  const eventData: Guild = data.Data;
                  dispatch(removeGuild(eventData));
                  break;
                }
                case Events.UPDATE_GUILD: {
                  const eventData: Guild = data.Data;
                  dispatch(updateGuild(eventData));
                  break;
                }
              }
              break;
            case OpCodes.READY:
              console.log("ready");
              dispatch(setLoadingWS(false));
              break;
          }
        };
        ws.onclose = () => {
          console.log("ws closed");
          dispatch(setLoadingWS(true));
        };
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});
