import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildInvites } from "../../api/guildApi";
import { DmUser, Dm } from "../../api/types/dm";
import { Guild, Invite } from "../../api/types/guild";
import { getGuilds } from "../../api/userApi";
type GuildState = {
  guildIds: number[];
  dmIds: number[];
  dms: Record<number, DmUser>;
  guilds: Record<number, Guild>;
  invites: Record<number, Invite[]>;
};

const initialState: GuildState = {
  guildIds: [],
  dmIds: [],
  dms : {},
  guilds: {},
  invites: {},
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
      state.guilds[action.payload.id] = action.payload;
    },
    addDm: (state, action: PayloadAction<Dm>) => {
      state.dmIds.push(action.payload.id);
      const body : DmUser = {
        id: action.payload.id,
        unread : action.payload.unread,
        userId : action.payload.userInfo.id,
      }
      state.dms[action.payload.userInfo.id] = body;
    },
    removeDm: (state, action: PayloadAction<Dm>) => {
      state.dmIds = state.dmIds.filter( (id) => id !== action.payload.id);
      delete state.dms[action.payload.id];
    },
    updateDm: (state, action: PayloadAction<Dm>) => {
      if (!state.dmIds.includes(action.payload.id)) {
        console.log("not exists");
        return;
      }
      const body : DmUser = {
        id: action.payload.id,
        unread : action.payload.unread,
        userId : action.payload.userInfo.id,
      }
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
          state.guildIds.push(guild.id);
          state.guilds[guild.id] = guild;
        }
      }
    );
    builder.addMatcher(
      getGuildInvites.matchFulfilled,
      (state, action: PayloadAction<Invite[]>) => {
        for (const invite of action.payload) {
          if (state.invites[invite.guildId] === undefined) {
            state.invites[invite.guildId] = [];
          }
          state.invites[invite.guildId].push(invite);
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
  addDm,
  removeDm,
  updateDm,
  addInvite,
  removeInvite,
  resetGuilds,
} = guildSlice.actions;
