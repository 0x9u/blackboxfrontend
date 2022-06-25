import { createSlice } from "@reduxjs/toolkit";

const wsChatSlice = createSlice({
    name: "wsChat",
    initialState: {
        ws: null
    }
    , reducers: {
        wsChatSet: (state, action) => {
            return { ...state, ws: action.payload.ws };
        }
    }
});

export const { wsChatSet } = wsChatSlice.actions;
export default wsChatSlice.reducer;