import { createAsyncThunk } from "@reduxjs/toolkit";
import { msgSetDoNotAutoRead } from "../app/reducers/guilds";
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
    api.dispatch(msgSetDoNotAutoRead({ DoNotAutoRead : false})); //fix for unread messages when client sends own messages
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
    const { Msg, Guild, Id, RequestId } = args;
    await putApi("msg", {
        content : Msg,
        Id : Id,
        RequestId : RequestId, //requestid already exists in history
        Guild
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
        RequestId : args.RequestId, //requestid already exists in history
        Guild : api.getState().guilds.currentGuild,
        Author : Author ?? 0
    }, {
        headers : {
            "Auth-Token" : api.getState().auth.token
        }
    })
});

const DeleteAllUserMsg = createAsyncThunk("user/deletemsg", async (args, api) => {
    console.log("delete all user msg")
    await deleteApi("user/deletemsg", {
        
    }, {
        headers : {
            "Auth-Token" : api.getState().auth.token
        }
    })
})

const DeleteAllGuildMsg = createAsyncThunk("guild/deletemsg", async (args, api) => {
    console.log("delete all guild msg")
    await deleteApi("guild/deletemsg", {
        Guild : api.getState().guilds.currentGuild
    }, {
        headers : {
            "Auth-Token" : api.getState().auth.token
        }
    })
})

const UnreadMsg = createAsyncThunk("msgs/unread", async (args, api) => {
    const { Guild } = args;
    const response = await getApi("msg/unread", {
        Guild
    }, {
        headers : {
            "Auth-Token" : api.getState().auth.token
        }
    })
    return response;
})

const MarkMsgRead = createAsyncThunk("msgs/read", async (args, api) => {
    console.log('test msg read');
    await postApi("msg/read", {
        Guild : api.getState().guilds.currentGuild
    }, {
        headers : {
            "Auth-Token" : api.getState().auth.token
        }
    })
})


export {GetMsgs, SendMsgs, DeleteMsgs, EditMsgs, DeleteAllUserMsg, DeleteAllGuildMsg, UnreadMsg, MarkMsgRead};