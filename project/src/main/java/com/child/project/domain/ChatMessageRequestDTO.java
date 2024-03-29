package com.child.project.domain;

import com.child.project.entity.ChatMessage;
import com.child.project.entity.ChatRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


// 채팅 메세지(ChatMessage) 생성/수정 등의 요청으로 사용하기 위한 DTO 

@Getter
@NoArgsConstructor
public class ChatMessageRequestDTO {
    
    // 채팅 메세지 발신자
    private String sender;
    // 채팅 메세지 내용
    private String message;
    // 채팅 메세지가 연결된 채팅방
    private ChatRoom chatRoom;

    @Builder
    public ChatMessageRequestDTO(String sender, String message, ChatRoom chatRoom) {
        this.sender = sender;
        this.message = message;
        this.chatRoom = chatRoom;
    }

    public ChatMessage toEntity() {
        return ChatMessage.builder()
                .sender(this.sender)
                .message(this.message)
                .chatRoom(this.chatRoom)
                .build();
    }
}