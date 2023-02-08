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
    membersIds : Record<number, number[]>;
}

const initialState : UserState = {
    users : {},
    friendIds : [],
    requestedFriendIds : [],
    blockedIds : [],
    dmIds : [],
    selfUser : null,
    membersIds : {},
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        addFriendID : (state, action : PayloadAction<number>) => {
            state.friendIds.push(action.payload);
        },
        addRequestedFriendID : (state, action : PayloadAction<number>) => {
            state.requestedFriendIds.push(action.payload);
        },
        addBlockedID : (state, action : PayloadAction<number>) => {
            state.blockedIds.push(action.payload);
        },
        addDMID : (state, action : PayloadAction<number>) => {
            state.dmIds.push(action.payload);
        },
        removeFriendID : (state, action : PayloadAction<number>) => {
            state.friendIds = state.friendIds.filter((id) => id !== action.payload);
        },
        removeRequestedFriendID : (state, action : PayloadAction<number>) => {
            state.requestedFriendIds = state.requestedFriendIds.filter((id) => id !== action.payload);
        },
        removeBlockedID : (state, action : PayloadAction<number>) => {
            state.blockedIds = state.blockedIds.filter((id) => id !== action.payload);
        }
    },
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