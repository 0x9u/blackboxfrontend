import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
/*
what the fuck am I doing
*/

/*
planned schema
{
    "guildIds": [1] // set of guild ids
    "friendIds" : [1] // set of friend ids
    "requestedFriendIds" : [1]
    "blockedIds" : [1]
    "dmIds" : [1]
    "selfUser": 2
    "users": {
      1: UserInfo
    },
    messages : {
      1: Message
    },
    author : { //for clearing easier
      1 : [
        1,2,3
      ]
    }
    dm : {
      1: {
        "messages": [1]
      }
    },
    "guilds" : {
      1: {
        "messages": [1]
        "members": [1] // set of user ids
        invites : [
          "a"
        ],
        guildInfo: GuildInfo
      }
    }
}
*/
export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
