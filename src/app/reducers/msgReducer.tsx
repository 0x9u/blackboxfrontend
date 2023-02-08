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
    reducers : {},
    extraReducers : (builder) => {
        builder.addMatcher(
            getMsgsDM.matchFulfilled,
            (state, action : PayloadAction<Msg[]> ) => {
                for (const msg of action.payload) {
                    state.msgs[msg.MsgId] = msg;
                    if (state.author[msg.Author.UserId] === undefined) { //if not exist
                        state.author[msg.Author.UserId] = [];
                    }
                    state.author[msg.Author.UserId].push(msg.MsgId);
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
                    state.author[msg.Author.UserId].push(msg.MsgId);
                }
            }
        )   
    },
});

export default msgSlice.reducer;