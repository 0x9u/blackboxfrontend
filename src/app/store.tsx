import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { chatApi } from "../api/api";

import auth from "./slices/authSlice";
import client from "./slices/clientSlice";
import user from "./slices/userSlice";
import guild from "./slices/guildSlice";
import msg from "./slices/msgSlice";

const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    auth,
    client,
    user,
    guild,
    msg,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
