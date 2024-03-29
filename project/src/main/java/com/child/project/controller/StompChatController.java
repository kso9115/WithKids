package com.child.project.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.child.project.domain.ChatMessageDTO;

import lombok.RequiredArgsConstructor;

// 기존의 핸들러 ChatHandler의 역할을 대신 해주므로 핸들러는 없어도 됨
//  pub/sub(발행/구독)을 기반으로 @MessageMapping 을 통해, 메세지를 더 효율적으로 처리

@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/pub/chat/enter"
    
    // MessageMapping : WebSocket으로 들어오는 메세지 발행을 처리
    @MessageMapping(value = "/chat/enter")
    public void enter(ChatMessageDTO message){
        message.setMessage(message.getWriter() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDTO message){
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}
