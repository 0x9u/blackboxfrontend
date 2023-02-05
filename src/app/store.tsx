import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { chatApi } from "../api/api";

import auth from "./reducers/authReducer";
import client from "./reducers/clientReducer";
import user from "./reducers/userReducer";
import guild from "./reducers/guildReducer";
import msg from "./reducers/msgReducer";

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
