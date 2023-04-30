import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Msg } from "../../api/types/msg";
import { getGuildMsgs } from "../../api/guildApi";

type MsgState = {
  msgs: Record<string, Msg>; //figure out how to dynamically update user pfp for msgs later - can't be bothered do it rn
  author: Record<string, string[]>;
  guildMsgIds: Record<string, string[]>; //order newest to oldest
};

const initialState: MsgState = { // guildMsgIds also include dms because they are basically the same
  msgs: {},
  author: {},
  guildMsgIds: {},
};

const msgSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    addGuildMsg: (
      state,
      action: PayloadAction<{ guildId: string; msg: Msg }>
    ) => {
      const { guildId, msg } = action.payload;
      state.msgs[msg.id] = msg;
      if (state.guildMsgIds[guildId] === undefined) {
        state.guildMsgIds[guildId] = [];
      }
      if (state.author[msg.author.id] === undefined) {
        state.author[msg.author.id] = [];
      }
      state.author[msg.author.id].unshift(msg.id);
      state.guildMsgIds[guildId].unshift(msg.id);
    },
    editMsg: (state, action: PayloadAction<Msg>) => {
      const msg = action.payload;
      state.msgs[msg.id] = msg;
    },
    removeGuildMsg: (state, action: PayloadAction<Msg>) => {
      const msg = action.payload;
      if (state.guildMsgIds[msg.guildId] === undefined) {
        console.log("not exists");
        return
      }
      state.guildMsgIds[msg.guildId] = state.guildMsgIds[msg.guildId].filter(
        (id) => id !== msg.id
      );
      delete state.msgs[msg.id];
      if (state.author[msg.author.id] === undefined) {
        console.log("not exists");
        return
      }
      state.author[msg.author.id] = state.author[msg.author.id].filter(
        (id) => id !== msg.id
      );
    },
    removeAuthorMsg: (state, action: PayloadAction<Msg>) => {
      const msg = action.payload;
      if (state.author[msg.author.id] === undefined) {
        console.log("not exists");
        return;
      }
      for (const msgId of state.author[msg.author.id]) {
        delete state.msgs[msgId];
      }
      delete state.author[msg.author.id];
    },
    resetMsgs: (state) => {
      state.msgs = {};
      state.author = {};
      state.guildMsgIds = {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      getGuildMsgs.matchFulfilled,
      (state, action: PayloadAction<Msg[]>) => {
        for (const msg of action.payload) {
          state.msgs[msg.id] = msg;
          if (state.author[msg.author.id] === undefined) {
            //if not exist
            state.author[msg.author.id] = [];
          }
          if (state.guildMsgIds[msg.guildId] === undefined) {
            state.guildMsgIds[msg.guildId] = [];
          }
          state.author[msg.author.id].push(msg.id);
          state.guildMsgIds[msg.guildId].push(msg.id);
        }
      }
    );
  },
});

export default msgSlice.reducer;

export const {
  addGuildMsg,
  editMsg,
  removeGuildMsg,
  removeAuthorMsg,
  resetMsgs,
} = msgSlice.actions;
