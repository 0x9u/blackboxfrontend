import { setLoadingWS } from "../app/slices/clientSlice";
import { RootState } from "../app/store";
import { chatApi } from "./api";
import { Msg } from "./types/msg";
import { Guild } from "./types/guild";
import { User, Member } from "./types/user";
import Events from "./types/events";
import {
  addGuildMsg,
  editMsg,
  removeAuthorMsg,
  removeGuildMsg,
} from "../app/slices/msgSlice";
import {
  addGuild,
  addInvite,
  removeGuild,
  removeInvite,
  updateGuild,
  removeDm,
  addDm,
} from "../app/slices/guildSlice";
import { Invite } from "./types/guild";
import {
  addBlockedID,
  addDMID,
  addFriendID,
  addGuildBannedID,
  addGuildMembersID,
  addPendingFriendID,
  addRequestedFriendID,
  removeBlockedID,
  removeDMID,
  removeFriendID,
  removeGuildBannedID,
  removeGuildMembersID,
  removePendingFriendID,
  removeRequestedFriendID,
} from "../app/slices/userSlice";
import { Dm } from "./types/dm";
import { clearToken } from "../app/slices/authSlice";

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
  op: OpCodes;
  data: any;
  event: string;
};

type HelloFrame = {
  token: string;
};

type HelloResFrame = {
  heartbeatInterval: number;
};

const gatewayApi = chatApi.injectEndpoints({
  endpoints: (builder) => ({
    startWS: builder.query({
      queryFn: () => ({ data: null }),
      onCacheEntryAdded: async (
        arg,
        { dispatch, getState, cacheEntryRemoved, updateCachedData }
      ) => {
        const ws = new WebSocket("ws://localhost:8080/api/ws/");
        //put a recursive function if it disconnects or something later
        dispatch(setLoadingWS(true));
        ws.onopen = () => {
          console.log("ws connected");
          console.log("ws a", OpCodes.HELLO);
        };
        var pingInterval: ReturnType<typeof setInterval>;
        var timeToPing: number;
        ws.onmessage = (e) => {
          const data: DataFrame = JSON.parse(e.data);
          switch (data.op) {
            case OpCodes.READY:
              console.log(timeToPing);
              pingInterval = setInterval(() => {
                ws.send(
                  JSON.stringify({
                    op: OpCodes.HEARTBEAT,
                    data: null,
                    event: "",
                  } as DataFrame)
                );
              }, timeToPing - 5000);
              break;
            case OpCodes.HELLO:
              const hello: HelloResFrame = data.data;
              timeToPing = hello.heartbeatInterval;
              ws.send(
                JSON.stringify({
                  op: OpCodes.IDENTIFY,
                  data: {
                    token: (getState() as RootState).auth.token,
                  } as HelloFrame,
                  event: "",
                } as DataFrame)
              );
              break;
            case OpCodes.CLOSE:
              console.log("close");
              break;
            case OpCodes.DISPATCH:
              console.log("dispatch");

              switch (data.event) {
                case Events.CREATE_GUILD_MESSAGE: {
                  const eventData: Msg = data.data;
                  dispatch(
                    addGuildMsg({
                      guildId: eventData.guildId,
                      msg: eventData,
                    })
                  );
                  break;
                }
                case Events.DELETE_GUILD_MESSAGE: {
                  const eventData: Msg = data.data;
                  dispatch(removeGuildMsg(eventData));
                  break;
                }
                case Events.UPDATE_GUILD_MESSAGE:
                case Events.UPDATE_DM_MESSAGE: {
                  const eventData: Msg = data.data;
                  dispatch(editMsg(eventData));
                  break;
                }
                case Events.CLEAR_USER_DM_MESSAGES:
                case Events.CLEAR_USER_MESSAGES: {
                  const eventData: Msg = data.data;
                  dispatch(removeAuthorMsg(eventData));
                  break;
                }
                case Events.DELETE_DM_MESSAGE: {
                  const eventData: Msg = data.data;
                  dispatch(removeGuildMsg(eventData));
                  break;
                }
                case Events.CREATE_DM_MESSAGE: {
                  const eventData: Msg = data.data;
                  dispatch(
                    addGuildMsg({ guildId: eventData.guildId, msg: eventData })
                  );
                  break;
                }
                case Events.CREATE_INVITE: {
                  const eventData: Invite = data.data;
                  dispatch(addInvite(eventData));
                  break;
                }
                case Events.DELETE_INVITE: {
                  const eventData: Invite = data.data;
                  dispatch(removeInvite(eventData));
                  break;
                }
                case Events.CREATE_GUILD: {
                  const eventData: Guild = data.data;
                  dispatch(addGuild(eventData));
                  break;
                }
                case Events.DELETE_GUILD: {
                  const eventData: Guild = data.data;
                  dispatch(removeGuild(eventData));
                  break;
                }
                case Events.UPDATE_GUILD: {
                  const eventData: Guild = data.data;
                  dispatch(updateGuild(eventData));
                  break;
                }
                case Events.ADD_USER_GUILDLIST: {
                  const eventData: Member = data.data;
                  dispatch(addGuildMembersID(eventData));
                  break;
                }
                case Events.REMOVE_USER_GUILDLIST: {
                  const eventData: Member = data.data;
                  dispatch(removeGuildMembersID(eventData));
                  break;
                }
                case Events.ADD_USER_BANLIST: {
                  const eventData: Member = data.data;
                  dispatch(addGuildBannedID(eventData));
                  break;
                }
                case Events.REMOVE_USER_BANLIST: {
                  const eventData: Member = data.data;
                  dispatch(removeGuildBannedID(eventData));
                  break;
                }
                case Events.CREATE_DM: {
                  const eventData: Dm = data.data;
                  dispatch(addDm(eventData));
                  dispatch(addDMID(eventData.userInfo));
                  break;
                }
                case Events.DELETE_DM: {
                  const eventData: Dm = data.data;
                  dispatch(removeDm(eventData));
                  dispatch(removeDMID(eventData.userInfo));
                  break;
                }
                case Events.ADD_FRIEND_REQUEST: {
                  const eventData: User = data.data;
                  dispatch(addRequestedFriendID(eventData));
                  break;
                }
                case Events.REMOVE_FRIEND_REQUEST: {
                  const eventData: User = data.data;
                  dispatch(removeRequestedFriendID(eventData));
                  break;
                }
                case Events.ADD_USER_FRIENDLIST: {
                  const eventData: User = data.data;
                  dispatch(addFriendID(eventData));
                  break;
                }
                case Events.REMOVE_USER_FRIENDLIST: {
                  const eventData: User = data.data;
                  dispatch(removeFriendID(eventData));
                  break;
                }
                case Events.ADD_FRIEND_INCOMING_REQUEST: {
                  const eventData: User = data.data;
                  dispatch(addPendingFriendID(eventData));
                  break;
                }
                case Events.REMOVE_FRIEND_INCOMING_REQUEST: {
                  const eventData: User = data.data;
                  dispatch(removePendingFriendID(eventData));
                  break;
                }
                case Events.ADD_USER_BLOCKEDLIST: {
                  const eventData: User = data.data;
                  dispatch(addBlockedID(eventData));
                  break;
                }
                case Events.REMOVE_USER_BLOCKEDLIST: {
                  const eventData: User = data.data;
                  dispatch(removeBlockedID(eventData));
                  break;
                }
                case Events.LOG_OUT: {
                  //no data received from log
                  dispatch(clearToken());
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
          clearInterval(pingInterval);
          dispatch(setLoadingWS(true));
        };
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useStartWSQuery } = gatewayApi;

export default gatewayApi;
