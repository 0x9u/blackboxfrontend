import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Msg } from "../../api/types/msg";
import { getMsgsDM } from "../../api/userApi";
import { getGuildMsgs } from "../../api/guildApi";

type MsgState = {
    msgs : Record<number, Msg>;
    author : Record<number, number[]>;
    guildMsgIds : Record<number, number[]>; //order newest to oldest
    dmMsgIds : Record<number, number[]>; //order newest to oldest
}

const initialState : MsgState = {
    msgs : {},
    author : {},
    guildMsgIds : {},
    dmMsgIds : {},
}

const msgSlice = createSlice({
    name : "msg",
    initialState,
    reducers : {
        addGuildMsg : (state, action : PayloadAction<{guildId : number, msg: Msg}>) => {
            const {guildId, msg} = action.payload;
            state.msgs[msg.MsgId] = msg;
            if (state.guildMsgIds[guildId] === undefined) {
                state.guildMsgIds[guildId] = [];
            }
            state.guildMsgIds[guildId].push(msg.MsgId);
        },
        removeGuildMsg : (state, action : PayloadAction<{guildId : number, msg : Msg}>) => {
            const {guildId, msg} = action.payload;
            if (state.guildMsgIds[guildId] === undefined) {
                console.log("not exists")
            }
            state.guildMsgIds[guildId] = state.guildMsgIds[guildId].filter((id) => id !== msg.MsgId)
            delete state.msgs[msg.MsgId];
        },
        resetMsgs : (state, action : PayloadAction<void>) => {
            state.msgs = {};
            state.author = {};
            state.guildMsgIds = {};
            state.dmMsgIds = {};
        },
    },
    extraReducers : (builder) => {
        builder.addMatcher(
            getMsgsDM.matchFulfilled,
            (state, action : PayloadAction<Msg[]> ) => {
                for (const msg of action.payload) {
                    state.msgs[msg.MsgId] = msg;
                    if (state.author[msg.Author.UserId] === undefined) { //if not exist
                        state.author[msg.Author.UserId] = [];
                    }
                    if (state.dmMsgIds[msg.MsgId] === undefined) {
                        state.dmMsgIds[msg.MsgId] = [];
                    }
                    state.author[msg.Author.UserId].push(msg.MsgId);
                    state.dmMsgIds[msg.MsgId].push(msg.MsgId);
                }
            }
        )
        builder.addMatcher(
            getGuildMsgs.matchFulfilled,
            (state, action : PayloadAction<Msg[]> ) => {
                for (const msg of action.payload) {
                    state.msgs[msg.MsgId] = msg;
                    if (state.author[msg.Author.UserId] === undefined) { //if not exist
                        state.author[msg.Author.UserId] = [];
                    }
                    if (state.guildMsgIds[msg.MsgId] === undefined) {
                        state.guildMsgIds[msg.MsgId] = [];
                    }
                    state.author[msg.Author.UserId].push(msg.MsgId);
                    state.guildMsgIds[msg.Author.UserId].push(msg.MsgId);
                }
            }
        )   
    },
});

export default msgSlice.reducer;