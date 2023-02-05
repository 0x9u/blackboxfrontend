import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, AuthRes } from "../../api/authApi";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<AuthRes>) => {
        state.token = action.payload.token;
        state.expires = action.payload.expires;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action: PayloadAction<AuthRes>) => {
        state.token = action.payload.token;
        state.expires = action.payload.expires;
      }
    );
  },
});

export default authSlice.reducer;
