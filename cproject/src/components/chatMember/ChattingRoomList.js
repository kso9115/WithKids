import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiCall } from '../../server/apiService';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function ChattingRoomList({ room }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const username = "Put your username here"; // You can replace this with your actual username logic


    // useEffect(() => {
    //     apiCall("/chat/rooms", "GET")
    //         .then((response) => {
    //             console.log("??");
    //             console.log(response.data);
    //             setRoomList(response.data);
    //         }).catch((err) =>{
    //             console.log(err);
    //         })
    // },[]);

    useEffect(() => {
        const roomId = room.roomId;
        const sockJs = new SockJS("/stomp/chat");
        const stomp = Stomp.over(sockJs);

        const handleMessage = (chat) => {
            const content = JSON.parse(chat.body);
            setMessages(prevMessages => [...prevMessages, content]);
        };

        const handleConnect = () => {
            console.log("STOMP Connection");
            stomp.subscribe(`/sub/chat/room/${roomId}`, handleMessage);
            stomp.send('/pub/chat/enter', {}, JSON.stringify({ roomId: roomId, writer: username }));
        };

        stomp.connect({}, handleConnect);

        return () => {
            stomp.disconnect();
        };
    }, [room, username]);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            const roomId = room.roomId;
            const stomp = Stomp.over(new SockJS("/stomp/chat"));
            stomp.connect({}, () => {
                stomp.send('/pub/chat/message', {}, JSON.stringify({ roomId: roomId, message: inputMessage, writer: username }));
            });
            setInputMessage('');
        }
    };

    return (
        <div className="container">
            <div className="col-6">
                <h1>{room.name}</h1>
            </div>
            <div>
                <div id="msgArea" className="col">
                    {messages.map((msg, index) => (
                        <div key={index} className={`col-6 alert ${msg.writer === username ? 'alert-secondary' : 'alert-warning'}`}>
                            <b>{msg.writer}: {msg.message}</b>
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} className="form-control" />
                        <div className="input-group-append">
                            <button onClick={sendMessage} className="btn btn-outline-secondary" type="button">전송</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6"></div>
        </div>
    );
}

export default ChattingRoomList;