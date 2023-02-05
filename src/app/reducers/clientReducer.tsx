import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ClientState = {
    currentGuild : number | null;
    currentDM : number | null;
    currentMode : "guild" | "dm";
}

const initialState : ClientState = {
    currentGuild : null,
    currentDM : null,
    currentMode : "guild",
}

const clientSlice = createSlice({
    name : "client",
    initialState,
    reducers : {
        setCurrentGuild : (state, action : PayloadAction<number | null>) => {
            state.currentGuild = action.payload;
        },
        setCurrentDM : (state, action : PayloadAction<number | null>) => {
            state.currentDM = action.payload;
        },
        setCurrentMode : (state, action : PayloadAction<"guild" | "dm">) => {
            state.currentMode = action.payload;
        }
    },
});

export default clientSlice.reducer;