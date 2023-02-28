import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAccount, postAuth, AuthRes } from "../../api/authApi";

type AuthState = {
  token: string | null;
  expires: number | null;
};

const initialState: AuthState = {
  token: null,
  expires: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: (state) => { //used for logout (called by websocket or button)
      state.token = null;
      state.expires = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      createAccount.matchFulfilled,
      (state, action: PayloadAction<AuthRes>) => {
        state.token = action.payload.token;
        state.expires = action.payload.expires;
      }
    );
    builder.addMatcher(
      postAuth.matchFulfilled,
      (state, action: PayloadAction<AuthRes>) => {
        state.token = action.payload.token;
        state.expires = action.payload.expires;
      }
    );
  },
});

export default authSlice.reducer;

export const { clearToken } = authSlice.actions;
