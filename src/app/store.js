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
import { default as authReducer } from './reducers/auth.js';
import { default as userInfoReducer } from './reducers/userInfo.js';
import { default as wsChatReducer } from './reducers/wsChat.js';
import { default as guildReducer } from './reducers/guilds.js';

const middlewares = [thunk];
//const store = createStore(rootReducer, composeEnhancers);
const rootReducer = combineReducers({
    guilds: guildReducer,
    auth: authReducer,
    userInfo: userInfoReducer,
    wsChat: wsChatReducer
});

const peristConfig = {
    key: 'root',
    whitelist: [ //only auth needs to save
        "auth"
    ],
    storage, //localstorage PROBLEM no idea how to make it expire
};

const persistedReducer = persistReducer(peristConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(...middlewares),
    devTools: true
});

const persistor = persistStore(store)

export { store, persistor };