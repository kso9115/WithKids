package com.child.project.controller;

import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class ChatController {
    @GetMapping("/chat")
    public String chatGET(){

        log.info("@ChatController, chat GET()");
        
        return "chat";
    }
    
}
