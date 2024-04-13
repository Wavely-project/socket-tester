import { useState } from 'react'
import './App.css'

function App(props: any) {
  const [event, setEvent] = useState<string>('');
  const [request, setRequest] = useState<string>('');

  const socket = props.socket;
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
          placeholder='Event name'
          style={{ fontSize: '20px', padding: '10px' }}
        />

        <input
          type="text"
          value={request}
          placeholder='Data'
          onChange={(e) => setRequest(e.target.value)}
          style={{ fontSize: '20px', padding: '10px' }}
        />

        <button onClick={sendEvent}>Send</button>
      </header>
    </>
  )
}

export default App
