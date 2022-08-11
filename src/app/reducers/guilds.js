import { createSlice, current, isAsyncThunkAction } from "@reduxjs/toolkit";
import { GetBannedUsers, GetGuilds, GetGuildSettings, GetGuildUsers, GetInvite } from "../../api/guildApi";
import { GetMsgs } from "../../api/msgApi";

/*
format for guilds (guildInfo)
{
    Name : string,
    Icon : id, // will be unused for now so its 0
    Invite : "",
    Loaded : bool,
    Users : [
        {
            Id : int,
            Username : string,
            Icon : int, //unused so its 0 old: profileId
        }
    ],
    Banned : [ //basically banned users
        {
            Id : int,
            Username : string,
            Icon : int.
        }
    ],
    Settings : {
        SaveChat : bool,
        Name : string, //not used
        Icon : int, // not used
    },
    MsgHistory : [
        {
            UserId : int,
            Username : string,
            Icon : int, //unused so its 0 old: profileId
            Msg : string,
            Time : int,
        }
    ]
    
}
*/

const guildSlice = createSlice({
    name: "guilds",
    initialState: {
        guildInfo: {},
        guildOrder: [], //order list of guilds
        currentGuild: 0, //keep track of current guild in view
    }
    , reducers: {
        guildAdd: (state, action) => { //accepts guild : int
            state.guildInfo[action.payload.Id] = { //update the user list later i cant be fucked (backend and frontend)
                MsgHistory : [],
                Users : [],
                Invites: [],
                Banned : [],
                Settings : {}, 
                Loaded : false,
                MsgLimitReached : false,
                Name : action.payload.Name,
                Icon : action.payload.Icon,
                Owner : action.payload.Owner
            };
            state.guildOrder.push(action.payload.Id);
        },
        guildRemove: (state, action) => { //accepts guild : int
            state.guildInfo[action.payload.Guild] = undefined;
            state.guildOrder = state.guildOrder.filter(guild => guild !== action.payload.Guild)
            state.currentGuild = state.currentGuild !== action.payload.Guild ? state.currentGuild : 0;
        },
        guildSet: (state, action) => { //accepts guildInfo : object<string : object>, guilds : array<int>
            state.guildInfo = action.payload.GuildInfo;
            state.guildOrder = action.payload.GuildOrder;
            //state.currentGuild = action.payload.currentGuild; //most likely will not be stored in database
        },
        guildChange: (state, action) => {
            console.log(action.payload)
            state.guildInfo[action.payload.Guild].Name = action.payload.Name;
            state.guildInfo[action.payload.Guild].Icon = action.payload.Icon;
            //will impliment later
            //state.guildInfo[action.payload.guild].Icon = action.payload.Icon;
        },
        guildReset: (state, action) => {
            state.guildInfo = {};
            state.guildOrder = [];
            state.currentGuild = 0;
        },
        guildSettingsChange : (state, action) => {
            console.log(action.payload);
            state.guildInfo[action.payload.Guild].Settings = action.payload.Settings;
        },
        guildSetInvite: (state, action) => { //accepts invite : string
            state.guildInfo[state.currentGuild].Invites = action.payload.Invite;
        },
        guildRemoveInvite: (state, action) => { //accepts invite : string
            state.guildInfo[state.currentGuild].Invites = state.guildInfo[state.currentGuild].Invites.filter(action.payload.Invite);
        },
        guildCurrentSet: (state, action) => { //accepts guild : int
            state.currentGuild = action.payload.Guild;
        },
        guildUpdateUserList: (state, action) => { //accepts guild : int, userList : array<int>
            state.guildInfo[action.payload.Guild].Users.push(action.payload.User)
        },
        guildRemoveUserList: (state, action) => { //accepts guild : int
            state.guildInfo[action.payload.Guild].Users = state.guildInfo[action.payload.Guild].Users.filter(user => user.Id !== action.payload.Id)
        },
        guildUpdateBannedList: (state,action) => {
            state.guildInfo[action.payload.Guild].Banned.push(action.payload.User);
        },
        guildRemoveBannedList: (state,action) => {
            state.guildInfo[action.payload.Guild].Banned = state.guildInfo[action.payload.Guild].Banned.filter(user => user.Id !== action.payload.Id);
        },
        msgAdd: (state, action) => { //accepts guild : int, msg : object
            state.guildInfo[action.payload.Guild].MsgHistory.push(action.payload);
        },
        msgRemove: (state, action) => { //accepts guild : int, msg : object
            state.guildInfo[action.payload.guild].MsgHistory = state.guildInfo[action.payload.guild]
                .MsgHistory.filter(msg => msg.id !== action.payload.id);
        },
        inviteAdd: (state,action) => {
            state.guildInfo[action.payload.Guild].Invites.push(action.payload.Invite);
        },
        inviteRemove: (state,action) => {
            state.guildInfo[action.payload.Guild].Invites = state.guildInfo[action.payload.Guild].Invites.filter(invite => invite !== action.payload.Invite);
        }
        /*
        msgEdit : (state, action) => { //accepts guild : int, msg : object
            state.guildInfo[action.payload.guild].MsgHistory.filter
        },*/
    },
    extraReducers: (builder) => {
        builder.addCase(GetGuilds.fulfilled, (state, action) => {
            console.log(action.payload)
                action.payload.map(guild => {
                    state.guildInfo[guild.Id] = {
                        Name: guild.Name,
                        Icon: guild.Icon,
                        Owner: guild.Owner,
                        Invites: [],
                        Loaded: false,
                        MsgLimitReached : false,
                        Users: [],
                        Settings : {}, 
                        Banned : [],
                        MsgHistory: []
                    };
                    state.guildOrder.push(guild.Id);
                });
		state.currentGuild = state.guildOrder[0] ? state.guildOrder[0] : 0;
            })
            .addCase(GetMsgs.fulfilled, (state, action) => {// using unshift since we are also grabbing info from guilds not loaded in
               console.log(action.payload);
                action.payload.map(msg =>
                    state.guildInfo[state.currentGuild].MsgHistory.unshift(msg)
                );
                if (action.payload.length < 50) {
                    console.log(action.payload);
                    console.log(action.payload.length);
                    state.guildInfo[state.currentGuild].MsgLimitReached = true;
                }
            })
            .addCase(GetGuildUsers.fulfilled, (state, action) => {
                /*
                action.payload.map(user => {
                    state.guildInfo?.[state.currentGuild]?.Users.unshift(user);
                    state.guildInfo[state.currentGuild].Loaded = true;
                });
                */
                state.guildInfo[state.currentGuild].Users = action.payload; //fixed double user list
                state.guildInfo[state.currentGuild].Loaded = true;
            })
            .addCase(GetBannedUsers.fulfilled, (state, action) => {
                console.log(action.payload)
                action.payload.map(user => {
                    state.guildInfo?.[state.currentGuild]?.Banned.unshift(user);
                })
            })
            .addCase(GetInvite.fulfilled, (state, action) => {
                state.guildInfo[state.currentGuild].Invites = action.payload;
            })
            .addCase(GetGuildSettings.fulfilled, (state,action) => {
                state.guildInfo[state.currentGuild].Settings = action.payload;
            })
            /*
            .addMatcher((action) => action.type.match(/guilds\/invite\/[a-z]*\/fulfilled/), (state, action) => {
                state.guildInfo[state.currentGuild].Invites = action.payload;
            })*/
            ;

    }

});
//use ellipsis later
export const { guildAdd, guildRemove, guildSet, guildChange, guildReset, guildSettingsChange, guildCurrentSet, guildSetInvite, guildRemoveInvite, guildUpdateUserList, msgAdd, msgRemove, guildRemoveUserList, guildRemoveBannedList, guildUpdateBannedList, inviteAdd, inviteRemove } = guildSlice.actions;
export default guildSlice.reducer;