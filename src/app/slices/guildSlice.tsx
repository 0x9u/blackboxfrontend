import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildInvites } from "../../api/guildApi";
import { Guild, Invite } from "../../api/types/guild";
import { getGuilds } from "../../api/userApi";
type GuildState = {
  guildIds: number[];
  guilds: Record<number, Guild>;
  invites: Record<number, Invite[]>;
};

const initialState: GuildState = {
  guildIds: [],
  guilds: {},
  invites: {},
};

const guildSlice = createSlice({
  name: "guild",
  initialState,
  reducers: {
    addGuild: (state, action: PayloadAction<Guild>) => {
      state.guildIds.push(action.payload.GuildId);
      state.guilds[action.payload.GuildId] = action.payload;
    },
    removeGuild: (state, action: PayloadAction<Guild>) => {
      state.guildIds = state.guildIds.filter((id) => id !== action.payload.GuildId);
      delete state.guilds[action.payload.GuildId];
    },
    updateGuild: (state, action: PayloadAction<Guild>) => {
      if (!state.guildIds.includes(action.payload.GuildId)) {
        console.log("not exists");
        return;
      }
      state.guilds[action.payload.GuildId] = action.payload;
    },
    addInvite: (state, action: PayloadAction<Invite>) => {
      const invite = action.payload;
      if (!state.invites[invite.GuildId]) {
        state.invites[invite.GuildId] = [];
      }
      state.invites[invite.GuildId].push(invite);
    },
    removeInvite: (state, action: PayloadAction<Invite>) => {
      const invite = action.payload;
      if (!state.invites[invite.GuildId]) {
        console.log("not exists");
        return;
      }
      state.invites[invite.GuildId] = state.invites[invite.GuildId].filter(
        (oinvite) => oinvite.Invite !== invite.Invite
      );
    },
    resetGuilds: (state) => {
      state.guildIds = [];
      state.guilds = {};
      state.invites = {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      getGuilds.matchFulfilled,
      (state, action: PayloadAction<Guild[]>) => {
        for (const guild of action.payload) {
          state.guildIds.push(guild.GuildId);
          state.guilds[guild.GuildId] = guild;
        }
      }
    );
    builder.addMatcher(
      getGuildInvites.matchFulfilled,
      (state, action: PayloadAction<Invite[]>) => {
        for (const invite of action.payload) {
          if (state.invites[invite.GuildId] === undefined) {
            state.invites[invite.GuildId] = [];
          }
          state.invites[invite.GuildId].push(invite);
        }
      }
    );
  },
});

export default guildSlice.reducer;

export const {
  addGuild,
  removeGuild,
  updateGuild,
  addInvite,
  removeInvite,
  resetGuilds,
} = guildSlice.actions;
