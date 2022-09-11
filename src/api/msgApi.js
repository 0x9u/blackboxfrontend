import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi, getApi, deleteApi, putApi } from "./client";


//this function will be called when user is at max scroll height
const GetMsgs = createAsyncThunk("msgs/get", async (args, api) => {
    const currentGuild = api.getState().guilds.currentGuild;
    const currentGuildMsgs = api.getState().guilds.guildInfo[currentGuild].MsgHistory
    const response = await getApi("msg", {
        time: currentGuildMsgs[currentGuildMsgs?.length-1]?.Time ?? Date.now(),
        guild: currentGuild
    }, {
        headers: {
            "Auth-Token": api.getState().auth.token
        }
    });
    return response
});

const SendMsgs = createAsyncThunk("msgs/post", async (args, api) => { // no dispatch needed
    const { msg, guild } = args;
    await postApi("msg", {
        content: msg,
        requestId : api.requestId,
        guild
    }, {
        headers: {
            "Auth-Token": api.getState().auth.token
        }
    }
    );

    //no need can use websockets to broadcast for all users
    //    return response
});

const EditMsgs = createAsyncThunk("msgs/put", async (args, api) => {
    const { msg, guild, id } = args;
    await putApi("msg", {
        content : msg,
        Id : id,
        guild
    }, {
        headers : {
            "Auth-Token" : api.getState().auth.token
        }
    });
})

const DeleteMsgs = createAsyncThunk("msgs/delete", async(args, api) => {
    const { Id, Author } = args;
    await deleteApi("msg", {
        Id : Id,
        Guild : api.getState().guilds.currentGuild,
        Author : Author ?? 0
    }, {
        headers : {
            "Auth-Token" : api.getState().auth.token
        }
    })
})

export {GetMsgs, SendMsgs, DeleteMsgs, EditMsgs};