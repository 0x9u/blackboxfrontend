import { createAsyncThunk } from "@reduxjs/toolkit";
import { putApi, getApi, postApi } from "./client";

const getGuilds = createAsyncThunk("guilds/get", async (args, getState) => {
    const response = await getApi("guild", {}, {
        headers: {
            "Auth-Token": getState().auth.token
        }
    });
    return response
});

const createGuild = createAsyncThunk("guilds/post", async (args, getState) => {
    //const {icon, name} = args; //uncomment when implement profile picture uploading
    await postApi("guild", {
        name : args.name,
        //icon : icon,
    }, {
        headers: {
            "Auth-Token": getState().auth.token
        }
    }); /* return is unnessary this will be handled in the websockets*/
});

const changeGuild = createAsyncThunk("guilds/update", async (args, getState) => {
    await putApi("guild", {
        guild : args.guildId,
        name : args.name,
    }, {
        headers: {
        "Auth-Token": getState().auth.token
    }});
    //no need can use websockets to broadcast for all users
//    return response
});

const joinGuild = createAsyncThunk("guilds/join", async (args,getState) => {
    await getApi("guild/join",{
        invite : args.invite
    }, {
        headers: {
            "Auth-Token": getState().auth.token
        }
    });
});

export { getGuilds, createGuild, changeGuild, joinGuild };