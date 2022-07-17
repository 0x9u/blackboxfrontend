import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi, getApi } from "./client";


//this function will be called when user is at max scroll height
const GetMsgs = createAsyncThunk("msgs/get", async (args, api) => {
    const currentGuild = api.getState().guilds.currentGuild;
    const currentGuildMsgs = api.getState().guilds.guildInfo[currentGuild].MsgHistory
    const response = await getApi("msg", {
        time: currentGuildMsgs[currentGuildMsgs.length-1]?.time ?? Date.now(),
        guild: currentGuild
    }, {
        headers: {
            "Auth-Token": api.getState().auth.token
        }
    });
    return response
});

const SendMsgs = createAsyncThunk("msgs/post", async (args, api) => { // no dispatch needed
    const { msg } = args;
    console.log("sending msg");
    await postApi("msg", {
        content: msg,
        guild: api.getState().guilds.currentGuild
    }, {
        headers: {
            "Auth-Token": api.getState().auth.token
        }
    }
    );
    console.log("msg sent!")

    //no need can use websockets to broadcast for all users
    //    return response
});

export {GetMsgs, SendMsgs};