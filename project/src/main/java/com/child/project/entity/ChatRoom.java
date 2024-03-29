package com.child.project.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.child.project.domain.ChatRoomRequestDTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
@Entity
public class ChatRoom extends BaseEntity {

    // 각 채팅방 구분
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 채팅방 이름
    private String roomName;

    // 해당 채팅방에서 기록된 모든 채팅
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    private List<ChatMessage> chatMessageList;

    @Builder
    public ChatRoom(String roomName) {
        this.roomName = roomName;
    }

    public Long update(ChatRoomRequestDTO requestDTO) {
        this.roomName = requestDTO.getRoomName();
        return this.id;
    }
}