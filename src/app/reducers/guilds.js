import { createSlice } from "@reduxjs/toolkit";
import { GetBannedUsers, GetGuilds, GetGuildSettings, GetGuildUsers, GetInvite, DeleteInvite, BanUser, KickUser, UnbanUser } from "../../api/guildApi";
import { GetMsgs, SendMsgs } from "../../api/msgApi";

/*
format for guilds (guildInfo)
{
    Name : string,
    Icon : id, // will be unused for now so its 0
    Invite : "",
    Loaded : bool,
    MsgLimitReached : bool,
    InviteLoading : bool,
    BanKickLoading : bool,
    EditMessage : int,
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
            Id : int,
            Author : {
                Id : int,
                Username : string,
                Icon : int, //unused so its 0 old: profileId

            },
            Content : string,
            Time : int,
            MsgSaved: bool,
            Edited : bool
        },
        { //pending message
            RequestId : string,
            Content : string,
            Time : int,
            Failed: bool
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
        isLoading: false, //keep track of whether or not we are loading from websocket
    }
    , reducers: {
        guildAdd: (state, action) => { //accepts guild : int
            state.guildInfo[action.payload.Id] = { //update the user list later i cant be fucked (backend and frontend)
                Name : action.payload.Name,
                Icon : action.payload.Icon,
                Owner : action.payload.Owner,
                InviteLoading : false,
                BanKickLoading : false,
                Loaded : false,
                MsgLimitReached : false,
                EditMessage : 0,
                Invites: [],
                Users : [],
                Banned : [],
                Settings : {},
                MsgHistory : []
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
            const {Guild, RequestId} = action.payload;
            console.log(action.payload);
            console.log(RequestId);
            if (Guild in state.guildInfo) {
                state.guildInfo[Guild].MsgHistory = state.guildInfo[Guild].MsgHistory.filter(msg => msg?.RequestId !== RequestId);
            }
            state.guildInfo[action.payload.Guild].MsgHistory.unshift({...action.payload, RequestId : undefined});
        },
        msgRemove: (state, action) => { //accepts guild : int, msg : object
            if (action.payload.Id !== 0) {
                state.guildInfo[action.payload.Guild].MsgHistory = state.guildInfo[action.payload.Guild]
                    .MsgHistory.filter(msg => msg.Id !== action.payload.Id);
            } else {
                state.GuildInfo[action.payload.Guild].MsgHistory = state.guildInfo[action.payload.Guild]
                    .MsgHistory.filter(msg => msg.Author !== action.payload.Author);
            }
        },
        msgEditSet : (state, action) => {
            state.guildInfo[state.currentGuild].EditMessage = action.payload.Id;
        },
        msgSet : (state, action) => {
            state.guildInfo[action.payload.Guild].MsgHistory = state.guildInfo[action.payload.Guild].MsgHistory.map(
                msg => msg?.Id === action.payload.Id ? {...msg, Content : action.payload.Content, Edited : true }: msg
            );
        },
        msgRemoveFailed : (state, action) => {
            state.guildInfo[state.currentGuild].MsgHistory = state.guildInfo[state.currentGuild].MsgHistory.filter(msg => msg?.RequestId !== action.payload.requestId);
        },
        inviteAdd: (state,action) => {
            state.guildInfo[action.payload.Guild].Invites.push(action.payload.Invite);
        },
        inviteRemove: (state,action) => {
            state.guildInfo[action.payload.Guild].Invites = state.guildInfo[action.payload.Guild].Invites.filter(invite => invite !== action.payload.Invite);
        },
        setLoading : (state,action) => {
            state.isLoading = action.payload;
        }
        /*
        msgEdit : (state, action) => { //accepts guild : int, msg : object
            state.guildInfo[action.payload.guild].MsgHistory.filter
        },*/
    },
    extraReducers: (builder) => {
        builder.addCase(GetGuilds.fulfilled, (state, action) => {
            console.log(action.payload)
                action.payload.forEach(guild => {
                    state.guildInfo[guild.Id] = {
                        Name: guild.Name,
                        Icon: guild.Icon,
                        Owner: guild.Owner,
                        InviteLoading : false,
                        BanKickLoading : false,
                        Loaded: false,
                        MsgLimitReached : false,
                        EditMessage : 0,
                        Invites: [],
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
                    state.guildInfo[state.currentGuild].MsgHistory.push(msg)
                );
                if (action.payload.length < 50) {
                    console.log("msg limit reached");
                    state.guildInfo[state.currentGuild].MsgLimitReached = true;
                }
            })
            .addCase(SendMsgs.pending, (state, action) => {
                console.log("pending", action);
                const {requestId} = action.meta;
                const {msg, guild} = action.meta.arg;
                state.guildInfo?.[guild].MsgHistory.unshift({
                    RequestId: requestId,
                    Content : msg,
                    Time : Date.now(),
                    Failed : false

                });
            })
            /*
            .addCase(SendMsgs.fulfilled, (state, action) => {
                console.log("fulfilled", action);
                const {requestId} = action.meta;
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].MsgHistory = state.guildInfo[guild].MsgHistory.filter(msg => msg?.RequestId !== requestId);
                }
            })
            */
            .addCase(SendMsgs.rejected, (state, action) => {
                console.log("rejected", action);
                const {requestId} = action.meta;
                const {guild} = action.meta.arg;
                const index = state.guildInfo[guild].MsgHistory.findIndex(msg => msg?.RequestId === requestId);
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].MsgHistory[index].Failed = true;
                }
            })
            .addCase(DeleteInvite.pending, (state, action) => { 
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].InviteLoading = true;
                }
            })
            .addCase(DeleteInvite.fulfilled, (state, action) => {
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].InviteLoading = false;
                }
            })
            .addCase(BanUser.pending, (state, action) => {
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].BanKickLoading = true;
                }
            })
            .addCase(BanUser.fulfilled, (state, action) => {
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].BanKickLoading = false;
                }
            })
            .addCase(KickUser.pending, (state, action) => {
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].BanKickLoading = true;
                }
            })
            .addCase(KickUser.fulfilled, (state, action) => {
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].BanKickLoading = false;
                }
            })
            .addCase(UnbanUser.pending, (state, action) => {
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].BanKickLoading = true;
                }
            })
            .addCase(UnbanUser.fulfilled, (state, action) => {
                const {guild} = action.meta.arg;
                if (guild in state.guildInfo) {
                    state.guildInfo[guild].BanKickLoading = false;
                }
            })
            .addCase(GetGuildUsers.fulfilled, (state, action) => {
                state.guildInfo[state.currentGuild].Users = action.payload; //fixed double user list
                state.guildInfo[state.currentGuild].Loaded = true;
            })
            .addCase(GetBannedUsers.fulfilled, (state, action) => {
                console.log("banned", action.payload)
                action.payload.forEach(user => {
                    state.guildInfo?.[state.currentGuild]?.Banned.unshift(user);
                })
            })
            .addCase(GetInvite.fulfilled, (state, action) => {
                state.guildInfo[state.currentGuild].Invites = action.payload;
            })
            .addCase(GetGuildSettings.fulfilled, (state,action) => {
                state.guildInfo[state.currentGuild].Settings = action.payload;
            });

    }

});
//use ellipsis later
export const { guildAdd, guildRemove, guildSet, guildChange, guildReset, guildSettingsChange, guildCurrentSet,
    guildSetInvite, guildRemoveInvite, guildUpdateUserList, msgAdd, msgRemove, msgEditSet, msgSet, msgRemoveFailed, guildRemoveUserList,
    guildRemoveBannedList, guildUpdateBannedList, inviteAdd, inviteRemove, setLoading } = guildSlice.actions;
export default guildSlice.reducer;