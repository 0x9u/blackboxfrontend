import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getGuildBans,
  getGuildInvites,
  getGuildMembers,
  getGuildMsgs,
} from "../../api/guildApi";
import { GuildList } from "../../api/types/guild";
import { Permissions, User } from "../../api/types/user";
import { getGuilds, getSelf } from "../../api/userApi";

type guildLoaded = {
  initialMsgs: boolean;
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
  currentEditMsgId: string | null;

  wsStatus: "connected" | "disconnected" | "connecting";

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
  currentEditMsgId: null,

  wsStatus: "disconnected",

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
    setCurrentEditMsgId: (state, action: PayloadAction<string | null>) => {
      state.currentEditMsgId = action.payload;
    },
    setWsStatus: (
      state,
      action: PayloadAction<"connecting" | "connected" | "disconnected">
    ) => {
      state.wsStatus = action.payload;
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
        initialMsgs: false,
        msgs: false,
        members: false,
        invites: false,
        banned: false,
      };
    },
    setGuildIntialMsgsLoaded: (state, action: PayloadAction<string>) => {
      if (!state.guildLoaded[action.payload]) {
        state.guildLoaded[action.payload] = {
          initialMsgs: false,
          msgs: false,
          members: false,
          invites: false,
          banned: false,
        };
      }
      state.guildLoaded[action.payload].initialMsgs = true;
    },
    setGuildMsgsLoaded: (state, action: PayloadAction<string>) => {
      if (!state.guildLoaded[action.payload]) {
        state.guildLoaded[action.payload] = {
          initialMsgs: false,
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
          initialMsgs: false,
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
          initialMsgs: false,
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
          initialMsgs: false,
          msgs: false,
          members: false,
          invites: false,
          banned: false,
        };
      }
      state.guildLoaded[action.payload].banned = true;
    },
    resetClient: (state) => {
      state.blockedListLoaded = false;
      state.currentAdminMode = "guilds";
      state.currentDM = null;
      state.currentGuild = null;
      state.currentEditMsgId = null;
      state.guildLoaded = {};
      state.userSelfLoaded = false;
      state.friendListLoaded = false;
      state.guildListLoaded = false;
      state.permissions = {} as Permissions;
      state.showAddChatModal = false;
      state.showChatUserList = false;
      state.showCreateInviteModal = false;
      state.showEditPassModal = false;
      state.showEditUsernameModal = false;
      state.showEditEmailModal = false;
      state.showEditProfilePictureModal = false;
      state.showGuildDMSettings = false;
      state.showUserSettings = false;
    },
  },

  extraReducers(builder) {
    builder.addCase(getSelf.fulfilled, (state, action: PayloadAction<User>) => {
      state.userSelfLoaded = true;
      state.permissions = action.payload.permissions ?? ({} as Permissions);
    });
    builder.addCase(
      getGuilds.fulfilled,
      (state, action: PayloadAction<GuildList>) => {
        state.guildListLoaded = true;
        const list = action.payload;
        for (const guild of list.guilds) {
          state.guildLoaded[guild.id] = {
            initialMsgs: false,
            msgs: false,
            members: false,
            invites: false,
            banned: false,
          };
        }
      }
    );
    builder.addCase(getGuildMembers.fulfilled, (state, action) => {
      console.log("got guild members", action.meta.arg);
      state.guildLoaded[action.meta.arg].members = true;
    });
    builder.addCase(getGuildInvites.fulfilled, (state, action) => {
      state.guildLoaded[action.meta.arg].invites = true;
    });
    builder.addCase(getGuildBans.fulfilled, (state, action) => {
      state.guildLoaded[action.meta.arg].banned = true;
    });
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
  setCurrentEditMsgId,
  setWsStatus,
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
  resetClient,
} = clientSlice.actions;
