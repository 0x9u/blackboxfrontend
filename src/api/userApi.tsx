import { asyncThunkAPI } from "../app/asyncThunk";
import { requestAPI } from "./api";
import { GuildList } from "./types/guild";
import {
  DeleteAccountForm,
  EditUserEmailForm,
  EditUserNameForm,
  EditUserPasswordForm,
  EditUserPictureForm,
  FriendRequest,
  User,
} from "./types/user";

export const getUser = asyncThunkAPI<User, string>(
  "user/getUser",
  async (id: string, thunkAPI) => {
    return await requestAPI<User>("GET", `/users/${id}`, null, thunkAPI);
  }
);

export const getSelf = asyncThunkAPI<User, void>(
  "user/getSelf",
  async (_: void, thunkAPI) => {
    return await requestAPI<User>("GET", `/users/@me`, null, thunkAPI);
  }
);

export const getGuilds = asyncThunkAPI<GuildList, void>(
  "user/getGuilds",
  async (_: void, thunkAPI) => {
    return await requestAPI<GuildList>(
      "GET",
      `/users/@me/guilds`,
      null,
      thunkAPI
    );
  }
);

export const leaveGuild = asyncThunkAPI<void, string>(
  "user/leaveGuild",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "DELETE",
      `/users/@me/guilds/${id}`,
      null,
      thunkAPI
    );
  }
);

export const getBlocked = asyncThunkAPI<User[], void>(
  "user/getBlocked",
  async (_: void, thunkAPI) => {
    return await requestAPI<User[]>(
      "GET",
      `/users/@me/blocked`,
      null,
      thunkAPI
    );
  }
);

export const openDM = asyncThunkAPI<void, string>(
  "user/openDM",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "POST",
      `/users/@me/dms`,
      {
        ReceiverId: id,
      },
      thunkAPI
    );
  }
);

export const deleteDM = asyncThunkAPI<void, string>(
  "user/deleteDM",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "DELETE",
      `/users/@me/dms/${id}`,
      null,
      thunkAPI
    );
  }
);

export const getFriends = asyncThunkAPI<User[], void>(
  "user/getFriends",
  async (_: void, thunkAPI) => {
    return await requestAPI<User[]>(
      "GET",
      `/users/@me/friends`,
      null,
      thunkAPI
    );
  }
);

export const getRequestedFriends = asyncThunkAPI<FriendRequest, void>(
  "user/getRequestedFriends",
  async (_: void, thunkAPI) => {
    return await requestAPI<FriendRequest>(
      "GET",
      `/users/@me/requests`,
      null,
      thunkAPI
    );
  }
);

export const editUserName = asyncThunkAPI<void, EditUserNameForm>(
  "user/editUserName",
  async (body: EditUserNameForm, thunkAPI) => {
    return await requestAPI<void>("PATCH", `/users/@me`, body, thunkAPI);
  }
);

export const editUserEmail = asyncThunkAPI<void, EditUserEmailForm>(
  "user/editUserEmail",
  async (body: EditUserEmailForm, thunkAPI) => {
    return await requestAPI<void>("PATCH", `/users/@me`, body, thunkAPI);
  }
);

export const editUserPassword = asyncThunkAPI<void, EditUserPasswordForm>(
  "user/editUserPassword",
  async (body: EditUserPasswordForm, thunkAPI) => {
    return await requestAPI<void>("PATCH", `/users/@me`, body, thunkAPI);
  }
);

export const editUserPicture = asyncThunkAPI<void, EditUserPictureForm>(
  "user/editUserPicture",
  async (args: EditUserPictureForm, thunkAPI) => {
    const formData = new FormData();
    const body = {
      password: args.password,
    };
    formData.append("body", JSON.stringify(body));
    const data = new Blob([args.image], { type: args.image.type });
    formData.append("image", data, args.image.name);

    return await requestAPI<void>("PATCH", `/users/@me`, formData, thunkAPI);
  }
);

export const blockUser = asyncThunkAPI<void, string>(
  "user/blockUser",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "PUT",
      `/users/@me/blocked/${id}`,
      null,
      thunkAPI
    );
  }
);

export const unblockUser = asyncThunkAPI<void, string>(
  "user/unblockUser",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "DELETE",
      `/users/@me/blocked/${id}`,
      null,
      thunkAPI
    );
  }
);

export const sendFriendRequest = asyncThunkAPI<void, string>(
  "user/sendFriendRequest",
  async (username: string, thunkAPI) => {
    return await requestAPI<void>(
      "PUT",
      `/users/@me/friends`,
      {
        username,
      },
      thunkAPI
    );
  }
);

export const sendFriendRequestById = asyncThunkAPI<void, string>(
  "user/sendFriendRequestById",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "PUT",
      `/users/@me/friends/${id}`,
      null,
      thunkAPI
    );
  }
);

export const acceptFriendRequest = asyncThunkAPI<void, string>(
  "user/acceptFriendRequest",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "POST",
      `/users/@me/requests/${id}/accept`,
      null,
      thunkAPI
    );
  }
);

export const declineFriendRequest = asyncThunkAPI<void, string>(
  "user/declineFriendRequest",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "POST",
      `/users/@me/requests/${id}/decline`,
      null,
      thunkAPI
    );
  }
);

export const removeFriend = asyncThunkAPI<void, string>(
  "user/removeFriend",
  async (id: string, thunkAPI) => {
    return await requestAPI<void>(
      "DELETE",
      `/users/@me/friends/${id}`,
      null,
      thunkAPI
    );
  }
);

export const deleteAccount = asyncThunkAPI<void, DeleteAccountForm>(
  "user/deleteAccount",
  async (body: DeleteAccountForm, thunkAPI) => {
    return await requestAPI<void>("DELETE", `/users/@me`, body, thunkAPI);
  }
);
