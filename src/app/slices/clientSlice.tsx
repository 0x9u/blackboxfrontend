import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAccount, AuthRes, postAuth } from "../../api/authApi";

type ClientState = {
  currentGuild: number | null;
  currentDM: number | null;
  currentChatMode: "guild" | "dm";
  currentMode: "chat" | "friends" | "games";
  loadingWS: boolean;
  showGuildDMSettings: boolean;
  showUserSettings: boolean;
};

//ClientState stores local information not stored/sent by the backend

const initialState: ClientState = {
  currentGuild: null,
  currentDM: null,
  currentChatMode: "guild",
  currentMode: "chat",
  loadingWS : false,
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
    setCurrentMode : (state, action : PayloadAction<"chat" | "friends" | "games">) => {
      state.currentMode = action.payload;
    },
    setLoadingWS : (state, action : PayloadAction<boolean>) => {
      state.loadingWS = action.payload;
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
  setCurrentMode,
  setLoadingWS,
  setShowGuildDMSettings,
  setShowUserSettings,
} = clientSlice.actions;
