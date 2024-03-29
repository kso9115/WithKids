package com.child.project.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class ChatMessage extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 각 메세지 구분
    private Long id;
    // 메세지 발신자
    private String sender;
    // 메세지 내용
    private String message;

    // 해당 메세지와 연결된 채팅방
    @ManyToOne
    private ChatRoom chatRoom;

    @Builder
    public ChatMessage(String sender, String message, ChatRoom chatRoom) {
        this.sender = sender;
        this.message = message;
        this.chatRoom = chatRoom;
    }
}