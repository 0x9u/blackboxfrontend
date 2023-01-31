import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    expires : 0,
}

const authSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setToken : (state, action) => {
            state.token = action.payload;
        },
        setExpires : (state, action) => {
            state.expires = action.payload;
        }
    }
});

export const { setToken, setExpires } = authSlice.actions;

export default authSlice.reducer;