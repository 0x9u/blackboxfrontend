import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../app/store";
import axios, { AxiosError } from "axios";
import { ErrorBody } from "./types/error";

export const asyncThunkAPI = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: ErrorBody;
}>();

export const requestAPI = async <T,>(
  type: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
  endpoint: string,
  body: any,
  thunkAPI: {
    getState: () => RootState;
    rejectWithValue: (arg: any) => any;
  }
) => {
  const { auth } = thunkAPI.getState();
  try {
    const { data } = await axios<T>({
      method: type,
      url : import.meta.env.VITE_API_ENDPOINT + endpoint,
      data: body,
      headers: { authorization: auth.token },
      validateStatus: (status) => status < 400,
    });
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        (err as AxiosError<ErrorBody>).response?.data
      );
    } else {
      throw err;
    }
  }
};
