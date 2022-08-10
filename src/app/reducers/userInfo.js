import { createSlice } from "@reduxjs/toolkit";

import { GetUserInfo } from "../../api/userInfoApi";

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        email: "",
        username: "",
        icon: 0
    }
    , reducers: {
        userSet: (state, action) => {
            state.email = action.payload.Email;
            state.username = action.payload.Username;
            state.icon = action.payload.Icon;
        },
        userClear: (state, action) => {
            state.email = "";
            state.username = "";
            state.icon = 0;
        },
        userChange: (state, action) => {
            switch (action.payload.Change) {
                case 1:
                    state.email = action.payload.NewData;
                    break;
                case 2:
                    state.username = action.payload.NewData;
                    break;
                default:
                    console.log("unidentified change");
                    break;
            }
        }

    }
    , extraReducers: (builder) => {
        builder.addCase(GetUserInfo.fulfilled, (state, action) => {
            state.email = action.payload.Email;
            state.username = action.payload.Username;
            state.icon = action.payload.Icon;
        })
    }
});

export const { userSet, userClear, userChange } = userInfoSlice.actions;
export default userInfoSlice.reducer;