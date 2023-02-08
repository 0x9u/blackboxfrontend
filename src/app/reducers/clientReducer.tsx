import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAccount, AuthRes, postAuth } from "../../api/authApi";

type ClientState = {
  currentGuild: number | null;
  currentDM: number | null;
  currentMode: "guild" | "dm";
  loadingWS: boolean;
};

const initialState: ClientState = {
  currentGuild: null,
  currentDM: null,
  currentMode: "guild",
  loadingWS : false,
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
    setCurrentMode: (state, action: PayloadAction<"guild" | "dm">) => {
      state.currentMode = action.payload;
    },
    setLoadingWS : (state, action : PayloadAction<boolean>) => {
      state.loadingWS = action.payload;
    }
  },
});

export default clientSlice.reducer;

export const {
  setCurrentGuild,
  setCurrentDM,
  setCurrentMode,
  setLoadingWS,
} = clientSlice.actions;
