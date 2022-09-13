import { createSlice } from "@reduxjs/toolkit";
//import { postAuth, getAuth } from "../../api/authApi";

const clientSlice = createSlice({ //saves client side settings
    name: "client",
    initialState: {
        link : "", keyBind : {}, lastGuildActive : 0, redirectPanic : true, disguiseTab : false
    },
    reducers: { 
        clientLinkSet: (state, action) => { 
            state.link = action.payload.link;
        },
        clientKeyBindSet : (state, action) => {
            state.keyBind = action.payload.keyBind;
        },
        clientLastGuildActiveSet : (state, action) => {
            state.lastGuildActive = action.payload.guild;
        },
        clientRedirectPanicSet : (state,action) => {
            state.redirectPanic = action.payload.redirectPanic;
        },
        clientDisguiseTabSet : (state, action) => {
            state.disguiseTab = action.payload.disguiseTab;
        },
        clientClear: (state, action) => {
            state.link = "";
            state.keyBind = {};
        }
    }
});

export const { clientLinkSet, clientKeyBindSet , clientLastGuildActiveSet, clientRedirectPanicSet, clientDisguiseTabSet , clientClear } = clientSlice.actions;
export default clientSlice.reducer;
