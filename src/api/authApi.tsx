import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { chatApi } from "./api";

export interface AuthRes {
    token: string;
    expires : number;
}

export interface RegisterReq {
    username : string;
    password : string;
    email : string;
}

export interface LoginReq {
    username : string;
    password : string;
}


const authApi = chatApi.injectEndpoints({
  endpoints: (builder) => ({
    postAuth: builder.mutation<AuthRes, LoginReq>({
      query: (body) => ({
        url: "/users/auth",
        method: "POST",
        body,
      }),
    }),
    createAccount: builder.mutation<AuthRes, RegisterReq>({
      query: (body) => ({
        url: "/users/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {postAuth, createAccount}  = authApi.endpoints;

export default authApi;