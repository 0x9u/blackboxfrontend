import { createEntityAdapter } from "@reduxjs/toolkit";
import { chatApi } from "./api";
import { DmUser } from "./types/dm";
import { Guild, GuildList, UserGuild } from "./types/guild";
import { Msg } from "./types/msg";
import {
  EditUserEmailForm,
  EditUserNameForm,
  EditUserPasswordForm,
  EditUserPictureForm,
  FriendRequest,
  User,
} from "./types/user";

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
      }),
    }),
    getBlocked: builder.query<User[], void>({
      query: () => ({
        url: "/users/@me/blocked",
        method: "GET",
      }),
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
    patchUserName: builder.mutation<void, EditUserNameForm>({
      query: (body: EditUserNameForm) => ({
        url: `/users/@me`,
        method: "PATCH",
        body: body,
      }),
    }),
    patchUserEmail: builder.mutation<void, EditUserEmailForm>({
      query: (body: EditUserEmailForm) => ({
        url: `/users/@me`,
        method: "PATCH",
        body: body,
      }),
    }),
    patchUserPassword: builder.mutation<void, EditUserPasswordForm>({
      query: (body: EditUserPasswordForm) => ({
        url: `/users/@me`,
        method: "PATCH",
        body: body,
      }),
    }),
    patchUserPicture: builder.mutation<void, EditUserPictureForm>({
      query: (args: EditUserPictureForm) => {
        const formData = new FormData();
        const body = {
          password: args.password,
        };
        formData.append("body", JSON.stringify(body));
        const data = new Blob([args.image], { type: args.image.type });
        formData.append("image", data, args.image.name);

        return {
          url: `/users/@me`,
          method: "PATCH",
          body: formData,
        };
      },
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
  leaveGuild,
  patchUserName,
  patchUserEmail,
  patchUserPassword,
  patchUserPicture,
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
  usePatchUserNameMutation,
  usePatchUserEmailMutation,
  usePatchUserPasswordMutation,
  usePatchUserPictureMutation,
} = userApi;

export default userApi;
