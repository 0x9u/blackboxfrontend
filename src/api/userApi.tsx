import { createEntityAdapter } from "@reduxjs/toolkit";
import { chatApi } from "./api";
import { DmUser } from "./types/dm";
import { Guild, GuildList, UserGuild } from "./types/guild";
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
    getGuilds: builder.query<GuildList, void>({
      query: () => ({
        url: "/users/@me/guilds",
        method: "GET",
      }),
    }),
    leaveGuild: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/users/@me/guilds/${id}`,
        method: "DELETE",
      })
    }),
    getBlocked: builder.query<User[], void>({
      query: () => ({
        url: "/users/@me/blocked",
        method: "GET",
      })
    }),
    openDM: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/users/@me/dms/${id}`,
        method: "PUT",
      }),
    }),
    deleteDM: builder.mutation<void, number>({
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
  openDM,
  deleteDM,
  getFriends,
  getBlocked,
  getRequestedFriends,

} = userApi.endpoints;

export const {
  useGetUserQuery,
  useGetSelfQuery,
  useGetGuildsQuery,
  useOpenDMMutation,
  useDeleteDMMutation,
  useGetFriendsQuery,
  useGetBlockedQuery,
  useGetRequestedFriendsQuery,
  useLeaveGuildMutation,
} = userApi;

export default userApi;