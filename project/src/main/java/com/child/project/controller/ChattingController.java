package com.child.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.child.project.service.ChattingInterface;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/chatting")
public class ChattingController {
    
//	@GetMapping("/chat")
//    public String chatGET(){
//        log.info("@ChatController, chat GET()");
//        return "chat";
//    }
//	
//	// 로그 생성 및 기록
//	private Logger logger = LoggerFactory.getLogger(ChattingController.class);
//	
//	@Autowired
//	private ChattingInterface chattingInterface;
//	
//	// 매핑 후 모델 객체에 저장하여 리스트 출력
//	@RequestMapping(value = "")
//	public String manageChattingView(Model model) {
//		model.addAttribute("chattingList", chattingInterface.getChattingList());
//		return "chatting/chattingList";
//	}
	
}
