import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi, getApi } from "../../api/client.js";

//const cookies = new Cookies();

const postAuth = createAsyncThunk("auth/post", async (data) => {
    const response = await postApi("/user", data)
    return response
})

const getAuth = createAsyncThunk("auth/get", async (data) => {
    const response = await getApi("/user", { username : data.username, pwd: data.password });
    return response //(NOTE TO SELF) grabs data but if an error does occur it is handled
    //in the slice (extra reducers lol)
}) //returns a object not a function 

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: "", userId: 0, expires :0,
      //  error: null, status: "idle",
    },
    reducers: { //this is passed to createReducer which allows me to safely mutate states
        authSet: (state, action) => { //likely unused
            state.token = action.payload.token;
            state.userId = action.payload.userId
            state.expires = action.payload.expires
        }
        , authClear: (state, action) => {
            state.token = "";
            state.userId = 0;
            state.expires = 0;
        }
    },
    extraReducers: (builder) => { //signlogin page will subscribe to this slice!
        builder/*
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state, action) => {
                    state.status = "loading";
                }
            )*/
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state, action) => {
                    //state.status = "success";
                    state.token = action.payload.token;
                    state.userId = action.payload.userId;
                    state.expires = action.payload.expires;
                    //cookies.set("token",data["token"], {expires: new Date(data["expires"])});
                    //cookies.set("id",data["user_id"], {expires: new Date(data["expires"])});
                }
            )/*
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = "error";
                    state.error = action.error.message;
                }
            );*/
    }
});

export const { authSet, authClear } = authSlice.actions;
export { postAuth, getAuth };
export default authSlice.reducer;
