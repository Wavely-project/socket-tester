import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

socket.on('connect', () => {
  console.log('ws connected');
});

socket.on('connect_error', (err) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App socket={socket}/>
  </React.StrictMode>
);
