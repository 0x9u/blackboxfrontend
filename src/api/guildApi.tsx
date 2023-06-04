import { chatApi } from "./api";
import { Msg } from "./types/msg";
import { Guild, GuildUpload, Invite } from "./types/guild";
import { Member } from "./types/user";
import {
  setGuildBannedLoaded,
  setGuildInvitesLoaded,
  setGuildMembersLoaded,
  setGuildMsgsLoaded,
} from "../app/slices/clientSlice";

const guildApi = chatApi.injectEndpoints({
  endpoints: (builder) => ({
    postGuild: builder.mutation<void, GuildUpload>({
      query: (guild) => {
        const formData = new FormData();
        formData.append("body", JSON.stringify(guild.body));
        if (guild.image) {
          const data = new Blob([guild.image], { type: guild.image.type });
          console.log(guild.image.name);
          formData.append("image", data, guild.image.name);
        }

        return {
          url: "/guilds",
          method: "POST",
          body: formData,
        };
      },
    }),
    patchGuild: builder.mutation<void, { id: string; body: GuildUpload }>({
      query: (args) => {
        const { id, body: guild } = args;
        const formData = new FormData();
        formData.append("body", JSON.stringify(guild.body));
        if (guild.image) {
          const data = new Blob([guild.image], { type: guild.image.type });
          console.log(guild.image.name);
          formData.append("image", data, guild.image.name);
        }

        return {
          url: `/guilds/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteGuild: builder.mutation<void, string>({
      query: (id) => ({
        url: `/guilds/${id}`,
        method: "DELETE",
      }),
    }),
    makeOwner: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/guilds/${id}`,
        method: "PATCH",
        body: { ownerId: userId } as Guild,
      }),
    }),
    getGuildMembers: builder.query<Member[], string>({
      query: (id) => ({
        url: `/guilds/${id}/members`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(setGuildMembersLoaded(arg));
      },
    }),
    deleteGuildMember: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/guilds/${id}/members/${userId}`,
        method: "DELETE",
      }),
    }),
    getGuildMsgs: builder.query<Msg[], { id: string; time: number }>({
      query: ({ id, time }) => {
        if (time === 0) time = new Date().valueOf();
        return {
          url: `/guilds/${id}/msgs`,
          method: "GET",
          params: { time },
        };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(setGuildMsgsLoaded(arg.id));
      },
    }),
    postGuildMsg: builder.mutation<void, { id: string; msg: Msg }>({
      query: ({ id, msg }) => ({
        url: `/guilds/${id}/msgs`,
        method: "POST",
        body: msg,
      }),
    }),
    deleteGuildMsg: builder.mutation<void, { id: string; msgId: string }>({
      query: ({ id, msgId }) => ({
        url: `/guilds/${id}/msgs/${msgId}`,
        method: "DELETE",
      }),
    }),
    patchGuildMsg: builder.mutation<
      void,
      { id: number; msgId: number; msg: Msg }
    >({
      query: ({ id, msgId, msg }) => ({
        url: `/guilds/${id}/msgs/${msgId}`,
        method: "PATCH",
        body: msg,
      }),
    }),
    readGuildMsg: builder.mutation<void, string>({
      query: (id) => ({
        url: `/guilds/${id}/msgs/read`,
        method: "POST",
      }),
    }),
    getGuildBans: builder.query<Member[], string>({
      query: (id) => ({
        url: `/guilds/${id}/bans`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(setGuildBannedLoaded(arg));
      },
    }),
    putGuildBan: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/guilds/${id}/bans/${userId}`,
        method: "PUT",
      }),
    }),
    deleteGuildBan: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/guilds/${id}/bans/${userId}`,
        method: "DELETE",
      }),
    }),
    getGuildInvites: builder.query<Invite[], string>({
      query: (id) => ({
        url: `/guilds/${id}/invites`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(setGuildInvitesLoaded(arg));
      },
    }),
    joinGuildInvite: builder.mutation<void, string>({
      query: (code) => ({
        url: "/guilds/join",
        method: "POST",
        body: {
          invite: code,
        },
      }),
    }),
    postGuildInvite: builder.mutation<void, string>({
      query: (id) => ({
        url: `/guilds/${id}/invites`,
        method: "POST",
      }),
    }),
    deleteGuildInvite: builder.mutation<void, { id: string; invite: string }>({
      query: (args) => ({
        url: `/guilds/${args.id}/invites/${args.invite}`,
        method: "DELETE",
      }),
    }),
    putGuildAdmin: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/guilds/${id}/admins/${userId}`,
        method: "PUT",
      }),
    }),
    deleteGuildAdmin: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/guilds/${id}/admins/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  postGuild,
  patchGuild,
  getGuildMembers,
  deleteGuildMember,
  getGuildMsgs,
  postGuildMsg,
  deleteGuildMsg,
  patchGuildMsg,
  readGuildMsg,
  getGuildBans,
  putGuildBan,
  deleteGuildBan,
  getGuildInvites,
  postGuildInvite,
  deleteGuildInvite,
  deleteGuild,
  putGuildAdmin,
  deleteGuildAdmin,
  joinGuildInvite,
  makeOwner,
} = guildApi.endpoints;

export const {
  usePostGuildMutation,
  usePatchGuildMutation,
  useGetGuildMembersQuery,
  useDeleteGuildMemberMutation,
  useGetGuildMsgsQuery,
  usePostGuildMsgMutation,
  useDeleteGuildMsgMutation,
  usePatchGuildMsgMutation,
  useReadGuildMsgMutation,
  useGetGuildBansQuery,
  usePutGuildBanMutation,
  useDeleteGuildBanMutation,
  useGetGuildInvitesQuery,
  usePostGuildInviteMutation,
  useDeleteGuildInviteMutation,
  useDeleteGuildMutation,
  usePutGuildAdminMutation,
  useDeleteGuildAdminMutation,
  useMakeOwnerMutation,
  useJoinGuildInviteMutation,
} = guildApi;

export default guildApi;
