package com.child.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


// WebSocketConfig 역할 : 웹 소캣 자동 활성화, 웹 소캣 핸들러 등록

@Configuration // bean 생성
@EnableWebSocket // 자동 웹 소캣 활성화
public class WebSocketConfig2 implements WebSocketConfigurer {

	// 웹 소캣 연결
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		// 웹소캣 엔드포인트 지정(프론트 연결)
		registry
			.addHandler(adminSocketHandler(), "/chat")
			.setAllowedOrigins("*");	// CORS
	}
	
	// 핸들러 빈 생성해줘야함 : WebSocketHandler 클래스 생성
	public WebSocketHandler adminSocketHandler() { 
		return new com.child.project.handler.WebSocketHandler();
	}
}
