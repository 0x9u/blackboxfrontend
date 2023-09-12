import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildInvites } from "../../api/guildApi";
import { DmUser, Dm } from "../../api/types/dm";
import { Guild, GuildList, Invite } from "../../api/types/guild";
import { getGuilds } from "../../api/userApi";
import { ErrorBody } from "../../api/types/error";
type GuildState = {
  guildIds: string[];
  dmIds: string[];
  dms: Record<string, DmUser>;
  guilds: Record<string, Guild>;
  invites: Record<string, Invite[]>;
  userIsTyping: Record<string, string[]>;
};

const initialState: GuildState = {
  guildIds: [],
  dmIds: [],
  dms: {}, //dms still access same guild messages
  guilds: {},
  invites: {},
  userIsTyping: {},
};

const guildSlice = createSlice({
  name: "guild",
  initialState,
  reducers: {
    addGuild: (state, action: PayloadAction<Guild>) => {
      state.guildIds.push(action.payload.id);
      state.guilds[action.payload.id] = action.payload;
    },
    removeGuild: (state, action: PayloadAction<Guild>) => {
      state.guildIds = state.guildIds.filter((id) => id !== action.payload.id);
      delete state.guilds[action.payload.id];
    },
    updateGuild: (state, action: PayloadAction<Guild>) => {
      if (!state.guildIds.includes(action.payload.id)) {
        console.log("not exists");
        return;
      }
      const unread = state.guilds[action.payload.id].unread;
      state.guilds[action.payload.id] = action.payload;
      state.guilds[action.payload.id].unread = unread;
    },
    incUnreadMsg: (state, action: PayloadAction<string>) => {
      console.log(
        "incUnreadMsg",
        action.payload,
        state.guilds[action.payload] !== undefined,
        state.dms[action.payload] !== undefined
      );
      if (state.guilds[action.payload] !== undefined) {
        state.guilds[action.payload].unread.count++;
      } else if (state.dms[action.payload] !== undefined) {
        state.dms[action.payload].unread.count++;
      } else {
        console.log("not exists");
      }
    },
    incMentionMsg: (state, action: PayloadAction<string>) => {
      if (state.guilds[action.payload] !== undefined) {
        state.guilds[action.payload].unread.mentions++;
      } else if (state.dms[action.payload] !== undefined) {
        state.dms[action.payload].unread.mentions++;
      } else {
        console.log("not exists");
      }
    },
    clearUnreadMsg: (state, action: PayloadAction<string>) => {
      //TODO: simplify this shit cause wtf am i doing
      if (state.guilds[action.payload] !== undefined) {
        state.guilds[action.payload].unread.count = 0;
        state.guilds[action.payload].unread.mentions = 0;
        state.guilds[action.payload].unread.time = new Date().toISOString();
      } else if (state.dms[action.payload] !== undefined) {
        state.dms[action.payload].unread.count = 0;
        state.dms[action.payload].unread.mentions = 0;
        state.dms[action.payload].unread.time = new Date().toISOString();
      } else {
        console.log("not exists");
      }
    },
    addDm: (state, action: PayloadAction<Dm>) => {
      console.log(action.payload);
      state.dmIds.push(action.payload.id);
      const body: DmUser = {
        id: action.payload.id,
        unread: action.payload.unread,
        userId: action.payload.userInfo.id,
      };
      console.log(body);
      state.dms[action.payload.id] = body;
    },
    removeDm: (state, action: PayloadAction<Dm>) => {
      state.dmIds = state.dmIds.filter((id) => id !== action.payload.id);
      delete state.dms[action.payload.id];
    },
    updateDm: (state, action: PayloadAction<Dm>) => {
      if (!state.dmIds.includes(action.payload.id)) {
        console.log("not exists");
        return;
      }
      const body: DmUser = {
        id: action.payload.id,
        unread: action.payload.unread,
        userId: action.payload.userInfo.id,
      };
      state.dms[action.payload.id] = body;
    },
    addInvite: (state, action: PayloadAction<Invite>) => {
      const invite = action.payload;
      if (!state.invites[invite.guildId]) {
        state.invites[invite.guildId] = [];
      }
      state.invites[invite.guildId].push(invite);
    },
    removeInvite: (state, action: PayloadAction<Invite>) => {
      const invite = action.payload;
      if (!state.invites[invite.guildId]) {
        console.log("not exists");
        return;
      }
      state.invites[invite.guildId] = state.invites[invite.guildId].filter(
        (oinvite) => oinvite.invite !== invite.invite
      );
    },
    addTyping: (
      state,
      action: PayloadAction<{ id: string; userId: string }>
    ) => {
      if (!state.userIsTyping[action.payload.id]) {
        state.userIsTyping[action.payload.id] = [];
      }
      state.userIsTyping[action.payload.id].push(action.payload.userId);
    },
    removeTyping: (
      state,
      action: PayloadAction<{ id: string; userId: string }>
    ) => {
      if (!state.userIsTyping[action.payload.id]) {
        console.log("not exists");
        return;
      }
      state.userIsTyping[action.payload.id] = state.userIsTyping[
        action.payload.id
      ].filter((userId) => userId !== action.payload.userId);
    },

    resetGuilds: (state) => {
      state.guildIds = [];
      state.guilds = {};
      state.dmIds = [];
      state.dms = {};
      state.invites = {};
      state.userIsTyping = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getGuilds.fulfilled,
      (state, action: PayloadAction<GuildList>) => {
        for (const guild of action.payload.guilds) {
          state.guildIds.push(guild.id);
          state.guilds[guild.id] = guild;
        }
        for (const dm of action.payload.dms) {
          state.dmIds.push(dm.id);
          const newDm: DmUser = {
            id: dm.id,
            unread: dm.unread,
            userId: dm.userInfo.id,
          };
          state.dms[dm.id] = newDm;
        }
      }
    );
    builder.addCase(
      getGuilds.rejected,
      (state, action: PayloadAction<ErrorBody | undefined>) => {
        console.log("shit happens");
        console.log(action.payload);
      }
    );
    builder.addCase(
      getGuildInvites.fulfilled,
      (state, action: PayloadAction<Invite[]>) => {
        const invites = action.payload;
        for (const invite of invites) {
          if (state.invites[invite.guildId] === undefined) {
            state.invites[invite.guildId] = [];
          }
          //crappy fix because when owner creates server a invite is automatically sent
          //and went this is activated it grabs the same one so becomes a duplicate
          if (
            state.invites[invite.guildId].some(
              (oinvite) => oinvite.invite === invite.invite
            )
          ) {
            continue;
          } //inefficient
          state.invites[invite.guildId].push(invite);
        }
      }
    );
    builder.addCase(
      getGuildInvites.rejected,
      (state, action: PayloadAction<ErrorBody | undefined>) => {
        console.log("shit happened");
        console.log(action.payload);
      }
    );
  },
});

export default guildSlice.reducer;

export const {
  addGuild,
  removeGuild,
  updateGuild,
  incUnreadMsg,
  incMentionMsg,
  clearUnreadMsg,
  addDm,
  removeDm,
  updateDm,
  addInvite,
  removeInvite,
  addTyping,
  removeTyping,
  resetGuilds,
} = guildSlice.actions;
