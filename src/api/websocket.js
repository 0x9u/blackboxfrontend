import { webSocket } from 'rxjs/webSocket';
import { map, mergeMap } from 'rxjs';
import { ofType } from 'redux-observable';
import { msgAdd, msgRemove, guildAdd, guildRemove, guildChange, guildSettingsChange,
     guildUpdateUserList, guildRemoveUserList, guildRemoveBannedList, guildUpdateBannedList,
      inviteAdd, inviteRemove } from '../app/reducers/guilds';
import { userChange } from '../app/reducers/userInfo';

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

const WS_START = "WS_START";
const WS_PING = "WS_PING";
const WS_STOP = "WS_STOP";

const startSocket = (token) => ({
    type: WS_START,
    payload: {
        token
    }
});

/*
const msgAdd = msgData => ({
    type: 'guilds/msgAdd',
    payload: msgData
});

const msgRemove = id => ({
    type: 'guilds/msgRemove',
    payload: {
        id
    }
});

*/
/*
const guildChange = guildData => ({
    type: 'guilds/guildChange',
    payload: guildData
})
*/

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
            wsSubject$.subscribe({/*
                next: action => {
                    console.log(action);
                    wsSubject$.next({
                        dataType: 0,
                        data: {
                            Data: "ping"
                        }
                    });
                },*/
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

export { startSocket, wsEpic };