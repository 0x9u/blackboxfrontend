import './App.css';
import React from 'react';
import SignLogin from './components/signlogin.js';
import Chat from './components/chat.js';
import userApi from './api/userApi.js';
import {Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <userApi>
      <Routes>
      <Route path="/" element={<SignLogin login={true}/>}/>
      <Route path="login" element={<SignLogin login={true}/>}/>
      <Route path="register" element={<SignLogin login={false}/>}/>
      <Route path="chat" element={<Chat/>}/>
      </Routes>
      </userApi>
    </div>
  );
}

export default App;
