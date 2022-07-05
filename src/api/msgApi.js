import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi, getApi } from "./client";

const getMsgs = createAsyncThunk("msgs/get", async (args, getState) => {
    const { time, guild } = args;
    const response = await getApi("msg", {
        time: Date.now() || time,
        guild: guild
    }, {
        headers: {
            "Auth-Token": getState().auth.token
        }
    });
    return response
});

const sendMsgs = createAsyncThunk("msgs/post", async (args, getState) => { // no dispatch needed
    const { msg, guild } = args;
    await postApi("msg", {
        msg: msg,
        guild: guild
    }, {
        headers: {
            "Auth-Token": getState().auth.token
        }
    }
    );
    //no need can use websockets to broadcast for all users
    //    return response
});

export {getMsgs, sendMsgs};