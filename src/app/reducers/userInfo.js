import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        email: "",
        username: "",
        profileId: 0
    }
    , reducers: {
        userSet: (state, action) => {
            return { ...state, email: action.payload.email, username: action.payload.username, profileId: action.payload.profileId };
        }
        , userClear: (state, action) => {
            return { ...state, email: "", username: "", profileId: 0 };
        }
    }
});

export const { userSet, userClear } = userInfoSlice.actions;
export default userInfoSlice.reducer;