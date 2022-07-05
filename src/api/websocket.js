import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs';
import { ofType } from 'redux-observable';

WEBSOCKET_URL = 'http://localhost:8090/ws';

const
    PING = 0,
    MSGADD = 1,
    MSGREMOVE = 2,
    GUILDADD = 3,
    GUILDREMOVE = 4;

const WS_START = "WS_START";

const startSocket = (token) => ({
    type: WS_START,
    payload: {
        token
    }
});

const msgAdd = msgData => ({
    type: 'guilds/msg/add',
    payload: msgData
});

const msgRemove = id => ({
    type: 'guilds/msg/remove',
    payload: {
        id
    }
});

const guildAdd = guildData => ({
    type: 'guilds/guild/add',
    payload: guildData
});

const guildRemove = id => ({
    type: 'guilds/guild/remove',
    payload: {
        id
    },
});

const wsEpic = action$ => action$.pipe(
    ofType(WS_START),
    mergeMap(
        action => {
            webSocket(WEBSOCKET_URL //probs bad to store token in url params
                + "?"
                + URLSearchParams({
                    token: action.payload.token
                }))
                .pipe(
                    map(
                        (data) => {
                            const { dataType } = data;
                            switch (dataType) {
                                case PING:
                                    wsSubject$.next({
                                        dataType: 0,
                                    }); //pings back to server to let it know its alive
                                    return null;
                                case MSGADD:
                                    return msgAdd(payload);
                                case MSGREMOVE:
                                    return msgRemove(payload);
                                case GUILDADD:
                                    return guildAdd(payload);
                                case GUILDREMOVE:
                                    return guildRemove(payload);
                                default:
                                    console.log("Unidenified data type: " + dataType);
                                    return null;
                            }
                        }
                    )
                ).subscribe({
                    next: action => {
                        console.log(action);
                    },
                    error: err => {
                        console.log(err);
                    },
                    complete: () => { //shouldnt ever happen
                        console.log("complete");
                    }
                })
        }
    )
)

export { startSocket, wsEpic };