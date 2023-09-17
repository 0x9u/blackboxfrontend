import {
  deleteGuildLoaded,
  initDmGuildLoaded,
  initGuildLoaded,
  removeCurrentDM,
  removeCurrentGuild,
  setCurrentChatMode,
  setCurrentDM,
  setCurrentMode,
  setShowChatUserList,
  setUserDMtobeOpened,
  setWsStatus,
} from "../app/slices/clientSlice";
import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Msg, UnreadMsg } from "./types/msg";
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
  addTyping,
  removeTyping,
} from "../app/slices/guildSlice";
import { Invite } from "./types/guild";
import {
  addBlockedID,
  addDmUserId,
  addFriendID,
  addGuildAdminID,
  addGuildBannedID,
  addGuildMembersID,
  addPendingFriendID,
  addRequestedFriendID,
  removeBlockedID,
  removeDmUserId,
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
import { getGuildMsgs } from "./guildApi";

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

// Define your action types
const WS_CONNECT = "WS_CONNECT";
const WS_DISCONNECT = "WS_DISCONNECT";

// Define your Redux actions
export const wsConnect = () => ({ type: WS_CONNECT });
export const wsDisconnect = () => ({ type: WS_DISCONNECT });

const gatewayAPI: Middleware = (storeAPI) => {
  let ws: WebSocket | null = null;
  const dispatch = storeAPI.dispatch;
  const getState = storeAPI.getState as () => RootState;

  let timeoutTyping: Record<string, ReturnType<typeof setTimeout>> = {};

  return (next) => (action) => {
    switch (action.type) {
      case WS_CONNECT:
        ws = new WebSocket("ws://localhost:8080/api/ws/");
        ws.onopen = () => {
          console.log("ws connected");
          console.log("ws a", OpCodes.HELLO);
        };
        ws.onerror = (e) => {
          console.log("ws error", e);
        };
        var pingInterval: ReturnType<typeof setInterval>;
        var timeToPing: number;
        ws.onmessage = (e) => {
          const data: DataFrame = JSON.parse(e.data);
          switch (data.op) {
            case OpCodes.READY:
              console.log(timeToPing);
              pingInterval = setInterval(() => {
                //TODO: add a deadline check to see if server responded
                console.log("pinging")
                ws!.send(
                  JSON.stringify({
                    op: OpCodes.HEARTBEAT,
                    data: null,
                    event: "",
                  } as DataFrame)
                );
              }, timeToPing / 5);
              console.log("ready");
              dispatch(setWsStatus("connected"));
              break;
            case OpCodes.HELLO:
              const hello: HelloResFrame = data.data;
              timeToPing = hello.heartbeatInterval;
              ws!.send(
                JSON.stringify({
                  op: OpCodes.IDENTIFY,
                  data: {
                    token: getState().auth.token,
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
                case Events.CREATE_GUILD_MESSAGE:
                case Events.CREATE_DM_MESSAGE: {
                  const eventData: Msg = data.data;
                  console.log(eventData);
                  //shitty change later - placeholder code
                  const selfUserId = getState().user.selfUser;
                  console.log("msg sent", eventData);
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
                  const currentId =
                    (getState().client.currentChatMode === "guild"
                      ? getState().client.currentGuild
                      : getState().client.currentDM) ?? "";
                  const msgLength =
                    getState().msg.guildMsgIds[currentId]?.length ?? 0;
                  const msgsLoaded =
                    getState().client.guildLoaded[currentId].msgs ?? false;
                  if (msgLength < 50 && !msgsLoaded && currentId !== "") {
                    const lastMsgId =
                      getState().msg.guildMsgIds[currentId][
                        getState().msg.guildMsgIds[currentId].length - 1
                      ];
                    const lastTime = Math.floor(
                      new Date(
                        getState().msg.msgs[lastMsgId].created
                      ).valueOf() / 1000
                    );
                    dispatch( //shitty change later - placeholder code (cant use useAppDispatch because its before intiailization since this is middleware)
                      getGuildMsgs({
                        id: currentId,
                        time: lastTime,
                      }) as any
                    );
                  }
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
                  eventData.unread = {} as UnreadMsg;
                  dispatch(addGuild(eventData));
                  dispatch(initGuildLoaded(eventData.id));
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
                  console.log(eventData);
                  dispatch(addDm(eventData));
                  dispatch(initDmGuildLoaded(eventData.id));
                  dispatch(
                    addDmUserId({
                      userId: eventData.userInfo.id,
                      dmId: eventData.id,
                    })
                  );
                  console.log(
                    getState().client.userDMtobeOpened,
                    eventData.userInfo.id
                  );
                  if (
                    getState().client.userDMtobeOpened === eventData.userInfo.id
                  ) {
                    dispatch(setCurrentDM(eventData.id));
                    dispatch(setCurrentChatMode("dm"));
                    dispatch(setCurrentMode("chat"));
                    dispatch(setShowChatUserList(false));
                    dispatch(setUserDMtobeOpened(null));
                  }
                  break;
                }
                case Events.DELETE_DM: {
                  const eventData: Dm = data.data;

                  console.log("deleting", eventData);

                  dispatch(removeCurrentDM(eventData.id));
                  dispatch(removeDm(eventData));
                  dispatch(removeDmUserId({ userId: eventData.userInfo.id }));
                  dispatch(deleteGuildLoaded(eventData.id));
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
                  dispatch(removeRequestedFriendID(eventData));
                  dispatch(removePendingFriendID(eventData));
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

                  dispatch(removePendingFriendID(eventData));
                  dispatch(removeRequestedFriendID(eventData));
                  dispatch(removeFriendID(eventData));

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
                case Events.USER_DM_TYPING:
                case Events.USER_TYPING: {
                  const eventData: Member = data.data;
                  const guildId = eventData.guildId;
                  const userId = eventData.userInfo.id;
                  if (userId === getState().user.selfUser) return;

                  if (timeoutTyping[userId]) {
                    clearTimeout(timeoutTyping[userId]);
                  } else {
                    dispatch(addTyping({ id: guildId, userId }));
                  }
                  timeoutTyping[userId] = setTimeout(() => {
                    dispatch(removeTyping({ id: guildId, userId }));
                    delete timeoutTyping[userId];
                  }, 7500);
                  break;
                }
                case Events.LOG_OUT: {
                  //no data received from log
                  dispatch(clearToken());


                  break;
                }
              }
              break;
          }
        };
        ws.onclose = () => {
          console.log("ws closed");
          clearInterval(pingInterval);
          dispatch(setWsStatus("disconnected"));
        };
        break;
      case WS_DISCONNECT:
        if (ws !== null) {
          ws.close();
        }
        ws = null;
        break;
      default:
        return next(action);
    }
  };
};

export default gatewayAPI;
