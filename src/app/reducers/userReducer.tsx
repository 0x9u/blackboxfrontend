import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../api/types/user";
import { getDMs, getSelf, getUser, getFriends } from "../../api/userApi";

type UserState = {
    users : Record<number, User>;
    friendIds : number[];
    requestedFriendIds : number[];
    blockedIds : number[];
    dmIds : number[];
    selfUser : number | null;
}

const initialState : UserState = {
    users : {},
    friendIds : [],
    requestedFriendIds : [],
    blockedIds : [],
    dmIds : [],
    selfUser : null,
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addMatcher(
            getSelf.matchFulfilled,
            (state, action : PayloadAction<User> ) => {
                state.selfUser = action.payload.UserId;
                state.users[action.payload.UserId] = action.payload;
            }
        )
        builder.addMatcher(
            getUser.matchFulfilled,
            (state, action : PayloadAction<User> ) => {
                state.users[action.payload.UserId] = action.payload;
            }
        )
        builder.addMatcher(
            getDMs.matchFulfilled,
            (state, action : PayloadAction<User[]> ) => {
                for (const user of action.payload) {
                    state.dmIds.push(user.UserId);
                    state.users[user.UserId] = user;
                }
            }
        )
        builder.addMatcher(
            getFriends.matchFulfilled,
            (state, action : PayloadAction<User[]> ) => {
                for (const user of action.payload) {
                    state.friendIds.push(user.UserId);
                    state.users[user.UserId] = user;
                }
            }
        )
    },
});

export default userSlice.reducer;