import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGuildMembers } from "../../api/guildApi";
import { Dm } from "../../api/types/dm";
import { GuildMembers } from "../../api/types/guild";
import { User } from "../../api/types/user";
import { getDMs, getSelf, getUser, getFriends } from "../../api/userApi";

type UserState = {
    users: Record<number, User>;
    
    friendIds: number[];
    requestedFriendIds: number[];
    blockedIds: number[];
    
    selfUser: number | null;

    guildMembersIds: Record<number, number[]>;
    userMemberCount: Record<number, number>;

    dms: Record<number, Dm>;
    dmIds: number[];
}

const initialState: UserState = {
    users: {},
    friendIds: [],
    requestedFriendIds: [],
    blockedIds: [],
    dmIds: [],
    dms : {},
    selfUser: null,
    guildMembersIds: {},
    userMemberCount: {},
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addFriendID: (state, action: PayloadAction<User>) => {
            state.friendIds.push(action.payload.UserId);
            state.users[action.payload.UserId] = action.payload;
        },
        addRequestedFriendID: (state, action: PayloadAction<User>) => {
            state.requestedFriendIds.push(action.payload.UserId);
            state.users[action.payload.UserId] = action.payload;
        },
        addBlockedID: (state, action: PayloadAction<User>) => {
            state.blockedIds.push(action.payload.UserId);
            state.users[action.payload.UserId] = action.payload;
        },
        addDMID: (state, action: PayloadAction<Dm>) => {
            state.dmIds.push(action.payload.DmId);
            state.dms[action.payload.DmId] = action.payload;
        },
        addGuildMembersID: (state, action: PayloadAction<{ guildId: number, user: User }>) => {
            const { guildId, user } = action.payload;
            if (state.guildMembersIds[guildId] === undefined) {
                console.log("not exists");
                return;
            }
            state.guildMembersIds[guildId].push(user.UserId);
            state.users[user.UserId] = user;
            if (state.userMemberCount[user.UserId] === undefined) {
                state.userMemberCount[user.UserId] = 0;
            }
            state.userMemberCount[user.UserId] += 1;
        },
        removeFriendID: (state, action: PayloadAction<User>) => {
            state.friendIds = state.friendIds.filter((id) => id !== action.payload.UserId);
            if (state.userMemberCount[action.payload.UserId] === 0
                && state.friendIds.indexOf(action.payload.UserId) === -1
                && state.requestedFriendIds.indexOf(action.payload.UserId) === -1
                && state.blockedIds.indexOf(action.payload.UserId) === -1
                && state.dmIds.indexOf(action.payload.UserId) === -1
                && state.selfUser !== action.payload.UserId
            ) {
                delete state.users[action.payload.UserId];
            }


        },
        removeRequestedFriendID: (state, action: PayloadAction<User>) => {
            const user = action.payload;
            state.requestedFriendIds = state.requestedFriendIds.filter((id) => id !== action.payload.UserId);
            if (state.userMemberCount[user.UserId] === 0
                && state.friendIds.indexOf(user.UserId) === -1
                && state.requestedFriendIds.indexOf(user.UserId) === -1
                && state.blockedIds.indexOf(user.UserId) === -1
                && state.dmIds.indexOf(user.UserId) === -1
                && state.selfUser !== user.UserId
            ) {
                delete state.users[user.UserId];
            }
        },
        removeBlockedID: (state, action: PayloadAction<User>) => {
            const user = action.payload;
            state.blockedIds = state.blockedIds.filter((id) => id !== action.payload.UserId);
            if (state.userMemberCount[user.UserId] === 0
                && state.friendIds.indexOf(user.UserId) === -1
                && state.requestedFriendIds.indexOf(user.UserId) === -1
                && state.blockedIds.indexOf(user.UserId) === -1
                && state.dmIds.indexOf(user.UserId) === -1
                && state.selfUser !== user.UserId
            ) {
                delete state.users[user.UserId];
            }
        },
        removeDMID: (state, action: PayloadAction<Dm>) => {
            const user = action.payload;
            state.dmIds = state.dmIds.filter((id) => id !== action.payload.DmId);
            if (state.dms[action.payload.DmId] === undefined) {
                console.log("weird")
                return
            }
            delete state.dms[action.payload.DmId];
        },
        removeGuildMembersID: (state, action : PayloadAction<{guildId : number, user : User}>) => {
            const {guildId, user} = action.payload;
            if (state.userMemberCount[user.UserId] === undefined) {
                console.log("weird")
                return
            }
            state.userMemberCount[user.UserId]--
            if (state.userMemberCount[user.UserId] === 0
                && state.friendIds.indexOf(user.UserId) === -1
                && state.requestedFriendIds.indexOf(user.UserId) === -1
                && state.blockedIds.indexOf(user.UserId) === -1
                && state.dmIds.indexOf(user.UserId) === -1
                && state.selfUser !== user.UserId
            ) {
                delete state.users[user.UserId];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            getSelf.matchFulfilled,
            (state, action: PayloadAction<User>) => {
                state.selfUser = action.payload.UserId;
                state.users[action.payload.UserId] = action.payload;
            }
        )
        builder.addMatcher(
            getUser.matchFulfilled,
            (state, action: PayloadAction<User>) => {
                state.users[action.payload.UserId] = action.payload;
            }
        )
        builder.addMatcher(
            getDMs.matchFulfilled,
            (state, action: PayloadAction<Dm[]>) => {
                for (const dm of action.payload) {
                    state.dmIds.push(dm.DmId);
                    state.dms[dm.DmId] = dm;
                }
            }
        )
        builder.addMatcher(
            getFriends.matchFulfilled,
            (state, action: PayloadAction<User[]>) => {
                for (const user of action.payload) {
                    state.friendIds.push(user.UserId);
                    state.users[user.UserId] = user;
                }
            }
        )
        builder.addMatcher(
            getGuildMembers.matchFulfilled,
            (state, action: PayloadAction<GuildMembers>) => {
                const { GuildId, Members } = action.payload;
                state.guildMembersIds[GuildId] = [];
                for (const member of Members) {
                    state.guildMembersIds[GuildId].push(member.UserId);
                    state.users[member.UserId] = member;
                    state.userMemberCount[member.UserId] = (state.userMemberCount[member.UserId] || 0) + 1;
                }
            }
        )
    },
});

export default userSlice.reducer;

export const {
    addFriendID,
    addRequestedFriendID,
    addBlockedID,
    addDMID,
    addGuildMembersID,
    removeFriendID,
    removeRequestedFriendID,
    removeBlockedID,
    removeDMID,
    removeGuildMembersID
} = userSlice.actions;