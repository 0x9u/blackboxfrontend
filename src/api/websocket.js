import { webSocket } from 'rxjs/webSocket';
import { map, mergeMap } from 'rxjs';
import { ofType } from 'redux-observable';

const WEBSOCKET_URL = 'ws://localhost:8090/ws';

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
            const wsSubject$ = webSocket(WEBSOCKET_URL //probs bad to store token in url params
                + "?"
                + new URLSearchParams({
                    token: action.payload.token
                }))
                .pipe(
                    map(
                        (payload) => {
                            const { dataType,  data } = payload;
                            switch (dataType) {
                                case PING:
                                    wsSubject$.next({
                                        dataType: 0,
                                    }); //pings back to server to let it know its alive
                                    console.log("pinging");
                                    return null;
                                case MSGADD:
                                    return msgAdd(data);
                                case MSGREMOVE:
                                    return msgRemove(data);
                                case GUILDADD:
                                    return guildAdd(data);
                                case GUILDREMOVE:
                                    return guildRemove(data);
                                default:
                                    console.log("Unidenified data type: " + dataType);
                                    return null;
                            }
                        }
                    )
                );
                wsSubject$.subscribe({
                    next: action => {
                        console.log(action);
                    },
                    error: err => {
                        console.log(err.error);
                    },
                    complete: () => { //shouldnt ever happen
                        console.log("complete");
                    }
                })
                return wsSubject$;
        }
    )
)

export { startSocket, wsEpic };