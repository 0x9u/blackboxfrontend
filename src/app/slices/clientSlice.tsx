import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAccount, AuthRes, postAuth } from "../../api/authApi";

type ClientState = {
  currentGuild: number | null;
  currentDM: number | null;
  currentChatMode: "guild" | "dm";
  currentFriendsMode : "friends" | "requests" | "add" | "blocked";
  currentAdminMode : "guilds" | "users" | "server";
  currentMode: "chat" | "friends" | "games" | "admin";
  loadingWS: boolean;
  showChatUserList: boolean;
  showAddChatModal: boolean;
  showCreateInviteModal: boolean;
  showGuildDMSettings: boolean;
  showUserSettings: boolean;
  
};

//ClientState stores local information not stored/sent by the backend

const initialState: ClientState = {
  currentGuild: null,
  currentDM: null,
  currentChatMode: "guild",
  currentFriendsMode : "friends",
  currentAdminMode : "guilds",
  currentMode: "chat",
  loadingWS : false,
  showChatUserList: false,
  showAddChatModal: false,
  showCreateInviteModal: false,
  showGuildDMSettings : false,
  showUserSettings : false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setCurrentGuild: (state, action: PayloadAction<number | null>) => {
      state.currentGuild = action.payload;
    },
    setCurrentDM: (state, action: PayloadAction<number | null>) => {
      state.currentDM = action.payload;
    },
    setCurrentChatMode: (state, action: PayloadAction<"guild" | "dm">) => {
      state.currentChatMode = action.payload;
    },
    setCurrentFriendsMode : (state, action:PayloadAction<"friends" | "requests" | "add" | "blocked">) => {
      state.currentFriendsMode = action.payload;
    },
    setCurrentAdminMode : (state, action:PayloadAction<"guilds" | "users" | "server">) => {
      state.currentAdminMode = action.payload;
    },
    setCurrentMode : (state, action : PayloadAction<"chat" | "friends" | "games">) => {
      state.currentMode = action.payload;
    },
    setLoadingWS : (state, action : PayloadAction<boolean>) => {
      state.loadingWS = action.payload;
    },
    setShowChatUserList : (state, action : PayloadAction<boolean>) => {
      state.showChatUserList = action.payload;
    },
    setShowAddChatModal : (state, action : PayloadAction<boolean>) => {
      state.showAddChatModal = action.payload;
    },
    setShowCreateInviteModal: (state, action: PayloadAction<boolean>) => {
      state.showCreateInviteModal = action.payload;
    },
    setShowGuildDMSettings : (state, action : PayloadAction<boolean>) => {
      state.showGuildDMSettings = action.payload;
    },
    setShowUserSettings : (state, action : PayloadAction<boolean>) => {
      state.showUserSettings = action.payload;
    },
  },
});

export default clientSlice.reducer;

export const {
  setCurrentGuild,
  setCurrentDM,
  setCurrentChatMode,
  setCurrentFriendsMode,
  setCurrentAdminMode,
  setCurrentMode,
  setLoadingWS,
  setShowChatUserList,
  setShowAddChatModal,
  setShowCreateInviteModal,
  setShowGuildDMSettings,
  setShowUserSettings,
} = clientSlice.actions;
