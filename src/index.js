import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import SignLogin from './components/signlogin.js';
import Chat from './components/chat.js';
import Games from './components/games.js'

import { store, persistor } from './app/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( //note to self React StrictMode is causing rendering twice allowing useeffect to activiate twice
//Remove React StrictMode when testing API/CHAT
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignLogin login={true} />} />
            <Route path="login" element={<SignLogin login={true} />} />
            <Route path="register" element={<SignLogin login={false} />} />
            <Route path="chat" element={<Chat />} />
            <Route path="games" element={<Games />}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
