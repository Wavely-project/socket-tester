import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { io } from 'socket.io-client';
import { isUnauthorizedError } from '@thream/socketio-jwt/build/UnauthorizedError';

const socket = io('http://localhost:8080', {
  auth: {
    token: `Bearer ${localStorage.getItem('token')}`,
  },
});
console.log(localStorage.getItem('token'));

socket.on('connect', () => {
  console.log('ws connected');
});

socket.on("connect_error", (error) => {
  console.log('err ', error.message); // not authorized
  if (isUnauthorizedError(error)) {
    console.log("User token has expired")
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App socket={socket} />
    <h1>Open console to see logs</h1>
  </React.StrictMode>
);
