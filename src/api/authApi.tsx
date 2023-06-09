import { asyncThunkAPI, requestAPI } from "./api";

export interface AuthRes {
  token: string;
  expires: number;
}

export interface RegisterReq {
  name: string;
  password: string;
  email: string;
}

export interface LoginReq {
  name: string;
  password: string;
}


export const postAuth = asyncThunkAPI<AuthRes, LoginReq>(
  "auth/postAuth",
  async (body: LoginReq, thunkAPI) => {
    return await requestAPI<AuthRes>("POST", "/users/auth", body, thunkAPI);
  }
);

export const createAccount = asyncThunkAPI<AuthRes, RegisterReq>(
  "auth/createAccount",
  async (body: RegisterReq, thunkAPI) => {
    return await requestAPI<AuthRes>("POST", "/users/", body, thunkAPI);
  }
);

