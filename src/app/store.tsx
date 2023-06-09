import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";
import thunk from "redux-thunk";

import auth from "./slices/authSlice";
import client from "./slices/clientSlice";
import user from "./slices/userSlice";
import guild from "./slices/guildSlice";
import msg from "./slices/msgSlice";
import gatewayAPI from "../api/websocket";

const persistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage,
};

const reducers = combineReducers({
  auth,
  client,
  user,
  guild,
  msg,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(thunk)
      .concat(gatewayAPI),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const persistor = persistStore(store); // dont remove this

export default store;
