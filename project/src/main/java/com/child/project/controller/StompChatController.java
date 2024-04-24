package com.child.project.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.child.project.domain.ChatMessageDTO;

import lombok.RequiredArgsConstructor;

// 전달받은 메시지를 처리해주기 위한 컨트롤러 
// ChatHandler의 역할을 위한 컨트롤러

@Controller
@RequiredArgsConstructor
public class StompChatController {
	
	//특정 Broker로 메세지를 전달
	private final SimpMessagingTemplate template;

//	@MessageMapping("/chat")
//	@SendTo("/topic/messages")
//	public OutputMessage send(Message message) throws Exception {
//	    String time = new SimpleDateFormat("HH:mm").format(new Date());
//	    return new OutputMessage(message.getFrom(), message.getText(), time);
//	}
}
