import { useState } from 'react'
import {io } from 'socket.io-client'
import './App.css'

function App() {
  const [event, setEvent] = useState<string>('');
  const [request, setRequest] = useState<string>('');
  const socket = io('http://localhost:8080');

  socket.on('connect', () => {
    console.log('ws connected');
  });

socket.on('connect_error', (err) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
});

  const sendEvent = () => {
    socket.emit(event, request);
  };

  return (
    <>
      <header className="App-header">
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          style={{ fontSize: '20px', padding: '10px' }}
        />

        <input
          type="text"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          style={{ fontSize: '20px', padding: '10px' }}
        />

        <button onClick={sendEvent}>Send</button>
      </header>
    </>
  )
}

export default App
