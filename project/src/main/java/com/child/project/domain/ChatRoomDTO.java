package com.child.project.domain;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.web.socket.WebSocketSession;

import lombok.Data;

@Data
public class ChatRoomDTO {
	
	// 채팅
	private String roomId;
	private String memSerial;
	private String memName;
	private Set<WebSocketSession> session = new HashSet<>();
	// 웹 소캣의 연결이 완료된 세션
	
    public static ChatRoomDTO create(String memName){
        ChatRoomDTO room = new ChatRoomDTO();

        // UUID : 고유 식별자로 중복이 되지않는 값으로 구성하기 위함
        room.roomId = UUID.randomUUID().toString();
        room.memName = memName;
        return room;
    }
	

}
