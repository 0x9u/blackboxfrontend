import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildMembers } from "../../api/guildApi";
import { User, Member, FriendRequest } from "../../api/types/user";
import {
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
  dmIds : number[];

  selfUser: number | null;

  guildMembersIds: Record<number, number[]>;
  guildBannedIds: Record<number, number[]>;
  userMemberCount: Record<number, number>;
};

const initialState: UserState = {
  users: {},

  friendIds: [],
  requestedFriendIds: [],
  pendingFriendIds: [],
  blockedIds: [],
  dmIds : [],

  selfUser: null,

  guildMembersIds: {},
  guildBannedIds: {},
  userMemberCount: {}, //also includes dms (counts how many times its been referenced (if reaches 0 user object is deleted))
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFriendID: (state, action: PayloadAction<User>) => {
      state.friendIds.push(action.payload.id);
      state.users[action.payload.id] = action.payload;
    },
    addRequestedFriendID: (state, action: PayloadAction<User>) => {
      state.requestedFriendIds.push(action.payload.id);
      state.users[action.payload.id] = action.payload;
    },
    addPendingFriendID: (state, action: PayloadAction<User>) => {
      state.pendingFriendIds.push(action.payload.id);
      state.users[action.payload.id] = action.payload;
    },
    addBlockedID: (state, action: PayloadAction<User>) => {
      state.blockedIds.push(action.payload.id);
      state.users[action.payload.id] = action.payload;
    },
    addGuildMembersID: (state, action: PayloadAction<Member>) => {
      const { guildId, userInfo } = action.payload;
      if (state.guildMembersIds[guildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildMembersIds[guildId].push(userInfo.id);
      state.users[userInfo.id] = userInfo;
      if (state.userMemberCount[userInfo.id] === undefined) {
        state.userMemberCount[userInfo.id] = 0;
      }
      state.userMemberCount[userInfo.id] += 1;
    },
    addGuildBannedID: (state, action: PayloadAction<Member>) => {
      const { guildId, userInfo } = action.payload;
      if (state.guildBannedIds[guildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildBannedIds[guildId].push(userInfo.id);
      state.users[userInfo.id] = userInfo;
      if (state.userMemberCount[userInfo.id] === undefined) {
        state.userMemberCount[userInfo.id] = 0;
      }
      state.userMemberCount[userInfo.id]++;
    },
    addDMID: (state, action: PayloadAction<User>) => {
      state.dmIds.push(action.payload.id);
      state.users[action.payload.id] = action.payload;
    },
    removeDMID: (state, action: PayloadAction<User>) => {
      state.friendIds = state.friendIds.filter(
        (id) => id !== action.payload.id
      );
      if (state.userMemberCount[action.payload.id] === undefined) {
        console.log("not exists");
        return;
      }
      state.userMemberCount[action.payload.id]--;
      if (
        (state.userMemberCount[action.payload.id] === undefined ||
          state.userMemberCount[action.payload.id] === 0) &&
        state.friendIds.indexOf(action.payload.id) === -1 &&
        state.requestedFriendIds.indexOf(action.payload.id) === -1 &&
        state.pendingFriendIds.indexOf(action.payload.id) === -1 &&
        state.blockedIds.indexOf(action.payload.id) === -1 &&
        state.dmIds.indexOf(action.payload.id) === -1
      ) {
        delete state.users[action.payload.id];
      }
    },
    removeGuildBannedID: (state, action: PayloadAction<Member>) => {
      const { guildId, userInfo } = action.payload;
      if (state.guildBannedIds[guildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildBannedIds[guildId] = state.guildBannedIds[guildId].filter(
        (id) => id !== userInfo.id
      );
      if (state.userMemberCount[userInfo.id] === undefined) {
        console.log("not exists");
        return;
      }
      state.userMemberCount[userInfo.id]--;
      if (
        (state.userMemberCount[userInfo.id] === undefined ||
          state.userMemberCount[userInfo.id] === 0) &&
        state.friendIds.indexOf(userInfo.id) === -1 &&
        state.requestedFriendIds.indexOf(userInfo.id) === -1 &&
        state.pendingFriendIds.indexOf(userInfo.id) === -1 &&
        state.blockedIds.indexOf(userInfo.id) === -1 &&
        state.guildMembersIds[guildId].indexOf(userInfo.id) === -1 &&
        state.dmIds.indexOf(userInfo.id) === -1
      ) {
        delete state.users[userInfo.id];
      }
    },
    removeFriendID: (state, action: PayloadAction<User>) => {
      state.friendIds = state.friendIds.filter(
        (id) => id !== action.payload.id
      );
      if (
        (state.userMemberCount[action.payload.id] === undefined ||
          state.userMemberCount[action.payload.id] === 0) &&
        state.friendIds.indexOf(action.payload.id) === -1 &&
        state.requestedFriendIds.indexOf(action.payload.id) === -1 &&
        state.pendingFriendIds.indexOf(action.payload.id) === -1 &&
        state.blockedIds.indexOf(action.payload.id) === -1 &&
        state.selfUser !== action.payload.id &&
        state.dmIds.indexOf(action.payload.id) === -1
      ) {
        delete state.users[action.payload.id];
      }
    },
    removeRequestedFriendID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.requestedFriendIds = state.requestedFriendIds.filter(
        (id) => id !== action.payload.id
      );
      if (
        (state.userMemberCount[user.id] === undefined ||
          state.userMemberCount[user.id] === 0) &&
        state.friendIds.indexOf(user.id) === -1 &&
        state.requestedFriendIds.indexOf(user.id) === -1 &&
        state.pendingFriendIds.indexOf(user.id) === -1 &&
        state.blockedIds.indexOf(user.id) === -1 &&
        state.selfUser !== user.id &&
        state.dmIds.indexOf(user.id) === -1
      ) {
        delete state.users[user.id];
        delete state.userMemberCount[user.id];
      }
    },
    removePendingFriendID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.pendingFriendIds = state.pendingFriendIds.filter(
        (id) => id !== action.payload.id
      );
      if (
        (state.userMemberCount[user.id] === undefined ||
          state.userMemberCount[user.id] === 0) &&
        state.friendIds.indexOf(user.id) === -1 &&
        state.requestedFriendIds.indexOf(user.id) === -1 &&
        state.pendingFriendIds.indexOf(user.id) === -1 &&
        state.blockedIds.indexOf(user.id) === -1 &&
        state.selfUser !== user.id && 
        state.dmIds.indexOf(user.id) === -1
      ) {
        delete state.users[user.id];
        delete state.userMemberCount[user.id];
      }
    },
    removeBlockedID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.blockedIds = state.blockedIds.filter(
        (id) => id !== action.payload.id
      );
      if (
        (state.userMemberCount[user.id] === undefined ||
          state.userMemberCount[user.id] === 0) &&
        state.friendIds.indexOf(user.id) === -1 &&
        state.requestedFriendIds.indexOf(user.id) === -1 &&
        state.pendingFriendIds.indexOf(user.id) === -1 &&
        state.blockedIds.indexOf(user.id) === -1 &&
        state.selfUser !== user.id && 
        state.dmIds.indexOf(user.id) === -1
      ) {
        delete state.users[user.id];
        delete state.userMemberCount[user.id];
      }
    },
    removeGuildMembersID: (state, action: PayloadAction<Member>) => {
      const { guildId, userInfo } = action.payload;
      if (state.userMemberCount[userInfo.id] === undefined) {
        console.log("weird");
        return;
      }
      state.userMemberCount[userInfo.id]--;
      if (
        (state.userMemberCount[userInfo.id] === undefined ||
          state.userMemberCount[userInfo.id] === 0) &&
        state.friendIds.indexOf(userInfo.id) === -1 &&
        state.requestedFriendIds.indexOf(userInfo.id) === -1 &&
        state.pendingFriendIds.indexOf(userInfo.id) === -1 &&
        state.blockedIds.indexOf(userInfo.id) === -1 &&
        state.selfUser !== userInfo.id && 
        state.dmIds.indexOf(userInfo.id) === -1
      ) {
        delete state.users[userInfo.id];
        delete state.userMemberCount[userInfo.id];
      }
    },
    resetUsers: (state) => {
      state.blockedIds = [];
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
        state.users[action.payload.id] = action.payload;
      }
    );
    builder.addMatcher(
      getUser.matchFulfilled,
      (state, action: PayloadAction<User>) => {
        state.users[action.payload.id] = action.payload;
      }
    );
    builder.addMatcher(
      getFriends.matchFulfilled,
      (state, action: PayloadAction<User[]>) => {
        for (const user of action.payload) {
          state.friendIds.push(user.id);
          state.users[user.id] = user;
        }
      }
    );
    builder.addMatcher(
      getGuildMembers.matchFulfilled,
      (state, action: PayloadAction<Member[]>) => {
        for (const member of action.payload) {
          if (state.guildMembersIds[member.guildId] === undefined) {
            state.guildMembersIds[member.guildId] = [];
          }
          state.guildMembersIds[member.guildId].push(member.userInfo.id);
          state.users[member.userInfo.id] = member.userInfo;
          state.userMemberCount[member.userInfo.id] =
            (state.userMemberCount[member.userInfo.id] || 0) + 1;
        }
      }
    );
    builder.addMatcher(
      getBlocked.matchFulfilled,
      (state, action: PayloadAction<User[]>) => {
        for (const user of action.payload) {
          state.blockedIds.push(user.id);
          state.users[user.id] = user;
        }
      }
    );
    builder.addMatcher(
      getRequestedFriends.matchFulfilled,
      (state, action: PayloadAction<FriendRequest>) => {
        for (const user of action.payload.requested) {
          state.requestedFriendIds.push(user.id);
          state.users[user.id] = user;
        }
        for (const user of action.payload.pending) {
          state.pendingFriendIds.push(user.id);
          state.users[user.id] = user;
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
  addGuildMembersID,
  addPendingFriendID,
  addGuildBannedID,
  addDMID,
  removeDMID,
  removeFriendID,
  removeRequestedFriendID,
  removeGuildMembersID,
  removePendingFriendID,
  removeGuildBannedID,
  removeBlockedID,
} = userSlice.actions;
