import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, putApi } from "./client";

const
    EDITPASS = 0,
    EDITEMAIL = 1,
    EDITUSERNAME = 2;

const GetUserInfo = createAsyncThunk("userInfo/get", async (args, api) => {
    const response = await getApi("user/info", {}, {
        headers: {
            "Auth-Token": api.getState().auth.token
        }
    });
    return response
});

const UpdateUserInfo = createAsyncThunk("userInfo/put", async (args, api) => { //no dispatch needed
    const { password, change, newData } = args
    await putApi("user", {
        password,
        change,
        newData
    }, {
        headers: {
            "Auth-Token": api.getState().auth.token
        }
    });
    //no need can use websockets to broadcast for all users
    //    return response
});

export { GetUserInfo, UpdateUserInfo, EDITPASS, EDITEMAIL, EDITUSERNAME };