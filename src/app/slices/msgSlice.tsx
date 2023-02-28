import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Msg } from "../../api/types/msg";
import { getMsgsDM } from "../../api/userApi";
import { getGuildMsgs } from "../../api/guildApi";

type MsgState = {
  msgs: Record<number, Msg>; //figure out how to dynamically update user pfp for msgs later - can't be bothered do it rn
  author: Record<number, number[]>;
  guildMsgIds: Record<number, number[]>; //order newest to oldest
  dmMsgIds: Record<number, number[]>; //order newest to oldest
};

const initialState: MsgState = {
  msgs: {},
  author: {},
  guildMsgIds: {},
  dmMsgIds: {},
};

const msgSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    addGuildMsg: (
      state,
      action: PayloadAction<{ guildId: number; msg: Msg }>
    ) => {
      const { guildId, msg } = action.payload;
      state.msgs[msg.MsgId] = msg;
      if (state.guildMsgIds[guildId] === undefined) {
        console.log("not exists");
      }
      state.guildMsgIds[guildId].push(msg.MsgId);
    },
    addDmMsg: (state, action: PayloadAction<Msg>) => {
      const msg = action.payload;
      state.msgs[msg.MsgId] = msg;
      if (state.author[msg.Author.UserId] === undefined) {
        //if not exist
        state.author[msg.Author.UserId] = [];
      }
      state.author[msg.Author.UserId].push(msg.MsgId);
      state.dmMsgIds[msg.Author.UserId].push(msg.MsgId);
    },
    editMsg: (state, action: PayloadAction<Msg>) => {
      const msg = action.payload;
      state.msgs[msg.MsgId] = msg;
    },
    removeGuildMsg: (state, action: PayloadAction<Msg>) => {
      const msg = action.payload;
      if (state.guildMsgIds[msg.GuildId] === undefined) {
        console.log("not exists");
      }
      state.guildMsgIds[msg.GuildId] = state.guildMsgIds[msg.GuildId].filter(
        (id) => id !== msg.MsgId
      );
      delete state.msgs[msg.MsgId];
      if (state.author[msg.Author.UserId] === undefined) {
        console.log("not exists");
      }
      state.author[msg.Author.UserId] = state.author[msg.Author.UserId].filter(
        (id) => id !== msg.MsgId
      );
    },
    removeDmMsg: (state, action: PayloadAction<Msg>) => {
      const msg = action.payload;
      state.dmMsgIds[msg.DmId] = state.dmMsgIds[msg.MsgId].filter(
        (id) => id !== msg.MsgId
      );
      state.author[msg.Author.UserId] = state.author[msg.Author.UserId].filter(
        (id) => id !== msg.MsgId
      );
      delete state.msgs[msg.MsgId];
    },
    removeAuthorMsg: (state, action: PayloadAction<Msg>) => {
      const msg = action.payload;
      if (state.author[msg.Author.UserId] === undefined) {
        console.log("not exists");
        return;
      }
      if (state.author[msg.Author.UserId] === undefined) {
        console.log("not exists");
        return;
      }
      for (const msgId of state.author[msg.Author.UserId]) {
        delete state.msgs[msgId];
      }
      state.author[msg.Author.UserId] = [];
    },
    resetMsgs: (state) => {
      state.msgs = {};
      state.author = {};
      state.guildMsgIds = {};
      state.dmMsgIds = {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      getMsgsDM.matchFulfilled,
      (state, action: PayloadAction<Msg[]>) => {
        for (const msg of action.payload) {
          state.msgs[msg.MsgId] = msg;
          if (state.author[msg.Author.UserId] === undefined) {
            //if not exist
            state.author[msg.Author.UserId] = [];
          }
          if (state.dmMsgIds[msg.DmId] === undefined) {
            state.dmMsgIds[msg.DmId] = [];
          }
          state.author[msg.Author.UserId].push(msg.MsgId);
          state.dmMsgIds[msg.DmId].push(msg.MsgId);
        }
      }
    );
    builder.addMatcher(
      getGuildMsgs.matchFulfilled,
      (state, action: PayloadAction<Msg[]>) => {
        for (const msg of action.payload) {
          state.msgs[msg.MsgId] = msg;
          if (state.author[msg.Author.UserId] === undefined) {
            //if not exist
            state.author[msg.Author.UserId] = [];
          }
          if (state.guildMsgIds[msg.MsgId] === undefined) {
            state.guildMsgIds[msg.MsgId] = [];
          }
          state.author[msg.Author.UserId].push(msg.MsgId);
          state.guildMsgIds[msg.Author.UserId].push(msg.MsgId);
        }
      }
    );
  },
});

export default msgSlice.reducer;

export const {
  addGuildMsg,
  addDmMsg,
  editMsg,
  removeGuildMsg,
  removeDmMsg,
  removeAuthorMsg,
  resetMsgs,
} = msgSlice.actions;
