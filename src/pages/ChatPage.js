import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(":4000");

export const ChatPage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', (msg) => {
      setLastPong(msg);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
}







/* import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client"

//connects to socket
const socket = io(":4000")

export const ChatPage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
  }


  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
 */