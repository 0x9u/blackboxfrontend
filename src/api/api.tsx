import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../app/store";
import axios, { AxiosError } from "axios";
import { ErrorBody } from "./types/error";
//import { setUploadProgress } from "../app/slices/clientSlice";

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
    //    dispatch: AppDispatch;
  },
//  uploadID?: string[]
) => {
  const { auth } = thunkAPI.getState();
  //const dispatch = thunkAPI.dispatch;
  // const uploadId = uploadID ?? [];
  try {
    const { data } = await axios<T>({
      method: type,
      url: import.meta.env.VITE_API_ENDPOINT + endpoint,
      data: body,
      headers: { authorization: auth.token },
      validateStatus: (status) => status < 400,
      /*onUploadProgress: (progressEvent) => {
        for (const ID in uploadId) {
          dispatch(
            setUploadProgress({
              id: ID,
              progress: progressEvent.loaded / (progressEvent.total ?? 1),
            })
          );
        }
      },*/
    });
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.log("err rejecting", err);
      console.log(thunkAPI.rejectWithValue);
      return thunkAPI.rejectWithValue(
        (err as AxiosError<ErrorBody>).response?.data
      );
    } else {
      throw err;
    }
  }
};
