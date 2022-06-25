import { createSlice } from "@reduxjs/toolkit";

const guildSlice = createSlice({
    name: "guilds",
    initialState: {
        guildInfo: {},
        guilds: []
        }
        , reducers: {
            guildAdd: (state, action) => {
                return { ...state, guildInfo: { ...state.guildInfo, [action.payload.guild]: action.payload.guildInfo }, guilds: [...state.guilds, action.payload.guild] };
            }
            , guildRemove: (state, action) => {
                return { ...state, guildInfo: { ...state.guildInfo, [action.payload.guild]: undefined }, guilds: [...state.guilds.filter(guild => guild !== action.payload.guild)] };
            }
            , guildSet: (state, action) => {
                return { ...state, guildInfo: { ...action.payload.guildInfo }, guilds: [...action.payload.guild] };
            }
        }
});

export const { guildAdd, guildRemove, guildSet } = guildSlice.actions;
export default guildSlice.reducer;