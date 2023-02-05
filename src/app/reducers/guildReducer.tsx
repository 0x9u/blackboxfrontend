import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Guild } from "../../api/types/guild";
import { getGuilds } from "../../api/userApi";
type GuildState = {
    guildIds : number[];
    guilds : Record<number, Guild>;
}

const initialState : GuildState = {
    guildIds : [],
    guilds : {},
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
    }
});

export default guildSlice.reducer;