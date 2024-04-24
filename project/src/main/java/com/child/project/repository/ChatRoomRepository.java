package com.child.project.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;
import com.child.project.domain.ChatRoomDTO;

@Repository
public class ChatRoomRepository {
	
    private Map<String, ChatRoomDTO> chatRoomDTOMap;

    @PostConstruct	// 의존성 주입 후 초기화를 수행하는 메서드 : 서비스를 수행하기 전에
    private void init(){
        chatRoomDTOMap = new LinkedHashMap<>();
    }

    public List<ChatRoomDTO> findAllRooms(){
    	
        List<ChatRoomDTO> result = new ArrayList<>(chatRoomDTOMap.values());
        //채팅방 생성 순서 최근 순으로 반환
        // Collections.reverse(result);

        return result;
    }

    public ChatRoomDTO findRoomById(String id){
        return chatRoomDTOMap.get(id);
    }

    public ChatRoomDTO createChatRoomDTO(String name){
        ChatRoomDTO room = ChatRoomDTO.create(name);
        chatRoomDTOMap.put(room.getRoomId(), room);

        return room;
    }

}
