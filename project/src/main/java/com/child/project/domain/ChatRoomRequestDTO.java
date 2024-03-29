package com.child.project.domain;

import com.child.project.entity.ChatRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

// ChatRoom과 관련된 요청에 사용될 RequestDTO
 public class ChatRoomRequestDTO {

    // 채팅방 이름
    private String roomName;

    @Builder
    public ChatRoomRequestDTO(String roomName) {
        this.roomName = roomName;
    }

    public ChatRoom toEntity() {
        return ChatRoom.builder()
                .roomName(this.roomName)
                .build();
    }
}