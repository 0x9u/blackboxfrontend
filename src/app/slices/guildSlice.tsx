import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildInvites } from "../../api/guildApi";
import { Guild, guildInvites } from "../../api/types/guild";
import { getGuilds } from "../../api/userApi";
type GuildState = {
    guildIds : number[];
    guilds : Record<number, Guild>;
    invites : Record<number, string[]>;
}

const initialState : GuildState = {
    guildIds : [],
    guilds : {},
    invites : {},
}

const guildSlice = createSlice({
    name : "guild",
    initialState,
    reducers : {
        addGuild : (state, action : PayloadAction<Guild>) => {
            state.guildIds.push(action.payload.GuildId);
            state.guilds[action.payload.GuildId] = action.payload;
        },
        removeGuild : (state, action : PayloadAction<number>) => {
            state.guildIds = state.guildIds.filter((id) => id !== action.payload);
            delete state.guilds[action.payload];
        },
        updateGuild : (state, action : PayloadAction<Guild>) => {
            if (!state.guildIds.includes(action.payload.GuildId)) {
                console.log("not exists");
                return;
            }
            state.guilds[action.payload.GuildId] = action.payload;
        },
        addInvite : (state, action : PayloadAction<{guildId : number, invite : string}>) => {
            if (!state.invites[action.payload.guildId]) {
                state.invites[action.payload.guildId] = [];
            }
            state.invites[action.payload.guildId].push(action.payload.invite);
        },
        removeInvite : (state, action : PayloadAction<{guildId : number, invite : string}>) => {
            if (!state.invites[action.payload.guildId]) {
                console.log("not exists")
                return;
            }
            state.invites[action.payload.guildId] = state.invites[action.payload.guildId].filter((invite) => invite !== action.payload.invite);
        },
        resetGuilds : (state) => {
            state.guildIds = [];
            state.guilds = {};
            state.invites = {};
        }
    },
    extraReducers : (builder) => {
        builder.addMatcher(
            getGuilds.matchFulfilled,
            (state, action : PayloadAction<Guild[]>) => {
                for (const guild of action.payload) {
                    state.guildIds.push(guild.GuildId);
                    state.guilds[guild.GuildId] = guild;
                }
            }
        )
        builder.addMatcher(
            getGuildInvites.matchFulfilled,
            (state, action : PayloadAction<guildInvites>) => {
                state.invites[action.payload.GuildId] = action.payload.Invites;
            }
            
        )
    }
});

export default guildSlice.reducer;

export const {

} = guildSlice.actions;