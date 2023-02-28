import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildMembers } from "../../api/guildApi";
import { Dm, DmUser } from "../../api/types/dm";
import { User, Member, FriendRequest } from "../../api/types/user";
import {
  getDMs,
  getSelf,
  getUser,
  getFriends,
  getBlocked,
  getRequestedFriends,
} from "../../api/userApi";

type UserState = {
  users: Record<number, User>;

  friendIds: number[];
  requestedFriendIds: number[];
  pendingFriendIds: number[];
  blockedIds: number[];

  selfUser: number | null;

  guildMembersIds: Record<number, number[]>;
  guildBannedIds: Record<number, number[]>;
  userMemberCount: Record<number, number>;

  dms: Record<number, Dm>;
  dmIds: number[];
};

const initialState: UserState = {
  users: {},

  friendIds: [],
  requestedFriendIds: [],
  pendingFriendIds: [],
  blockedIds: [],

  selfUser: null,

  guildMembersIds: {},
  guildBannedIds: {},
  userMemberCount: {}, //also includes dms (counts how many times its been referenced (if reaches 0 user object is deleted))

  dmIds: [],
  dms: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFriendID: (state, action: PayloadAction<User>) => {
      state.friendIds.push(action.payload.UserId);
      state.users[action.payload.UserId] = action.payload;
    },
    addRequestedFriendID: (state, action: PayloadAction<User>) => {
      state.requestedFriendIds.push(action.payload.UserId);
      state.users[action.payload.UserId] = action.payload;
    },
    addPendingFriendID: (state, action: PayloadAction<User>) => {
      state.pendingFriendIds.push(action.payload.UserId);
      state.users[action.payload.UserId] = action.payload;
    },
    addBlockedID: (state, action: PayloadAction<User>) => {
      state.blockedIds.push(action.payload.UserId);
      state.users[action.payload.UserId] = action.payload;
    },
    addDMID: (state, action: PayloadAction<DmUser>) => {
      state.dmIds.push(action.payload.DmId);

      const dm: Dm = {
        DmId: action.payload.DmId,
        UserId: action.payload.UserInfo.UserId,
        Unread: action.payload.Unread,
      };

      if (state.userMemberCount[dm.UserId] === undefined) {
        state.userMemberCount[dm.UserId] = 0;
      }
      state.userMemberCount[dm.UserId] += 1;

      state.dms[action.payload.DmId] = dm;
    },
    addGuildMembersID: (state, action: PayloadAction<Member>) => {
      const { GuildId, UserInfo } = action.payload;
      if (state.guildMembersIds[GuildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildMembersIds[GuildId].push(UserInfo.UserId);
      state.users[UserInfo.UserId] = UserInfo;
      if (state.userMemberCount[UserInfo.UserId] === undefined) {
        state.userMemberCount[UserInfo.UserId] = 0;
      }
      state.userMemberCount[UserInfo.UserId] += 1;
    },
    addGuildBannedID: (state, action: PayloadAction<Member>) => {
      const { GuildId, UserInfo } = action.payload;
      if (state.guildBannedIds[GuildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildBannedIds[GuildId].push(UserInfo.UserId);
      state.users[UserInfo.UserId] = UserInfo;
      if (state.userMemberCount[UserInfo.UserId] === undefined) {
        state.userMemberCount[UserInfo.UserId] = 0;
      }
      state.userMemberCount[UserInfo.UserId]++;
    },
    removeGuildBannedID: (state, action: PayloadAction<Member>) => {
      const { GuildId, UserInfo } = action.payload;
      if (state.guildBannedIds[GuildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildBannedIds[GuildId] = state.guildBannedIds[GuildId].filter(
        (id) => id !== UserInfo.UserId
      );
      if (state.userMemberCount[UserInfo.UserId] === undefined) {
        console.log("not exists");
        return;
      }
      state.userMemberCount[UserInfo.UserId]--;
      if (
        (state.userMemberCount[UserInfo.UserId] === undefined ||
          state.userMemberCount[UserInfo.UserId] === 0) &&
        state.friendIds.indexOf(UserInfo.UserId) === -1 &&
        state.requestedFriendIds.indexOf(UserInfo.UserId) === -1 &&
        state.pendingFriendIds.indexOf(UserInfo.UserId) === -1 &&
        state.blockedIds.indexOf(UserInfo.UserId) === -1 &&
        state.dmIds.indexOf(UserInfo.UserId) === -1 &&
        state.guildMembersIds[GuildId].indexOf(UserInfo.UserId) === -1
      ) {
        delete state.users[UserInfo.UserId];
      }
    },
    removeFriendID: (state, action: PayloadAction<User>) => {
      state.friendIds = state.friendIds.filter(
        (id) => id !== action.payload.UserId
      );
      if (
        (state.userMemberCount[action.payload.UserId] === undefined ||
          state.userMemberCount[action.payload.UserId] === 0) &&
        state.friendIds.indexOf(action.payload.UserId) === -1 &&
        state.requestedFriendIds.indexOf(action.payload.UserId) === -1 &&
        state.pendingFriendIds.indexOf(action.payload.UserId) === -1 &&
        state.blockedIds.indexOf(action.payload.UserId) === -1 &&
        state.dmIds.indexOf(action.payload.UserId) === -1 &&
        state.selfUser !== action.payload.UserId
      ) {
        delete state.users[action.payload.UserId];
      }
    },
    removeRequestedFriendID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.requestedFriendIds = state.requestedFriendIds.filter(
        (id) => id !== action.payload.UserId
      );
      if (
        (state.userMemberCount[user.UserId] === undefined ||
          state.userMemberCount[user.UserId] === 0) &&
        state.friendIds.indexOf(user.UserId) === -1 &&
        state.requestedFriendIds.indexOf(user.UserId) === -1 &&
        state.pendingFriendIds.indexOf(user.UserId) === -1 &&
        state.blockedIds.indexOf(user.UserId) === -1 &&
        state.dmIds.indexOf(user.UserId) === -1 &&
        state.selfUser !== user.UserId
      ) {
        delete state.users[user.UserId];
        delete state.userMemberCount[user.UserId];
      }
    },
    removePendingFriendID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.pendingFriendIds = state.pendingFriendIds.filter(
        (id) => id !== action.payload.UserId
      );
      if (
        (state.userMemberCount[user.UserId] === undefined ||
          state.userMemberCount[user.UserId] === 0) &&
        state.friendIds.indexOf(user.UserId) === -1 &&
        state.requestedFriendIds.indexOf(user.UserId) === -1 &&
        state.pendingFriendIds.indexOf(user.UserId) === -1 &&
        state.blockedIds.indexOf(user.UserId) === -1 &&
        state.dmIds.indexOf(user.UserId) === -1 &&
        state.selfUser !== user.UserId
      ) {
        delete state.users[user.UserId];
        delete state.userMemberCount[user.UserId];
      }
    },
    removeBlockedID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.blockedIds = state.blockedIds.filter(
        (id) => id !== action.payload.UserId
      );
      if (
        (state.userMemberCount[user.UserId] === undefined ||
          state.userMemberCount[user.UserId] === 0) &&
        state.friendIds.indexOf(user.UserId) === -1 &&
        state.requestedFriendIds.indexOf(user.UserId) === -1 &&
        state.pendingFriendIds.indexOf(user.UserId) === -1 &&
        state.blockedIds.indexOf(user.UserId) === -1 &&
        state.dmIds.indexOf(user.UserId) === -1 &&
        state.selfUser !== user.UserId
      ) {
        delete state.users[user.UserId];
        delete state.userMemberCount[user.UserId];
      }
    },
    removeDMID: (state, action: PayloadAction<DmUser>) => {
      const { DmId, UserInfo } = action.payload;
      state.dmIds = state.dmIds.filter((id) => id !== DmId);
      if (state.dms[DmId] === undefined) {
        console.log("weird");
        return;
      }
      delete state.dms[DmId];
      if (state.userMemberCount[UserInfo.UserId] === undefined) {
        console.log("weird");
        return;
      }
      state.userMemberCount[UserInfo.UserId]--;
      if (
        (state.userMemberCount[UserInfo.UserId] === undefined ||
          state.userMemberCount[UserInfo.UserId] === 0) &&
        state.friendIds.indexOf(UserInfo.UserId) === -1 &&
        state.requestedFriendIds.indexOf(UserInfo.UserId) === -1 &&
        state.pendingFriendIds.indexOf(UserInfo.UserId) === -1 &&
        state.blockedIds.indexOf(UserInfo.UserId) === -1 &&
        state.dmIds.indexOf(UserInfo.UserId) === -1 &&
        state.selfUser !== UserInfo.UserId
      ) {
        delete state.users[UserInfo.UserId];
        delete state.userMemberCount[UserInfo.UserId];
      }
    },
    removeGuildMembersID: (state, action: PayloadAction<Member>) => {
      const { GuildId, UserInfo } = action.payload;
      if (state.userMemberCount[UserInfo.UserId] === undefined) {
        console.log("weird");
        return;
      }
      state.userMemberCount[UserInfo.UserId]--;
      if (
        (state.userMemberCount[UserInfo.UserId] === undefined ||
          state.userMemberCount[UserInfo.UserId] === 0) &&
        state.friendIds.indexOf(UserInfo.UserId) === -1 &&
        state.requestedFriendIds.indexOf(UserInfo.UserId) === -1 &&
        state.pendingFriendIds.indexOf(UserInfo.UserId) === -1 &&
        state.blockedIds.indexOf(UserInfo.UserId) === -1 &&
        state.dmIds.indexOf(UserInfo.UserId) === -1 &&
        state.selfUser !== UserInfo.UserId
      ) {
        delete state.users[UserInfo.UserId];
        delete state.userMemberCount[UserInfo.UserId];
      }
    },
    resetUsers: (state) => {
      state.blockedIds = [];
      state.dmIds = [];
      state.friendIds = [];
      state.requestedFriendIds = [];
      state.selfUser = null;
      state.users = {};
      state.userMemberCount = {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      getSelf.matchFulfilled,
      (state, action: PayloadAction<User>) => {
        state.selfUser = action.payload.UserId;
        state.users[action.payload.UserId] = action.payload;
      }
    );
    builder.addMatcher(
      getUser.matchFulfilled,
      (state, action: PayloadAction<User>) => {
        state.users[action.payload.UserId] = action.payload;
      }
    );
    builder.addMatcher(
      getDMs.matchFulfilled,
      (state, action: PayloadAction<DmUser[]>) => {
        for (const dmUser of action.payload) {
          state.dmIds.push(dmUser.DmId);

          const dm: Dm = {
            DmId: dmUser.DmId,
            UserId: dmUser.UserInfo.UserId,
            Unread: dmUser.Unread,
          };

          if (state.userMemberCount[dm.UserId] === undefined) {
            state.userMemberCount[dm.UserId] = 0;
          }
          state.userMemberCount[dm.UserId] += 1;

          state.dms[dmUser.DmId] = dm;
        }
      }
    );
    builder.addMatcher(
      getFriends.matchFulfilled,
      (state, action: PayloadAction<User[]>) => {
        for (const user of action.payload) {
          state.friendIds.push(user.UserId);
          state.users[user.UserId] = user;
        }
      }
    );
    builder.addMatcher(
      getGuildMembers.matchFulfilled,
      (state, action: PayloadAction<Member[]>) => {
        for (const member of action.payload) {
          if (state.guildMembersIds[member.GuildId] === undefined) {
            state.guildMembersIds[member.GuildId] = [];
          }
          state.guildMembersIds[member.GuildId].push(member.UserInfo.UserId);
          state.users[member.UserInfo.UserId] = member.UserInfo;
          state.userMemberCount[member.UserInfo.UserId] =
            (state.userMemberCount[member.UserInfo.UserId] || 0) + 1;
        }
      }
    );
    builder.addMatcher(
      getBlocked.matchFulfilled,
      (state, action: PayloadAction<User[]>) => {
        for (const user of action.payload) {
          state.blockedIds.push(user.UserId);
          state.users[user.UserId] = user;
        }
      }
    );
    builder.addMatcher(
      getRequestedFriends.matchFulfilled,
      (state, action: PayloadAction<FriendRequest>) => {
        for (const user of action.payload.Requested) {
          state.requestedFriendIds.push(user.UserId);
          state.users[user.UserId] = user;
        }
        for (const user of action.payload.Pending) {
          state.pendingFriendIds.push(user.UserId);
          state.users[user.UserId] = user;
        }
      }
    );
  },
});

export default userSlice.reducer;

export const {
  addFriendID,
  addRequestedFriendID,
  addBlockedID,
  addDMID,
  addGuildMembersID,
  addPendingFriendID,
  addGuildBannedID,
  removeFriendID,
  removeRequestedFriendID,
  removeBlockedID,
  removeDMID,
  removeGuildMembersID,
  removePendingFriendID,
  removeGuildBannedID,
} = userSlice.actions;
