import { createSlice, current } from "@reduxjs/toolkit";
import { GetGuilds, GetGuildUsers } from "../../api/guildApi";
import { GetMsgs } from "../../api/msgApi";

/*
format for guilds (guildInfo)
{
    name : string,
    icon : id, // will be unused for now so its 0
    users : [
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
        guildOrder: [], //order list of guilds
        currentGuild: 1
    }
    , reducers: {
        guildAdd: (state, action) => { //accepts guild : int, info: object
            state.guildInfo[action.payload.Guild] = action.payload.Info;
            state.guildInfo[action.payload.Guild].MsgHistory = [];
            state.guildOrder.push(action.payload.Guild);
        }
        , guildRemove: (state, action) => { //accepts guild : int
            state.guildInfo[action.payload.Id] = undefined;
            state.guildOrder = state.guildOrder.filter(guild => guild !== action.payload.Id)
            state.currentGuild = state.currentGuild !== action.payload.Id ? state.currentGuild : 0;
        }
        , guildSet: (state, action) => { //accepts guildInfo : object<string : object>, guilds : array<int>
            state.guildInfo = action.payload.GuildInfo;
            state.guildOrder = action.payload.GuildOrder;
            //state.currentGuild = action.payload.currentGuild; //most likely will not be stored in database
        }
        ,
        msgAdd: (state, action) => { //accepts guild : int, msg : object
            state.guildInfo[action.payload.Guild].MsgHistory.push(action.payload.Msg);
        }
        , msgRemove: (state, action) => { //accepts guild : int, msg : object
            state.guildInfo[action.payload.guild].MsgHistory = state.guildInfo[action.payload.guild]
                .MsgHistory.filter(msg => msg.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetGuilds.fulfilled, (state, action) => {
                action.payload.map(guild => {
                    state.guildInfo[guild.Id] = {
                        Name: guild.Name,
                        Icon: guild.Icon,
                        Users: [],
                        MsgHistory: []
                    };
                    state.guildOrder.push(guild.Id);
                }
                );
                console.log(current(state.guildInfo));
            })
            .addCase(GetMsgs.fulfilled, (state, action) => {
                console.log("hiaaaaaaaaaaaaaaaaaaa")
                action.payload.map(msg => 
                state.guildInfo[state.currentGuild].MsgHistory.push(msg)
                )
            })
            .addCase(GetGuildUsers.fulfilled, (state, action) => {
    console.log("got guild users");
                action.payload.map(user => 
                state.guildInfo?.[state.currentGuild]?.Users.push(user)
                )
                console.log(current(state.guildInfo))

            });

    }

});

export const { guildAdd, guildRemove, guildSet, msgAdd, msgRemove } = guildSlice.actions;
export default guildSlice.reducer;