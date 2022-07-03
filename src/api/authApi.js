import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi, getApi } from "./client";

//const cookies = new Cookies();

const postAuth = createAsyncThunk("auth/post", async (data) => {
    console.log("posting")
    const response = await postApi("user", {
        username: data.username,
        password: data.password,
        email: data.email
    });
    return response
})

const getAuth = createAsyncThunk("auth/get", async (data) => {
    const response = await getApi("user", { username: data.username, pwd: data.password });
    return response //(NOTE TO SELF) grabs data but if an error does occur it is handled
    //in the slice (extra reducers lol)
}) //returns a object not a function 

export { postAuth, getAuth };