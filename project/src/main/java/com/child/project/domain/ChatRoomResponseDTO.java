package com.child.project.domain;

import java.time.format.DateTimeFormatter;

import com.child.project.entity.ChatRoom;

import lombok.Getter;

@Getter
public class ChatRoomResponseDTO {
    // 채팅방 고유값
    private Long id;
    // 채팅방 이름
    private String roomName;
    // 채팅방 생성일
    private String createdDate;
    // 채팅방 수정일
    private String updatedDate;

    public ChatRoomResponseDTO(ChatRoom entity) {
        this.id = entity.getId();
        this.roomName = entity.getRoomName();
        this.createdDate = entity.getRegDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getModDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}