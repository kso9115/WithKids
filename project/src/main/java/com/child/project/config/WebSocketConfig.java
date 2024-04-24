package com.child.project.config;

import javax.websocket.server.ServerEndpoint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.child.project.handler.ChatHandler;
import com.child.project.handler.EchoHandler;

@Configuration
@EnableWebSocketMessageBroker	// 메시지 전달을 위한 브로커 생성
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	// 1. 웹소캣 연결 : 클라이언트가 WebSocket에 연결할 엔드포인트 등록
	@Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
		// 웹소켓 핸드셰이크 커넥션을 생성
        registry
        	.addEndpoint("/example")
//        	.setAllowedOrigins("http://localhost:8080")
        	.withSockJS();  
    }

	// 메시지 브로커를 구성
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
    	// @Controller 객체의 @MessageMapping 메서드로 라우팅
        config.setApplicationDestinationPrefixes("/test");
        // 내장 브로커 : client에게 Subscriptions, Broadcasting 기능을 제공
        config.enableSimpleBroker("/topic", "/queue"); 
    }

	// WebSocket 핸들러 등록
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoHandler(), "/ws_user");
		registry.addHandler(chatHandler(), "/ws_admin");
	}

	// EchoHandler를 스프링 빈으로 정의
	@Bean
	public WebSocketHandler echoHandler() {
		return new EchoHandler();
	}

	// ChatHandler를 스프링 빈으로 정의
	@Bean
	public WebSocketHandler chatHandler() {
		return new ChatHandler();
	}
}
