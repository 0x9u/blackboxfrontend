import { createEntityAdapter } from "@reduxjs/toolkit";
import { chatApi } from "./api";
import { DmUser } from "./types/dm";
import { Guild, UserGuild } from "./types/guild";
import { Msg } from "./types/msg";
import { FriendRequest, User } from "./types/user";

const userApi = chatApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      //probs unused for now or maybe idc probs when for profile click
      query: (id: number) => ({
        url: `/users/${id}`,
        method: "GET",
        providesTags: ["User"],
      }),
    }),
    getSelf: builder.query<User, void>({
      query: () => ({
        url: "/users/@me",
        method: "GET",
      }),
    }),
    getGuilds: builder.query<Guild[], void>({
      query: () => ({
        url: "/users/@me/guilds",
        method: "GET",
      }),
    }),
    getBlocked: builder.query<User[], void>({
      query: () => ({
        url: "/users/@me/blocked",
        method: "GET",
      })
    }),
    getDMs: builder.query<DmUser[], void>({
      query: () => ({
        url: "/users/@me/dms",
        method: "GET",
      }),
    }),
    postMsgDM: builder.query<void, { id: number; msg: Msg }>({
      query: ({ id, msg }) => ({
        url: `/users/${id}/msgs`,
        method: "POST",
        body: msg,
      }),
    }),
    getMsgsDM: builder.query<Msg[], number>({
      query: (id: number) => ({
        url: `/users/${id}/msgs`,
        method: "GET",
      }),
    }),
    deleteMsgDM : builder.query<void, { id: number; msgId: number }>({
      query: ({ id, msgId }) => ({
        url: `/users/${id}/msgs/${msgId}`,
        method: "DELETE",
      }),
    }),
    patchMsgDM : builder.query<void, { id: number; msgId: number; msg: Msg }>({
      query: ({ id, msgId, msg }) => ({
        url: `/users/${id}/msgs/${msgId}`,
        method: "PATCH",
        body: msg,
      }),
    }),
    openDM: builder.query<void, number>({
      query: (id: number) => ({
        url: `/users/@me/dms/${id}`,
        method: "PUT",
      }),
    }),
    deleteDM: builder.query<void, number>({
      query: (id: number) => ({
        url: `/users/@me/dms/${id}`,
        method: "DELETE",
      }),
    }),
    getFriends: builder.query<User[], void>({
      query: () => ({
        url: `/users/@me/friends`,
        method: "GET",
      }),
    }),
    getRequestedFriends: builder.query<FriendRequest, void>({
      query: () => ({
        url: `/users/@me/requests`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  getUser,
  getSelf,
  getGuilds,
  getDMs,
  postMsgDM,
  getMsgsDM,
  deleteMsgDM,
  openDM,
  deleteDM,
  getFriends,
  getBlocked,
  getRequestedFriends,

} = userApi.endpoints;

export default userApi;