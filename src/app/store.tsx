import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from 'redux-persist/lib/storage';
import {  FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore, persistReducer } from 'redux-persist'
import { chatApi } from "../api/api";

import auth from "./slices/authSlice";
import client from "./slices/clientSlice";
import user from "./slices/userSlice";
import guild from "./slices/guildSlice";
import msg from "./slices/msgSlice";

const persistConfig = {
  key: 'root',
  whitelist: ['auth'],
  storage,
}

const reducers = combineReducers({
  [chatApi.reducerPath]: chatApi.reducer,
  auth,
  client,
  user,
  guild,
  msg,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }}).concat(chatApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const persistor = persistStore(store); // dont remove this

export default store;
