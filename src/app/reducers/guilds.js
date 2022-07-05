import { createSlice } from "@reduxjs/toolkit";
import { getGuilds } from "../../api/guildApi";
import { getMsgs } from "../../api/msgApi";

/*
format for guilds (guildInfo)
{
    name : string,
    icon : id, // will be unused for now so its 0
    members : [
        {
            userId : int,
            username : string,
            profileId : int, //unused so its 0
        }
    ],
    msgHistory : [
        {
            userId : int,
            username : string,
            profileId : int, //unused so its 0
            msg : string,
            time : int,
        }
    ]
    
}
*/

const guildSlice = createSlice({
    name: "guilds",
    initialState: {
        guildInfo: {},
        guilds: [], //order list of guilds
        currentGuild: 0
    }
    , reducers: {
        guild: {
            add: (state, action) => { //accepts guild : int, info: object
                state.guildInfo[action.payload.guild] = action.payload.info;
                state.guildInfo[action.payload.guild].msgHistory = [];
                state.guilds.push(action.payload.guild);
            }
            , remove: (state, action) => { //accepts guild : int
                state.guildInfo[action.payload.guild] = undefined;
                state.guilds = state.guilds.filter(guild => guild !== action.payload.guild)
                state.currentGuild = state.currentGuild !== action.payload.guild ? state.currentGuild : 0;
            }
            , set: (state, action) => { //accepts guildInfo : object<string : object>, guilds : array<int>
                state.guildInfo = action.payload.guildInfo;
                state.guilds = action.payload.guilds;
                //state.currentGuild = action.payload.currentGuild; //most likely will not be stored in database
            }
        },
        msg: {
            add: (state, action) => { //accepts guild : int, msg : object
                state.guildInfo[action.payload.guild].msgHistory.push(action.payload.msg);
            }
            , remove: (state, action) => { //accepts guild : int, msg : object
                state.guildInfo[action.payload.guild].msgHistory = state.guildInfo[action.payload.guild]
                    .msgHistory.filter(msg => msg.id !== action.payload.id);
            }
        },
    },
    extraReducers: (builders) => {
        builders.addCase(getGuilds.fulfilled, (state, action) => {
            state.guilds = action.payload.guilds;
            state.guildInfo = action.payload.guildInfo;
        })
            .addCase(getMsgs.fulfilled, (state, action) => {
                state.guildInfo[state.currentGuild].msgHistory.push(action.payload);
            });

    }

});

export const { guildAdd, guildRemove, guildSet } = guildSlice.actions;
export default guildSlice.reducer;