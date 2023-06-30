import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildBans, getGuildMembers } from "../../api/guildApi";
import { Guild, GuildList } from "../../api/types/guild";
import { User, Member, FriendRequest } from "../../api/types/user";
import {
  getSelf,
  getUser,
  getFriends,
  getBlocked,
  getRequestedFriends,
  getGuilds,
} from "../../api/userApi";

type UserState = {
  users: Record<string, User>;

  friendIds: string[];
  dmUserIds: Record<string, string>;
  requestedFriendIds: string[];
  pendingFriendIds: string[];
  blockedIds: string[];
  selfUser: string | null;

  guildMembersIds: Record<string, string[]>;
  guildAdminIds: Record<string, string[]>; //includes owner
  guildBannedIds: Record<string, string[]>;
  userMemberCount: Record<string, number>;
};

const initialState: UserState = {
  users: {},

  friendIds: [],
  dmUserIds: {}, //for checking if user already has dm
  requestedFriendIds: [],
  pendingFriendIds: [],
  blockedIds: [],

  selfUser: null,

  guildMembersIds: {},
  guildAdminIds: {},
  guildBannedIds: {},
  userMemberCount: {}, //also includes dms (counts how many times its been referenced (if reaches 0 user object is deleted))
};

function checkUserIsReferenced(state: UserState, id: string) {
  if (
    (state.userMemberCount[id] === undefined ||
      state.userMemberCount[id] === 0) &&
    state.friendIds.indexOf(id) === -1 &&
    state.requestedFriendIds.indexOf(id) === -1 &&
    state.pendingFriendIds.indexOf(id) === -1 &&
    state.blockedIds.indexOf(id) === -1 &&
    state.selfUser !== id
  ) {
    delete state.users[id];
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      if (state.users[action.payload.id] === undefined) {
        console.log("not exists");
        return;
      }
      state.users[action.payload.id] = action.payload;
    },
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
      state.userMemberCount[userInfo.id]++;
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
    addGuildAdminID: (state, action: PayloadAction<Member>) => {
      const { guildId, userInfo } = action.payload;
      if (
        state.guildAdminIds[guildId] === undefined ||
        state.users[userInfo.id] === undefined
      ) {
        console.log("not exists");
        return;
      }
      state.guildAdminIds[guildId].push(userInfo.id);
    },
    removeGuildAdminID: (state, action: PayloadAction<Member>) => {
      const { guildId, userInfo } = action.payload;
      if (
        state.guildAdminIds[guildId] === undefined ||
        state.users[userInfo.id] === undefined
      ) {
        console.log("not exists");
        return;
      }
      state.guildAdminIds[guildId] = state.guildAdminIds[guildId].filter(
        (id) => id !== userInfo.id
      );
    },
    addDmUserId: (
      state,
      action: PayloadAction<{ userId: string; dmId: string }>
    ) => {
      console.log("add dm user id", action.payload.userId, "dm id", action.payload.dmId);
      state.dmUserIds[action.payload.userId] = action.payload.dmId;
      state.userMemberCount[action.payload.userId]++;
      console.log("dmid", state.dmUserIds[action.payload.userId]);
    },
    removeDmUserId: (state, action: PayloadAction<{ userId: string }>) => {
      console.log("remove dm user id", action.payload.userId);
      console.log("dmid", state.dmUserIds[action.payload.userId]);
      state.userMemberCount[action.payload.userId]--;
      delete state.dmUserIds[action.payload.userId];
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
      checkUserIsReferenced(state, userInfo.id);
    },
    removeFriendID: (state, action: PayloadAction<User>) => {
      state.friendIds = state.friendIds.filter(
        (id) => id !== action.payload.id
      );
      checkUserIsReferenced(state, action.payload.id);
    },
    removeRequestedFriendID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.requestedFriendIds = state.requestedFriendIds.filter(
        (id) => id !== action.payload.id
      );
      checkUserIsReferenced(state, user.id);
    },
    removePendingFriendID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.pendingFriendIds = state.pendingFriendIds.filter(
        (id) => id !== action.payload.id
      );
      checkUserIsReferenced(state, user.id);
    },
    removeBlockedID: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.blockedIds = state.blockedIds.filter(
        (id) => id !== action.payload.id
      );
      checkUserIsReferenced(state, user.id);
    },
    removeGuildMembersID: (state, action: PayloadAction<Member>) => {
      const { guildId, userInfo } = action.payload;
      if (state.guildMembersIds[guildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildMembersIds[guildId] = state.guildMembersIds[guildId].filter(
        (id) => id !== userInfo.id
      );
      if (state.guildAdminIds[guildId] === undefined) {
        console.log("not exists");
        return;
      }
      state.guildAdminIds[guildId] = state.guildAdminIds[guildId].filter(
        (id) => id !== userInfo.id
      );
      if (state.userMemberCount[userInfo.id] === undefined) {
        console.log("weird");
        return;
      }
      state.userMemberCount[userInfo.id]--;
      checkUserIsReferenced(state, userInfo.id);
    },
    removeGuildMembers: (state, action: PayloadAction<Guild>) => {
      const { id } = action.payload;
      if (state.guildMembersIds[id] === undefined) {
        console.log("not exists");
        return;
      }
      for (const userId of state.guildMembersIds[id]) {
        if (state.userMemberCount[userId] === undefined) {
          console.log("weird");
          return;
        }
        state.userMemberCount[id]--;
        checkUserIsReferenced(state, id);
      }
      delete state.guildMembersIds[id];
    },
    resetUsers: (state) => {
      state.blockedIds = [];
      state.friendIds = [];
      state.requestedFriendIds = [];
      state.selfUser = null;
      state.users = {};
      state.userMemberCount = {};
      state.pendingFriendIds = [];
      state.guildMembersIds = {};
      state.guildAdminIds = {};
      state.guildBannedIds = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getGuilds.fulfilled,
      (state, action: PayloadAction<GuildList>) => {
        for (const dm of action.payload.dms) {
          state.users[dm.userInfo.id] = dm.userInfo;
          state.dmUserIds[dm.userInfo.id] = dm.id;
        }
      }
    );
    builder.addCase(getSelf.fulfilled, (state, action: PayloadAction<User>) => {
      state.users[action.payload.id] = action.payload;
      state.selfUser = action.payload.id;
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.users[action.payload.id] = action.payload;
    });
    builder.addCase(
      getFriends.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        for (const user of action.payload) {
          state.friendIds.push(user.id);
          state.users[user.id] = user;
        }
      }
    );
    builder.addCase(
      getGuildMembers.fulfilled,
      (state, action: PayloadAction<Member[]>) => {
        for (const member of action.payload) {
          if (state.guildMembersIds[member.guildId] === undefined) {
            state.guildMembersIds[member.guildId] = [];
          }
          state.guildMembersIds[member.guildId].push(member.userInfo.id);
          if (state.guildAdminIds[member.guildId] === undefined) {
            state.guildAdminIds[member.guildId] = [];
          }
          if (member.admin || member.owner) {
            state.guildAdminIds[member.guildId].push(member.userInfo.id);
          }
          state.users[member.userInfo.id] = member.userInfo;
          if (state.userMemberCount[member.userInfo.id] === undefined) {
            state.userMemberCount[member.userInfo.id] = 0;
          }
          state.userMemberCount[member.userInfo.id]++;
        }
      }
    );
    builder.addCase(
      getGuildBans.fulfilled,
      (state, action: PayloadAction<Member[]>) => {
        for (const ban of action.payload) {
          if (state.guildBannedIds[ban.guildId] === undefined) {
            state.guildBannedIds[ban.guildId] = [];
          }
          state.guildBannedIds[ban.guildId].push(ban.userInfo.id);
          state.users[ban.userInfo.id] = ban.userInfo;
          if (state.userMemberCount[ban.userInfo.id] === undefined) {
            state.userMemberCount[ban.userInfo.id] = 0;
          }
          state.userMemberCount[ban.userInfo.id]++;
        }
      }
    );
    builder.addCase(
      getBlocked.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        for (const user of action.payload) {
          state.blockedIds.push(user.id);
          state.users[user.id] = user;
        }
      }
    );
    builder.addCase(
      getRequestedFriends.fulfilled,
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
  updateUser,
  addFriendID,
  addRequestedFriendID,
  addBlockedID,
  addGuildMembersID,
  addPendingFriendID,
  addGuildBannedID,
  addDmUserId,
  removeDmUserId,
  removeFriendID,
  removeRequestedFriendID,
  removeGuildMembersID,
  removePendingFriendID,
  removeGuildBannedID,
  removeBlockedID,
  removeGuildMembers,
  addGuildAdminID,
  removeGuildAdminID,
  resetUsers,
} = userSlice.actions;
