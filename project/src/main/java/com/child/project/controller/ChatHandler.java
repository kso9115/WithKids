package com.child.project.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession; // 소켓 하나 당 세션 설정을 위해
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.extern.log4j.Log4j2;


//*** 계층도 
//WebSocketHandler (Interface) 
//	-> AbstractWebSocketHandler (A) -> TextWebSocketHandler (C) : 텍스트 데이터를 주고 받을때 사용 
//                                  -> BinaryWebSocketHandler (C) 

@Component
@Log4j2
// TextWebSocketHandler 핸들러 상속받은 후 라이브러리 메소드 사용
public class ChatHandler extends TextWebSocketHandler {

    private static List<WebSocketSession> list = new ArrayList<>();


    // 메시지 처리
    @Override
    protected void handleTextMessage(@Nullable WebSocketSession session, @Nullable TextMessage message)
            throws Exception {

        // payload : 전송되는 데이터
        String payload = message.getPayload();
        log.info("payload : " + payload);

        for (WebSocketSession sess : list) {
            sess.sendMessage(message);
        }
    }

    // Client 접속 시 호출
    @Override
    public void afterConnectionEstablished(@Nullable WebSocketSession session)
    // afterConnectionEstablished() : 웹소켓 클라이언트와 연결 되면 호출
    // 매개변수 WebSocketSession : 클라이언트와의 세션을 관리하는 객체로서 클라이언트의 정보를 제공
            throws Exception {

        list.add(session);

        log.info(session + " 클라이언트 접속");
    }

    // 웹소켓 클라이언트와 연결 종료될때 호출
    @Override
    public void afterConnectionClosed(@Nullable WebSocketSession session, @Nullable CloseStatus status)
            throws Exception {

        log.info(session + " 클라이언트 접속 해제");
        list.remove(session);
    }

}
