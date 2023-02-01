import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import user from "../reducer/userReducer";
import auth from "../reducer/authReducer";

const store = configureStore({
  reducer: {
    user,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
