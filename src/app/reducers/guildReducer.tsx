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
    reducers : {},
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