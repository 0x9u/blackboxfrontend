import { createAsyncThunk } from "@reduxjs/toolkit";

const 
    EDITPASS = 0,
    EDITEMAIL = 1,
    EDITUSERNAME = 2;

const getUserInfo = createAsyncThunk("userInfo/get", async (args, getState) => {
    const response = await getApi("user/info", {}, {
        headers: {
            "Auth-Token": getState().auth.token
        }
    });
    return response
});

const updateUserInfo = createAsyncThunk("userInfo/put", async (args, getState) => { //no dispatch needed
    const {password, change, newData } = args
    await putApi("user/info", {
        password,
        change,
        newData
    }, {
        headers: {
            "Auth-Token": getState().auth.token
        }
    });
    //no need can use websockets to broadcast for all users
    //    return response
});

export { getUserInfo, updateUserInfo, EDITPASS, EDITEMAIL, EDITUSERNAME };