import { webSocket } from 'rxjs/webSocket';
import { map, mergeMap } from 'rxjs';
import { ofType } from 'redux-observable';

const WEBSOCKET_URL = 'ws://localhost:8090/api/ws';

const
    PING = 0,
    MSGADD = 1,
    MSGREMOVE = 2,
    GUILDADD = 3,
    GUILDREMOVE = 4;

const WS_START = "WS_START";
const WS_PING = "WS_PING";
const WS_STOP = "WS_STOP";

const startSocket = (token) => ({
    type: WS_START,
    payload: {
        token
    }
});

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

const guildAdd = guildData => ({
    type: 'guilds/guildAdd',
    payload: guildData
});

const guildRemove = id => ({
    type: 'guilds/guildRemove',
    payload: {
        id
    },
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
                next: action => {
                    console.log("Got pinged a packet");
                    /*
                    console.log(action);
                    wsSubject$.next({
                        dataType: 0,
                        data: {
                            Data: "ping"
                        }
                    });
                    */
                },
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
                        console.log(payload);
                        switch (dataType) {
                            case PING: //pings back to server to let it know its alive
                                console.log("pinging");
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
                            case GUILDADD:
                                return guildAdd(data);
                            case GUILDREMOVE:
                                return guildRemove(data);
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