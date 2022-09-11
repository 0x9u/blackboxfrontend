import { createSlice } from "@reduxjs/toolkit";
//import { postAuth, getAuth } from "../../api/authApi";

const clientSlice = createSlice({ //saves client side settings
    name: "client",
    initialState: {
        link : "", keyBind : {}
    },
    reducers: { 
        clientLinkSet: (state, action) => { 
            state.link = action.payload.link;
        },
        clientKeyBindSet : (state, action) => {
            state.keyBind = action.payload.keyBind;
        }
        , clientClear: (state, action) => {
            state.link = "";
            state.keyBind = {};
        }
    }
});

export const { clientLinkSet, clientKeyBindSet ,clientClear } = clientSlice.actions;
export default clientSlice.reducer;
