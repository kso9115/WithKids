package com.child.project.domain;

import java.time.format.DateTimeFormatter;

import com.child.project.entity.ChatMessage;

import lombok.Getter;

@Getter
public class ChatMessageResponseDTO {
    private Long id;
    private String sender;
    private String message;
    private String createdDate;
    private String updatedDate;

    public ChatMessageResponseDTO(ChatMessage entity) {
        this.id = entity.getId();
        this.sender = entity.getSender();
        this.message = entity.getMessage();
        this.createdDate = entity.getRegDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getModDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}