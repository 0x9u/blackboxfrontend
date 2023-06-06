import {
  deleteGuildLoaded,
  removeCurrentDM,
  removeCurrentGuild,
  setLoadingWS,
} from "../app/slices/clientSlice";
import { RootState } from "../app/store";
import { chatApi } from "./api";
import { Msg } from "./types/msg";
import { Guild } from "./types/guild";
import { User, Member } from "./types/user";
import Events from "./types/events";
import {
  addGuildMsg,
  editMsg,
  removeAllGuildMsg,
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
  incUnreadMsg,
  incMentionMsg,
} from "../app/slices/guildSlice";
import { Invite } from "./types/guild";
import {
  addBlockedID,
  addDMID,
  addFriendID,
  addGuildAdminID,
  addGuildBannedID,
  addGuildMembersID,
  addPendingFriendID,
  addRequestedFriendID,
  removeBlockedID,
  removeDMID,
  removeFriendID,
  removeGuildAdminID,
  removeGuildBannedID,
  removeGuildMembers,
  removeGuildMembersID,
  removePendingFriendID,
  removeRequestedFriendID,
  updateUser,
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
              }, timeToPing / 4);
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
                  console.log(eventData);
                  //shitty change later - placeholder code
                  const selfUserId = (getState() as RootState).user.selfUser;
                  console.log(eventData);
                  if (eventData.mentionsEveryone) {
                    dispatch(incMentionMsg(eventData.guildId));
                  } else {
                    for (const mention of eventData.mentions) {
                      if (mention.id === selfUserId) {
                        dispatch(incMentionMsg(eventData.guildId));
                        break;
                      }
                    }
                  }
                  dispatch(incUnreadMsg(eventData.guildId));
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
                  dispatch(removeCurrentGuild(eventData.id));
                  dispatch(removeGuildMembers(eventData));
                  dispatch(removeAllGuildMsg(eventData));
                  dispatch(removeGuild(eventData));
                  dispatch(deleteGuildLoaded(eventData.id));
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
                  dispatch(removeCurrentDM(eventData.id));
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
                case Events.ADD_USER_GUILDADMIN: {
                  const eventData: Member = data.data;
                  dispatch(addGuildAdminID(eventData));
                  break;
                }
                case Events.REMOVE_USER_GUILDADMIN: {
                  const eventData: Member = data.data;
                  dispatch(removeGuildAdminID(eventData));
                  break;
                }
                case Events.UPDATE_SELF_USER_INFO:
                case Events.UPDATE_USER_INFO: {
                  const eventData: User = data.data;
                  dispatch(updateUser(eventData));
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
