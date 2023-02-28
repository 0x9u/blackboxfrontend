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

//we are not using the cache since I can't really stream updates to the cache properly without making it a mess
export const chatApi = createApi({ //memory should be fine since its all referenced
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
  keepUnusedDataFor: 0, //dont bother keeping data when we exit to page e.g to games page
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});
