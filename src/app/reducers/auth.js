import { createSlice } from "@reduxjs/toolkit";
//import { postAuth, getAuth } from "../../api/authApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        //i kinda forget what i put userId for so idk man
        token: "", userId: 0, expires: 0,
        //  error: null, status: "idle",
    },
    reducers: { //this is passed to createReducer which allows me to safely mutate states
        authSet: (state, action) => { //likely unused
            state.token = action.payload.Token;
            state.userId = action.payload.UserId
            state.expires = action.payload.Expires
        }
        , authClear: (state, action) => {
            state.token = "";
            state.userId = 0;
            state.expires = 0;
        }
    },
    extraReducers: (builder) => { //signlogin page will subscribe to this slice!
        builder
            .addMatcher(
                (action) => action.type.match(/auth\/[a-z]*\/fulfilled/),
                (state, action) => {
                    //state.status = "success";
                    console.log("fulfilled!")
                    state.token = action.payload.Token;
                    state.userId = action.payload.UserId;
                    state.expires = action.payload.Expires;
                }
            )
    }
});

export const { authSet, authClear } = authSlice.actions;
export default authSlice.reducer;
