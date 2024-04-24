import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function ChatWebSocket() {
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [from, setFrom] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        disconnect();
    }, []);

    function connect() {
        const socket = new SockJS('/chat');
        const client = Stomp.over(socket);
        client.connect({}, frame => {
            setStompClient(client);
            setConnected(true);
            console.log('Connected: ' + frame);
            client.subscribe('/topic/messages', messageOutput => {
                showMessageOutput(JSON.parse(messageOutput.body));
            });
        });
    }

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log('Disconnected');
    }

    function sendMessage() {
        stompClient.send("/app/chat", {}, JSON.stringify({ 'from': from, 'text': text }));
    }

    function showMessageOutput(messageOutput) {
        setMessages(prevMessages => [...prevMessages, messageOutput]);
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Choose a nickname"
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                />
            </div>
            <br />
            <div>
                <button onClick={connect} disabled={connected}>Connect</button>
                <button onClick={disconnect} disabled={!connected}>Disconnect</button>
            </div>
            <br />
            <div>
                <input
                    type="text"
                    placeholder="Write a message..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
                <div>
                    {messages.map((message, index) => (
                        <p key={index}>{message.from}: {message.text} ({message.time})</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatWebSocket;
