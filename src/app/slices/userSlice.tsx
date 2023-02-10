import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildMembers } from "../../api/guildApi";
import { Dm, DmUser } from "../../api/types/dm";
import { User, Member } from "../../api/types/user";
import { getDMs, getSelf, getUser, getFriends } from "../../api/userApi";

type UserState = {
  users: Record<number, User>;

  friendIds: number[];
  requestedFriendIds: number[];
  blockedIds: number[];

  selfUser: number | null;

  guildMembersIds: Record<number, number[]>;
  userMemberCount: Record<number, number>;

  dms: Record<number, Dm>;
  dmIds: number[];
};

const initialState: UserState = {
  users: {},

  friendIds: [],
  requestedFriendIds: [],
  blockedIds: [],

  selfUser: null,

  guildMembersIds: {},
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
    addGuildMembersID: (
      state,
      action: PayloadAction<{ guildId: number; user: User }>
    ) => {
      const { guildId, user } = action.payload;
      if (state.guildMembersIds[guildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildMembersIds[guildId].push(user.UserId);
      state.users[user.UserId] = user;
      if (state.userMemberCount[user.UserId] === undefined) {
        state.userMemberCount[user.UserId] = 0;
      }
      state.userMemberCount[user.UserId] += 1;
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
        state.blockedIds.indexOf(user.UserId) === -1 &&
        state.dmIds.indexOf(user.UserId) === -1 &&
        state.selfUser !== user.UserId
      ) {
        delete state.users[user.UserId];
        delete state.userMemberCount[user.UserId];
      }
    },
    removeDMID: (state, action: PayloadAction<Dm>) => {
      const user = action.payload;
      state.dmIds = state.dmIds.filter((id) => id !== action.payload.DmId);
      if (state.dms[action.payload.DmId] === undefined) {
        console.log("weird");
        return;
      }
      delete state.dms[action.payload.DmId];
      if (state.userMemberCount[user.UserId] === undefined) {
        console.log("weird");
        return;
      }
      state.userMemberCount[user.UserId]--;
      if (
        (state.userMemberCount[user.UserId] === undefined ||
          state.userMemberCount[user.UserId] === 0) &&
        state.friendIds.indexOf(user.UserId) === -1 &&
        state.requestedFriendIds.indexOf(user.UserId) === -1 &&
        state.blockedIds.indexOf(user.UserId) === -1 &&
        state.dmIds.indexOf(user.UserId) === -1 &&
        state.selfUser !== user.UserId
      ) {
        delete state.users[user.UserId];
        delete state.userMemberCount[user.UserId];
      }
    },
    removeGuildMembersID: (
      state,
      action: PayloadAction<{ guildId: number; user: User }>
    ) => {
      const { guildId, user } = action.payload;
      if (state.userMemberCount[user.UserId] === undefined) {
        console.log("weird");
        return;
      }
      state.userMemberCount[user.UserId]--;
      if (
        (state.userMemberCount[user.UserId] === undefined ||
          state.userMemberCount[user.UserId] === 0) &&
        state.friendIds.indexOf(user.UserId) === -1 &&
        state.requestedFriendIds.indexOf(user.UserId) === -1 &&
        state.blockedIds.indexOf(user.UserId) === -1 &&
        state.dmIds.indexOf(user.UserId) === -1 &&
        state.selfUser !== user.UserId
      ) {
        delete state.users[user.UserId];
        delete state.userMemberCount[user.UserId];
      }
    },
    resetUsers: (state, action: PayloadAction<void>) => {
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
  },
});

export default userSlice.reducer;

export const {
  addFriendID,
  addRequestedFriendID,
  addBlockedID,
  addDMID,
  addGuildMembersID,
  removeFriendID,
  removeRequestedFriendID,
  removeBlockedID,
  removeDMID,
  removeGuildMembersID,
} = userSlice.actions;
