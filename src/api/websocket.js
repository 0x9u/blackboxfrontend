import { webSocket } from 'rxjs/webSocket';
import { map, mergeMap } from 'rxjs';
import { ofType } from 'redux-observable';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    msgAdd, msgRemove, guildAdd, guildRemove, guildChange, guildSettingsChange,
    guildUpdateUserList, guildRemoveUserList, guildRemoveBannedList, guildUpdateBannedList,
    inviteAdd, inviteRemove, setLoading, guildReset, msgSet
} from '../app/reducers/guilds';
import { userChange } from '../app/reducers/userInfo';
import {GetGuilds} from './guildApi';
import {GetUserInfo} from './userInfoApi';

const WEBSOCKET_URL = 'ws://localhost:8090/api/ws';

const
    PING = 0,
    MSGADD = 1,
    MSGREMOVE = 2, // also not used as of yet
    MSGEDIT = 3, //not used as of yet
    CHANGEGUILD = 4, // new server info
    JOINGUILD = 5,
    LEAVEGUILD = 6,
    UPDATEUSERLIST = 7,
    REMOVEUSERLIST = 8,//remove user from userlist
    UPDATEBANNEDLIST = 9,
    REMOVEBANNEDLIST = 10,
    INVITEADDED = 11,
    INVITEREMOVED = 12,
    CHANGECLIENTDATA = 13,
    CHANGESETTINGGUILD = 14;

/*
const WS_START = "WS_START";
const WS_PING = "WS_PING";
const WS_STOP = "WS_STOP";

const startSocket = (token) => ({
    type: WS_START,
    payload: {
        token
    }
});

const DONOTHING = () => ({ //temporary fix
    type: "DONOTHING",
    payload: {}
});

const wsEpic = action$ => action$.pipe( //not working needs to be fixed
    ofType(WS_START),
    mergeMap(
        action => {
            const wsSubject$ = webSocket(WEBSOCKET_URL //probs bad to store token in url params
                + "?"
                + new URLSearchParams({
                    token: action.payload.token
                }))
            wsSubject$.subscribe({
                error: err => {
                    console.log(err);
                    console.log(err.error);
                },
                complete: () => { //shouldnt ever happen
                    console.log("complete");
                }
            })
            return wsSubject$.pipe(
                map(
                    (payload) => {
                        const { dataType, data } = payload;
                        switch (dataType) {
                            case PING: //pings back to server to let it know its alive
                                wsSubject$.next({
                                    dataType: 0,
                                    data: {
                                        Data: "ping"
                                    }
                                });
                                return DONOTHING();
                            case MSGADD:
                                console.log("got a message!");
                                console.log(payload);
                                return msgAdd(data);
                            case MSGREMOVE:
                                return msgRemove(data);
                            //case MSGEDIT:
                            //    return msgEdit(data);
                            case CHANGEGUILD:
                                return guildChange(data);
                            case JOINGUILD:
                                console.log("join/created server");
                                return guildAdd(data);
                            case LEAVEGUILD:
                                return guildRemove(data);
                            case UPDATEUSERLIST:
                                console.log("Updating user list");
                                return guildUpdateUserList(data);
                            case REMOVEUSERLIST:
                                return guildRemoveUserList(data);
                            case UPDATEBANNEDLIST:
                                return guildUpdateBannedList(data);
                            case REMOVEBANNEDLIST:
                                return guildRemoveBannedList(data);
                            case INVITEADDED:
                                return inviteAdd(data);
                            case INVITEREMOVED:
                                return inviteRemove(data);
                            case CHANGECLIENTDATA:
                                return userChange(data);
                            case CHANGESETTINGGUILD:
                                return guildSettingsChange(data);
                            //return guildAction(data); //TODO REPLACE WITH SWITCH CASE
                            default:
                                console.log("Unidenified data type: " + dataType);
                                return DONOTHING();
                        }
                    }
                )
            );
        }
    )
)

*/ // not used anymore
export const websocketApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8090" }),
    endpoints: (build) => ({
        startWS: build.query({
            queryFn: () => ({ data: null }), //bypasses the need to ping the server
            onCacheEntryAdded: async (
                arg,
                //using dispatch and not updateCachedData because it only does one action
                { dispatch, cacheDataLoaded, cacheEntryRemoved }
            ) => {
                async function connectWS() { //recursive so if its disconnected we can reconnect is unsuccessful
                    dispatch(setLoading(true));
                    await dispatch(guildReset()); //bug when user logs outs this doesnt work
                    await dispatch(GetGuilds());
                    await dispatch(GetUserInfo());
                    const ws = new WebSocket(WEBSOCKET_URL + "?" + new URLSearchParams({ token: arg.token }));
                    try {
                        await cacheDataLoaded
                        console.log("loaded")
                        const listener = (event) => {
                            const payload = JSON.parse(event.data)
                            const { dataType, data } = payload;
                            console.log(payload);
                            switch (dataType) {
                                case PING: //pings back to server to let it know its alive
                                    ws.send(JSON.stringify({
                                        dataType: 0,
                                        data: {
                                            Data: "ping"
                                        }
                                    }));
                                    break;
                                case MSGADD:
                                    //console.log("got a message!");
                                    //console.log(payload);
                                    dispatch(msgAdd(data));
                                    break;
                                case MSGREMOVE:
                                    dispatch(msgRemove(data));
                                    break;
                                case MSGEDIT:
                                    dispatch(msgSet(data));
                                    break;
                                case CHANGEGUILD:
                                    dispatch(guildChange(data));
                                    break;
                                case JOINGUILD:
                                    console.log("join/created server");
                                    dispatch(guildAdd(data));
                                    break;

                                case LEAVEGUILD:
                                    dispatch(guildRemove(data));
                                    break;

                                case UPDATEUSERLIST:
                                    console.log("Updating user list");
                                    dispatch(guildUpdateUserList(data));
                                    break;

                                case REMOVEUSERLIST:
                                    dispatch(guildRemoveUserList(data));
                                    break;

                                case UPDATEBANNEDLIST:
                                    dispatch(guildUpdateBannedList(data));
                                    break;

                                case REMOVEBANNEDLIST:
                                    dispatch(guildRemoveBannedList(data));
                                    break;

                                case INVITEADDED:
                                    dispatch(inviteAdd(data));
                                    break;

                                case INVITEREMOVED:
                                    dispatch(inviteRemove(data));
                                    break;

                                case CHANGECLIENTDATA:
                                    dispatch(userChange(data));
                                    break;

                                case CHANGESETTINGGUILD:
                                    dispatch(guildSettingsChange(data));
                                    break;

                                //return guildAction(data); //TODO REPLACE WITH SWITCH CASE
                                default:
                                    console.log("Unidenified data type: " + dataType);
                            }
                        }
                        const onReady = () => dispatch(setLoading(false));
                        const onClose = (e) => {
                            if (e.code !== 1005) {
                                setTimeout( () => {
                                console.log("reconnecting websocket...");
                                connectWS();
                            }, 10000); //wait 10 seconds before trying to reconnect
                            }
                        }
                        ws.addEventListener('open', onReady);
                        ws.addEventListener('message', listener);
                        ws.addEventListener('close', onClose);
                    } catch (err) {
                        console.log(err);
                    }
                    await cacheEntryRemoved
                    console.log("removed");
                    ws.close()
                }
                await connectWS()
            }
        }),
    })
});

export const { useStartWSQuery } = websocketApi;

//export { startSocket, wsEpic };