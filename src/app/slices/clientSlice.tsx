import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAccount, AuthRes, postAuth } from "../../api/authApi";
import { getGuildInvites, getGuildMsgs } from "../../api/guildApi";
import { GuildList } from "../../api/types/guild";
import { Permissions, User } from "../../api/types/user";
import { getGuilds, getSelf } from "../../api/userApi";
import { Msg } from "../../api/types/msg";

type guildLoaded = {
  intialMsgs: boolean;
  msgs: boolean;
  members: boolean;
  invites: boolean;
  banned: boolean;
};

type ClientState = {
  currentGuild: string | null;
  currentDM: string | null;
  currentChatMode: "guild" | "dm";
  currentFriendsMode: "friends" | "requests" | "add" | "blocked";
  currentAdminMode: "guilds" | "users" | "server";
  currentMode: "chat" | "friends" | "games" | "admin";
  loadingWS: boolean;

  showChatUserList: boolean;

  showAddChatModal: boolean;
  showCreateInviteModal: boolean;
  showEditPassModal: boolean;
  showEditUsernameModal: boolean;
  showEditEmailModal: boolean;
  showEditProfilePictureModal: boolean;

  showGuildDMSettings: boolean;
  showUserSettings: boolean;

  permissions: Permissions;

  userSelfLoaded: boolean;
  guildListLoaded: boolean;
  friendListLoaded: boolean;
  blockedListLoaded: boolean;
  requestedFriendListLoaded: boolean;
  guildLoaded: Record<string, guildLoaded>;
};

//ClientState stores local information not stored/sent by the backend

const initialState: ClientState = {
  currentGuild: null,
  currentDM: null,
  currentChatMode: "guild",
  currentFriendsMode: "friends",
  currentAdminMode: "guilds",
  currentMode: "chat",
  loadingWS: false,

  showChatUserList: false,

  showAddChatModal: false,
  showCreateInviteModal: false,
  showEditPassModal: false,
  showEditUsernameModal: false,
  showEditEmailModal: false,
  showEditProfilePictureModal: false,

  showGuildDMSettings: false,
  showUserSettings: false,

  permissions: {} as Permissions,

  userSelfLoaded: false,
  guildListLoaded: false,
  friendListLoaded: false,
  blockedListLoaded: false,
  requestedFriendListLoaded: false,
  guildLoaded: {},
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setCurrentGuild: (state, action: PayloadAction<string | null>) => {
      state.currentGuild = action.payload;
    },
    removeCurrentGuild: (state, action: PayloadAction<string>) => {
      if (state.currentGuild === action.payload) {
        state.currentGuild = null;
      }
    },
    setCurrentDM: (state, action: PayloadAction<string | null>) => {
      state.currentDM = action.payload;
    },
    removeCurrentDM: (state, action: PayloadAction<string>) => {
      if (state.currentDM === action.payload) {
        state.currentDM = null;
      }
    },
    setCurrentChatMode: (state, action: PayloadAction<"guild" | "dm">) => {
      state.currentChatMode = action.payload;
    },
    setCurrentFriendsMode: (
      state,
      action: PayloadAction<"friends" | "requests" | "add" | "blocked">
    ) => {
      state.currentFriendsMode = action.payload;
    },
    setCurrentAdminMode: (
      state,
      action: PayloadAction<"guilds" | "users" | "server">
    ) => {
      state.currentAdminMode = action.payload;
    },
    setCurrentMode: (
      state,
      action: PayloadAction<"chat" | "friends" | "games" | "admin">
    ) => {
      state.currentMode = action.payload;
    },
    setLoadingWS: (state, action: PayloadAction<boolean>) => {
      state.loadingWS = action.payload;
    },
    setShowChatUserList: (state, action: PayloadAction<boolean>) => {
      state.showChatUserList = action.payload;
    },
    setShowAddChatModal: (state, action: PayloadAction<boolean>) => {
      state.showAddChatModal = action.payload;
    },
    setShowCreateInviteModal: (state, action: PayloadAction<boolean>) => {
      state.showCreateInviteModal = action.payload;
    },
    setShowEditPassModal: (state, action: PayloadAction<boolean>) => {
      state.showEditPassModal = action.payload;
    },
    setShowEditUsernameModal: (state, action: PayloadAction<boolean>) => {
      state.showEditUsernameModal = action.payload;
    },
    setShowEditEmailModal: (state, action: PayloadAction<boolean>) => {
      state.showEditEmailModal = action.payload;
    },

    setShowEditProfilePictureModal: (state, action: PayloadAction<boolean>) => {
      state.showEditProfilePictureModal = action.payload;
    },
    setShowGuildDMSettings: (state, action: PayloadAction<boolean>) => {
      state.showGuildDMSettings = action.payload;
    },
    setShowUserSettings: (state, action: PayloadAction<boolean>) => {
      state.showUserSettings = action.payload;
    },
    initGuildLoaded: (state, action: PayloadAction<string>) => {
      state.guildLoaded[action.payload] = {
        intialMsgs: false,
        msgs: false,
        members: false,
        invites: false,
        banned: false,
      };
    },
    setGuildIntialMsgsLoaded: (state, action: PayloadAction<string>) => {
      if (!state.guildLoaded[action.payload]) {
        state.guildLoaded[action.payload] = {
          intialMsgs: false,
          msgs: false,
          members: false,
          invites: false,
          banned: false,
        };
      }
      state.guildLoaded[action.payload].intialMsgs = true;
    },
    setGuildMsgsLoaded: (state, action: PayloadAction<string>) => {
      if (!state.guildLoaded[action.payload]) {
        state.guildLoaded[action.payload] = {
          intialMsgs: false,
          msgs: false,
          members: false,
          invites: false,
          banned: false,
        };
      }
      state.guildLoaded[action.payload].msgs = true;
    },
    deleteGuildLoaded: (state, action: PayloadAction<string>) => {
      delete state.guildLoaded[action.payload];
    },
    setGuildMembersLoaded: (state, action: PayloadAction<string>) => {
      if (!state.guildLoaded[action.payload]) {
        state.guildLoaded[action.payload] = {
          intialMsgs: false,
          msgs: false,
          members: false,
          invites: false,
          banned: false,
        };
      }
      state.guildLoaded[action.payload].members = true;
    },
    setGuildInvitesLoaded: (state, action: PayloadAction<string>) => {
      if (!state.guildLoaded[action.payload]) {
        state.guildLoaded[action.payload] = {
          intialMsgs: false,
          msgs: false,
          members: false,
          invites: false,
          banned: false,
        };
      }
      state.guildLoaded[action.payload].invites = true;
    },
    setGuildBannedLoaded: (state, action: PayloadAction<string>) => {
      if (!state.guildLoaded[action.payload]) {
        state.guildLoaded[action.payload] = {
          intialMsgs: false,
          msgs: false,
          members: false,
          invites: false,
          banned: false,
        };
      }
      state.guildLoaded[action.payload].banned = true;
    },
  },

  extraReducers(builder) {
    builder.addCase(getSelf.fulfilled, (state, action: PayloadAction<User>) => {
      state.userSelfLoaded = true;
      state.permissions = action.payload.permissions;
    });
    builder.addCase(
      getGuilds.fulfilled,
      (state, action: PayloadAction<GuildList>) => {
        state.guildListLoaded = true;
        const list = action.payload;
        for (const guild of list.guilds) {
          state.guildLoaded[guild.id] = {
            intialMsgs: false,
            msgs: false,
            members: false,
            invites: false,
            banned: false,
          };
        }
      }
    );
    builder.addCase(getGuildMsgs.fulfilled, (state, action) => {
      const messages = action.payload;
      console.log(messages.length, action.meta.arg.id);
      if (messages.length < 50) {
        console.log(
          "activated",
          action.meta.arg.id,
          messages.length,
          messages.length < 50
        );
        state.guildLoaded[action.meta.arg.id].msgs = true;
      }
    });
  },
});

export default clientSlice.reducer;

export const {
  setCurrentGuild,
  removeCurrentGuild,
  setCurrentDM,
  removeCurrentDM,
  setCurrentChatMode,
  setCurrentFriendsMode,
  setCurrentAdminMode,
  setCurrentMode,
  setLoadingWS,
  setShowChatUserList,
  setShowAddChatModal,
  setShowCreateInviteModal,
  setShowEditPassModal,
  setShowEditEmailModal,
  setShowEditUsernameModal,
  setShowEditProfilePictureModal,
  setShowGuildDMSettings,
  setShowUserSettings,
  initGuildLoaded,
  setGuildIntialMsgsLoaded,
  setGuildMsgsLoaded,
  setGuildMembersLoaded,
  setGuildInvitesLoaded,
  setGuildBannedLoaded,
  deleteGuildLoaded,
} = clientSlice.actions;
