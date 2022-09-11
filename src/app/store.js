import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
//import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { default as authReducer } from './reducers/auth';
import { default as userInfoReducer } from './reducers/userInfo';
import { default as guildReducer } from './reducers/guilds';
import { default as clientReducer } from './reducers/client';
import {websocketApi} from '../api/websocket';
//import { wsEpic } from '../api/websocket';

//const epicMiddleware = createEpicMiddleware();

const middlewares = [thunk, /*epicMiddleware,*/ websocketApi.middleware];
/*
const rootEpic = combineEpics(
    wsEpic
);
*/

const rootReducer = combineReducers({
    guilds: guildReducer,
    auth: authReducer,
    userInfo: userInfoReducer,
    client : clientReducer,
    [websocketApi.reducerPath]: websocketApi.reducer,
    //    wsChat: wsChatReducer
});

const peristConfig = {
    key: 'root',
    whitelist: [ //only auth and client settings needs to save
        "auth",
        "client"
    ],
    storage, //localstorage PROBLEM no idea how to make it expire
};

const persistedReducer = persistReducer(peristConfig, rootReducer); //load config for localstorage saving

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(...middlewares),
    devTools: true
});

//epicMiddleware.run(rootEpic);

const persistor = persistStore(store)

export { store, persistor };