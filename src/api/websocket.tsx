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
  setShowGuildDMSettings,
  setUserDMtobeOpened,
  setWsStatus,
} from "../app/slices/clientSlice";
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Msg, UnreadMsg } from "./types/msg";
import { Guild, Typing } from "./types/guild";
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
  //do not declare pingInterval inside the return function
  //it gets deleted somehow
  let pingInterval: ReturnType<typeof setInterval>;
  const dispatch = storeAPI.dispatch;
  const getState = storeAPI.getState as () => RootState;

  let timeoutTyping: Record<string, ReturnType<typeof setTimeout>> = {};

  return (next) => (action) => {
    switch (action.type) {
      case WS_CONNECT:
        ws = new WebSocket("ws://localhost:8080/api/ws/");
        ws.onopen = () => {
          console.log("ws connected");
        };
        ws.onerror = (e) => {
          console.log("ws error", e);
        };
        var timeToPing: number;
        var pingNo = 0;
        ws.onclose = (e) => {
          console.log("WS CLOSE", e);
          clearInterval(pingInterval);
          dispatch(setWsStatus("disconnected"));
          pingNo = 0;
        };
        ws.onmessage = (e) => {
          const data: DataFrame = JSON.parse(e.data);
          switch (data.op) {
            case OpCodes.READY:
              console.log(timeToPing);
              pingInterval = setInterval(() => {
                //TODO: add a deadline check to see if server responded
                console.log("ping", pingNo++);
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
                case Events.MESSAGE_CREATE: {
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
                case Events.MESSAGE_DELETE: {
                  const eventData: Msg = data.data;
                  const currentId =
                    (getState().client.currentChatMode === "guild"
                      ? getState().client.currentGuild
                      : getState().client.currentDM) ?? "";
                  const msgLength =
                    getState().msg.guildMsgIds[currentId]?.length ?? 0;
                  const msgsLoaded =
                    getState().client.guildLoaded[currentId].msgs ?? false;
                  //if there are still more messages to load
                  //might not be needed check later because of infinite scroll element
                  if (msgLength < 50 && !msgsLoaded && currentId !== "") {
                    const lastMsgId =
                      getState().msg.guildMsgIds[currentId][
                        getState().msg.guildMsgIds[currentId].length - 1
                      ];
                    const lastTime = Math.floor(
                      new Date(
                        getState().msg.msgs[lastMsgId].created ?? ""
                      ).valueOf() / 1000
                    );
                    dispatch(
                      //shitty change later - placeholder code (cant use useAppDispatch because its before intiailization since this is middleware)
                      getGuildMsgs({
                        id: currentId,
                        time: lastTime,
                      }) as any
                    );
                  }
                  dispatch(removeGuildMsg(eventData));
                  break;
                }
                case Events.MESSAGE_UPDATE: {
                  const eventData: Msg = data.data;
                  dispatch(editMsg(eventData));
                  break;
                }
                case Events.MESSAGES_USER_CLEAR: {
                  const eventData: Msg = data.data;
                  dispatch(removeAuthorMsg(eventData));
                  break;
                }
                case Events.MESSAGES_GUILD_CLEAR: {
                  const eventData: Msg = data.data;
                  dispatch(
                    removeAllGuildMsg({ id: eventData.guildId } as Guild)
                  );
                  break;
                }
                case Events.INVITE_CREATE: {
                  const eventData: Invite = data.data;
                  dispatch(addInvite(eventData));
                  break;
                }
                case Events.INVITE_DELETE: {
                  const eventData: Invite = data.data;
                  dispatch(removeInvite(eventData));
                  break;
                }
                case Events.GUILD_CREATE: {
                  const eventData: Guild = data.data;
                  eventData.unread = {} as UnreadMsg;
                  dispatch(addGuild(eventData));
                  dispatch(initGuildLoaded(eventData.id));
                  break;
                }
                case Events.GUILD_DELETE: {
                  const eventData: Guild = data.data;
                  dispatch(removeCurrentGuild(eventData.id));
                  dispatch(removeGuildMembers(eventData));
                  dispatch(removeAllGuildMsg(eventData));
                  dispatch(removeGuild(eventData));
                  dispatch(deleteGuildLoaded(eventData.id));
                  break;
                }
                case Events.GUILD_UPDATE: {
                  const eventData: Guild = data.data;
                  dispatch(updateGuild(eventData));
                  if (getState().client.showGuildDMSettings) {
                    dispatch(setShowGuildDMSettings(false));
                  }
                  break;
                }
                case Events.MEMBER_ADD: {
                  const eventData: Member = data.data;
                  dispatch(addGuildMembersID(eventData));
                  break;
                }
                case Events.MEMBER_REMOVE: {
                  const eventData: Member = data.data;
                  dispatch(removeGuildMembersID(eventData));
                  break;
                }
                case Events.MEMBER_BAN_ADD: {
                  const eventData: Member = data.data;
                  dispatch(addGuildBannedID(eventData));
                  break;
                }
                case Events.MEMBER_BAN_REMOVE: {
                  const eventData: Member = data.data;
                  dispatch(removeGuildBannedID(eventData));
                  break;
                }
                case Events.DM_CREATE: {
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
                case Events.DM_DELETE: {
                  const eventData: Dm = data.data;

                  console.log("deleting", eventData);

                  dispatch(removeCurrentDM(eventData.id));
                  dispatch(removeDm(eventData));
                  dispatch(removeDmUserId({ userId: eventData.userInfo.id }));
                  dispatch(deleteGuildLoaded(eventData.id));
                  break;
                }
                case Events.USER_FRIEND_REQUEST_ADD: {
                  const eventData: User = data.data;
                  dispatch(addRequestedFriendID(eventData));
                  break;
                }
                case Events.USER_FRIEND_REQUEST_REMOVE: {
                  const eventData: User = data.data;
                  dispatch(removeRequestedFriendID(eventData));
                  break;
                }
                case Events.USER_FRIEND_ADD: {
                  const eventData: User = data.data;
                  dispatch(addFriendID(eventData));
                  //dispatch(removeRequestedFriendID(eventData));
                  //dispatch(removePendingFriendID(eventData));
                  break;
                }
                case Events.USER_FRIEND_REMOVE: {
                  const eventData: User = data.data;
                  dispatch(removeFriendID(eventData));
                  break;
                }
                case Events.USER_FRIEND_INCOMING_REQUEST_ADD: {
                  const eventData: User = data.data;
                  dispatch(addPendingFriendID(eventData));
                  break;
                }
                case Events.USER_FRIEND_INCOMING_REQUEST_REMOVE: {
                  const eventData: User = data.data;
                  dispatch(removePendingFriendID(eventData));
                  break;
                }
                case Events.USER_BLOCKED_ADD: {
                  const eventData: User = data.data;

                  dispatch(removePendingFriendID(eventData));
                  dispatch(removeRequestedFriendID(eventData));
                  dispatch(removeFriendID(eventData));

                  dispatch(addBlockedID(eventData));
                  break;
                }
                case Events.USER_BLOCKED_REMOVE: {
                  const eventData: User = data.data;
                  dispatch(removeBlockedID(eventData));
                  break;
                }
                case Events.MEMBER_ADMIN_ADD: {
                  const eventData: Member = data.data;
                  dispatch(addGuildAdminID(eventData));
                  break;
                }
                case Events.MEMBER_ADMIN_REMOVE: {
                  const eventData: Member = data.data;
                  dispatch(removeGuildAdminID(eventData));
                  break;
                }
                case Events.USER_INFO_UPDATE: {
                  const eventData: User = data.data;
                  dispatch(updateUser(eventData));
                  break;
                }
                case Events.TYPING_START: {
                  const eventData: Typing = data.data;
                  const guildId = eventData.guildId;
                  const userId = eventData.userInfo.id;
                  if (userId === getState().user.selfUser) return;

                  if (timeoutTyping[userId]) {
                    clearTimeout(timeoutTyping[userId]);
                  } else {
                    dispatch(addTyping({ id: guildId, userId }));
                  }
                  //TODO: use timestamp to check if 5 seconds have passed
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
        break;
      case WS_DISCONNECT:
        console.log("disconnecting WS_DISCONNECT CALLED");
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
