import { createSlice, current, isAsyncThunkAction } from "@reduxjs/toolkit";
import { GetBannedUsers, GetGuilds, GetGuildUsers, GetInvite } from "../../api/guildApi";
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
                Banned : [],
                Loaded : false,
                Name : action.payload.Name,
                Icon : action.payload.Icon,
                Owner : action.payload.Owner
            };
            state.guildOrder.push(action.payload.Id);
        },
        guildRemove: (state, action) => { //accepts guild : int
            console.log("removing guild user left");
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
            state.guildInfo[action.payload.guild].name = action.payload.Name;
            //will impliment later
            //state.guildInfo[action.payload.guild].Icon = action.payload.Icon;
        },
        guildSetInvite: (state, action) => { //accepts invite : string
            state.guildInfo[state.currentGuild].invite = action.payload.Invite;
        },
        guildRemoveInvite: (state, action) => { //accepts invite : string
            state.guildInfo[state.currentGuild].invite = "";
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
            console.log("got pinged add",action.payload)
            state.guildInfo[action.payload.Guild].Banned.push(action.payload.User);
        },
        guildRemoveBannedList: (state,action) => {
            console.log("got pinged remove",action.payload)
            state.guildInfo[action.payload.Guild].Banned = state.guildInfo[action.payload.Guild].Banned.filter(user => user.Id !== action.payload.Id);
        },
        msgAdd: (state, action) => { //accepts guild : int, msg : object
            console.log("adding msg");
            state.guildInfo[action.payload.Guild].MsgHistory.push(action.payload);
            console.log("current is ", current(state.guildInfo[action.payload.Guild].MsgHistory));
        },
        msgRemove: (state, action) => { //accepts guild : int, msg : object
            state.guildInfo[action.payload.guild].MsgHistory = state.guildInfo[action.payload.guild]
                .MsgHistory.filter(msg => msg.id !== action.payload.id);
        },
        inviteAdd: (state,action) => {
            state.guildInfo[action.payload.Guild].Invites.push(action.payload.Invite);
        },
        inviteRemove: (state,action) => {
            console.log(action.payload);
            console.log("removing invites");
            console.log(state.guildInfo[action.payload.Guild].Invites);
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
                        Users: [],
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
            /*
            .addMatcher((action) => action.type.match(/guilds\/invite\/[a-z]*\/fulfilled/), (state, action) => {
                state.guildInfo[state.currentGuild].Invites = action.payload;
            })*/
            ;

    }

});
//use ellipsis later
export const { guildAdd, guildRemove, guildSet, guildChange, guildCurrentSet, guildSetInvite, guildRemoveInvite, guildUpdateUserList, msgAdd, msgRemove, guildRemoveUserList, guildRemoveBannedList, guildUpdateBannedList, inviteAdd, inviteRemove } = guildSlice.actions;
export default guildSlice.reducer;