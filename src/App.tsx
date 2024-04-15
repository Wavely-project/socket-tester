import { useEffect, useState } from 'react'
import './App.css'

function App(props: any) {
  const [event, setEvent] = useState<string>('');
  const [request, setRequest] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      props.socket.io.opts.extraHeaders = {
        authorization: `Bearer ${token}`,
      };
    }
  }, []);

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
          placeholder='Data as json or anything'
          onChange={(e) => setRequest(e.target.value)}
          style={{ fontSize: '10px', padding: '10px' }}
        />

        <input
          type="text"
          value={authToken}
          placeholder='Auth Token'
          onChange={(e) => setAuthToken(e.target.value)}
          style={{ fontSize: '8px', padding: '10px' }}
        />

        <button onClick={() => {
          localStorage.setItem('token', authToken);
          socket.io.opts.extraHeaders = {
            authorization: `Bearer ${authToken}`,
          };
        }}>Set Auth Token</button>
        <button onClick={sendEvent}>Send</button>
      </header>
    </>
  )
}

export default App
