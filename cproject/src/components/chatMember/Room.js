import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function ChatRoom({ room }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const username = useRef('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('/api/current-user'); // Assuming API endpoint for fetching current user
                const data = await response.json();
                username.current = data.username;
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };
        fetchUsername();
    }, []);

    useEffect(() => {
        const sockJs = new SockJS("/stomp/chat");
        const stomp = Stomp.over(sockJs);

        stomp.connect({}, () => {
            console.log("STOMP Connection");

            stomp.subscribe(`/sub/chat/room/${room.roomId}`, chat => {
                const content = JSON.parse(chat.body);
                setMessages(prevMessages => [...prevMessages, content]);
            });

            stomp.send('/pub/chat/enter', {}, JSON.stringify({ roomId: room.roomId, writer: username.current }));
        });

        return () => {
            stomp.disconnect();
        };
    }, [room]);

    const handleSendMessage = () => {
        if (message.trim() === '') return;
        const sockJs = new SockJS("/stomp/chat");
        const stomp = Stomp.over(sockJs);
        stomp.connect({}, () => {
            stomp.send('/pub/chat/message', {}, JSON.stringify({ roomId: room.roomId, message: message, writer: username.current }));
            setMessage('');
        });
    };

    return (
        <div className="container">
            <div className="col-6">
                <h1>{room.name}</h1>
            </div>
            <div>
                <div id="msgArea" className="col">
                    {messages.map((content, index) => (
                        <div key={index} className={`col-6 alert ${content.writer === username.current ? 'alert-secondary' : 'alert-warning'}`}>
                            <b>{content.writer} : {content.message}</b>
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            id="msg"
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                id="button-send"
                                onClick={handleSendMessage}
                            >
                                전송
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
