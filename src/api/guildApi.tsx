import { asyncThunkAPI, requestAPI } from "./api";
import { Msg } from "./types/msg";
import { GuildUpload, Invite } from "./types/guild";
import { Member } from "./types/user";
import axios, { AxiosError } from "axios";
import {
  setGuildBannedLoaded,
  setGuildInvitesLoaded,
  setGuildMembersLoaded,
} from "../app/slices/clientSlice";
import { ErrorBody } from "./types/error";
import { RootState } from "../app/store";

export const createGuild = asyncThunkAPI<void, GuildUpload>(
  "guild/create",
  async (guild: GuildUpload, thunkAPI) => {
    const formData = new FormData();
    formData.append("body", JSON.stringify(guild.body));
    if (guild.image) {
      const data = new Blob([guild.image], { type: guild.image.type });
      console.log(guild.image.name);
      formData.append("image", data, guild.image.name);
    }
    return await requestAPI<void>("POST", "/guilds", formData, thunkAPI);
  }
);

export const editGuild = asyncThunkAPI<
  void,
  { id: string; guild: GuildUpload }
>("guild/edit", async (args: { id: string; guild: GuildUpload }, thunkAPI) => {
  const { id, guild } = args;
  const formData = new FormData();
  formData.append("body", JSON.stringify(guild.body));
  if (guild.image) {
    const data = new Blob([guild.image], { type: guild.image.type });
    console.log(guild.image.name);
    formData.append("image", data, guild.image.name);
  }
  return await requestAPI<void>("PATCH", `/guilds/${id}`, formData, thunkAPI);
});

export const deleteGuild = asyncThunkAPI<void, string>(
  "guild/delete",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>("DELETE", `/guilds/${id}`, null, thunkAPI);
  }
);

export const makeOwner = asyncThunkAPI<void, { id: string; userId: string }>(
  "guild/makeOwner",
  async (args: { id: string; userId: string }, thunkAPI) => {
    const { id, userId } = args;
    return await requestAPI<void>(
      "PATCH",
      `/guilds/${id}`,
      { ownerId: userId },
      thunkAPI
    );
  }
);

export const getGuildMembers = asyncThunkAPI<Member[], string>(
  "guild/getMembers",
  async (id: string, thunkAPI) => {
    const response = await requestAPI<Member[]>(
      "GET",
      `/guilds/${id}/members`,
      null,
      thunkAPI
    );
    thunkAPI.dispatch(setGuildMembersLoaded(id));
    return response;
  }
);

export const kickGuildMember = asyncThunkAPI<
  void,
  { id: string; userId: string }
>(
  "guild/kickMember",
  async (args: { id: string; userId: string }, thunkAPI) => {
    const { id, userId } = args;
    return await requestAPI<void>(
      "DELETE",
      `/guilds/${id}/members/${userId}`,
      null,
      thunkAPI
    );
  }
);

export const getGuildMsgs = asyncThunkAPI<Msg[], { id: string; time: number }>(
  "guild/getMsgs",
  async (args: { id: string; time: number }, thunkAPI) => {
    var { id, time } = args;
    if (time === 0) time = Math.floor(new Date().valueOf() / 1000);
    const response = await requestAPI<Msg[]>(
      "GET",
      `/guilds/${id}/msgs?time=${time}`,
      null,
      thunkAPI
    );
    return response;
  }
);

export const createGuildMsg = asyncThunkAPI<void, { id: string; msg: Msg }>(
  "guild/createMsg",
  async (args: { id: string; msg: Msg }, thunkAPI) => {
    const { id, msg } = args;
    return await requestAPI<void>("POST", `/guilds/${id}/msgs`, msg, thunkAPI);
  }
);

export const retryGuildMsg = asyncThunkAPI<void, { id: string; msgId: string }>(
  "guild/retryMsg",
  async (args: { id: string; msgId: string }, thunkAPI) => {
    console.log("test aaaaaaaaa");
    const { id, msgId } = args;
    const msg = (thunkAPI.getState() as RootState).msg.msgs[msgId];
    console.log("bruh sas", msgId);
    // msg.failed = undefined;
    console.log(msg);
    console.log("work u fucking piece of shit");
    return await requestAPI<void>(
      "POST",
      `/guilds/${id}/msgs`,
      { content: msg.content } as Msg,
      thunkAPI
    );
  }
);

export const deleteGuildMsg = asyncThunkAPI<
  void,
  { id: string; msgId: string }
>("guild/deleteMsg", async (args: { id: string; msgId: string }, thunkAPI) => {
  const { id, msgId } = args;
  return await requestAPI<void>(
    "DELETE",
    `/guilds/${id}/msgs/${msgId}`,
    null,
    thunkAPI
  );
});

export const editGuildMsg = asyncThunkAPI<
  void,
  { id: string; msgId: string; msg: Msg }
>(
  "guild/editMsg",
  async (args: { id: string; msgId: string; msg: Msg }, thunkAPI) => {
    const { id, msgId, msg } = args;
    return await requestAPI<void>(
      "PATCH",
      `/guilds/${id}/msgs/${msgId}`,
      msg,
      thunkAPI
    );
  }
);

export const readGuildMsg = asyncThunkAPI<void, string>(
  "guild/readMsg",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "POST",
      `/guilds/${id}/msgs/read`,
      null,
      thunkAPI
    );
  }
);

export const getGuildBans = asyncThunkAPI<Member[], string>(
  "guild/getBans",
  async (id: string, thunkAPI) => {
    const response = await requestAPI<Member[]>(
      "GET",
      `/guilds/${id}/bans`,
      null,
      thunkAPI
    );
    thunkAPI.dispatch(setGuildBannedLoaded(id));
    return response;
  }
);

export const banGuildMember = asyncThunkAPI<
  void,
  { id: string; userId: string }
>("guild/banMember", async (args: { id: string; userId: string }, thunkAPI) => {
  const { id, userId } = args;
  return await requestAPI<void>(
    "PUT",
    `/guilds/${id}/bans/${userId}`,
    null,
    thunkAPI
  );
});

export const unbanGuildMember = asyncThunkAPI<
  void,
  { id: string; userId: string }
>(
  "guild/unbanMember",
  async (args: { id: string; userId: string }, thunkAPI) => {
    const { id, userId } = args;
    return await requestAPI<void>(
      "DELETE",
      `/guilds/${id}/bans/${userId}`,
      null,
      thunkAPI
    );
  }
);

export const getGuildInvites = asyncThunkAPI<Invite[], string>(
  "guild/getInvites",
  async (id: string, thunkAPI) => {
    const response = await requestAPI<Invite[]>(
      "GET",
      `/guilds/${id}/invites`,
      null,
      thunkAPI
    ).catch((err) => {
      if (axios.isAxiosError(err))
        return thunkAPI.rejectWithValue(
          (err as AxiosError<ErrorBody>)?.response?.data ?? ({} as ErrorBody)
        );
    });
    thunkAPI.dispatch(setGuildInvitesLoaded(id));
    return response;
  }
);

export const createGuildInvite = asyncThunkAPI<void, string>(
  "guild/createInvite",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "POST",
      `/guilds/${id}/invites`,
      null,
      thunkAPI
    );
  }
);

export const deleteGuildInvite = asyncThunkAPI<
  void,
  { id: string; inviteId: string }
>(
  "guild/deleteInvite",
  async (args: { id: string; inviteId: string }, thunkAPI) => {
    const { id, inviteId } = args;
    return await requestAPI<void>(
      "DELETE",
      `/guilds/${id}/invites/${inviteId}`,
      null,
      thunkAPI
    );
  }
);

export const joinGuildInvite = asyncThunkAPI<void, Invite>(
  "guild/joinInvite",
  async (invite: Invite, thunkAPI) => {
    return await requestAPI<void>(
      "POST",
      `/guilds/join`,
      {
        invite: invite.invite,
      },
      thunkAPI
    );
  }
);

export const createGuildAdmin = asyncThunkAPI<
  void,
  { id: string; userId: string }
>(
  "guild/createAdmin",
  async (args: { id: string; userId: string }, thunkAPI) => {
    const { id, userId } = args;
    return await requestAPI<void>(
      "PUT",
      `/guilds/${id}/admins/${userId}`,
      null,
      thunkAPI
    );
  }
);

export const deleteGuildAdmin = asyncThunkAPI<
  void,
  { id: string; userId: string }
>(
  "guild/deleteAdmin",
  async (args: { id: string; userId: string }, thunkAPI) => {
    const { id, userId } = args;
    return await requestAPI<void>(
      "DELETE",
      `/guilds/${id}/admins/${userId}`,
      null,
      thunkAPI
    );
  }
);

export const userIsTyping = asyncThunkAPI<void, string>(
  "guild/userIsTyping",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "POST",
      `/guilds/${id}/msgs/typing`,
      null,
      thunkAPI
    );
  }
);