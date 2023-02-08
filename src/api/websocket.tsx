import {
  ApiProvider,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setLoadingWS } from "../app/reducers/clientReducer";
import { RootState } from "../app/store";
import { chatApi } from "./api";
import { Msg } from "./types/msg";
import Events from "./types/events";
import guildApi from "./guildApi";

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
                  },
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
                case Events.CREATE_MESSAGE: {
                  const eventData: Msg = data.Data;
                  dispatch(
                    guildApi.util.updateQueryData(
                      "getGuildMsgs",
                      eventData.GuildId,
                      (msgs) => {
                        msgs.push(eventData);
                      }
                    )
                  );
                  break;
                }
                case Events.DELETE_MESSAGE: {
                  const eventData: Msg = data.Data;
                  dispatch(
                    guildApi.util.updateQueryData(
                      "getGuildMsgs",
                      eventData.GuildId,
                      (msgs) => {
                        msgs = msgs.filter((msg) => msg.MsgId !== eventData.MsgId);
                      }
                    )
                  );
                  break;
                }
              }

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
