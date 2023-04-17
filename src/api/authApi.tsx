import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { chatApi } from "./api";

export interface AuthRes {
    token: string;
    expires : number;
}

export interface RegisterReq {
    name : string;
    password : string;
    email : string;
}

export interface LoginReq {
    name : string;
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

export const { usePostAuthMutation, useCreateAccountMutation } = authApi;

export default authApi;