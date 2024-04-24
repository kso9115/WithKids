import React, { useState, useEffect } from 'react';
import './ChattingManagement.css';
// myStyle.css 대신에 사용할 스타일 파일

const ChattingManagement = () => {
    // 대상자 번호, 
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [socket, setSocket] = useState(null);

    // WebSocket 연결 : 페이지 마운트 시
    // 페이지 언마운트 시 연결 종료
    useEffect(() => {
        connectWebSocket();
        return () => disconnectWebSocket();
    },[]);

    // 연결이 됐을 때 소켓에 웹 소캣을 지정하여 통신
    const connectWebSocket = () => {
        const newSocket = new WebSocket("ws://localhost:8080/chat");
        console.log('소캣생성은되나?:', newSocket);  // 연결까지는 완료
        newSocket.onOpen = onOpen(); // 연결 시 호출
        newSocket.onMessage = onMessage();
        
        setSocket(newSocket); // 연결된 소켓을 상태에 저장
    };

    // 버튼 클릭 시 소켓 연결
    const handleClick = () => {
        connectWebSocket();
    };

    // 소켓 연결 후 기본 메시지 출력
    const onOpen = () => {
        alert('연결완료되었습니다.');
        appendMessage(' 연결 완료 이제는 더이상 물러날 곳이 없다 ');
    };

    // 연결 종료
    const disconnectWebSocket = () => {
        console.log("아마도 리턴을 해주니까 바로 들어오지않나 싶은데..");
        if (socket) {
            socket.close();
        }
    };

    // 메시지 전달
    const send = () => {
        socket.send(`msg:${nickname}:${message}`);
        console.log(nickname);
        console.log(message);
        setMessage(''); // 전송 후 메시지 비워주기
    };

    // const onMessage = (e) => {
    //     let data = e.data;
    //     if (data.substr(0, 4) === 'msg:') {
    //         appendMessage(data.substr(4));
    //     }
    // };

    const onMessage = (e) => {
        if (e && e.data) {
            let data = e.data;
            console.log(data);
            if (data.substr(0, 4) === 'msg:') {
                appendMessage(data.substr(4));
            }
        }
    };
    
    

    const appendMessage = (message) => {
        setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
        console.log(chatHistory);
    };

    const handleInputChange = (event) => {
        if (event.target.id === 'nickname') {
            setNickname(event.target.value);
        } else if (event.target.id === 'message') {
            setMessage(event.target.value);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            send();
        }
    };

    return (
        <div>
            <h2>** WebSocket Chatting Room **</h2>
            <div>
                <label htmlFor="nickname"> ID : </label>
                <input
                    type="text"
                    id="nickname"
                    value={nickname}
                    disabled={nickname}
                    onChange={handleInputChange}
                />
                <button onClick={handleClick}>입장하기</button>
                <button onClick={disconnectWebSocket}>나가기</button>
            </div>
            <h3>~~ Chatting Area ~~~</h3>
            <div id="chatArea" style={{ width: '300px', height: '200px', overflowY: 'auto', border: '1px solid green' }}>
                {chatHistory.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <br />
            <input
                type="text"
                id="message"
                size="33"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={send}>전송</button>
            <br /><br /><hr />
            <a href="home">[Home]</a>
        </div>
    );
};

export default ChattingManagement;
