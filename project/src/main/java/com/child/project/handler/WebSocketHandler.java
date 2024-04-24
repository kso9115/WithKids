package com.child.project.handler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.extern.log4j.Log4j2;

// TextWebSocketHandler 상속 후 메서드 오버라이딩

// handleTextMessage : 전달받은 텍스트 기반의 메시지 처리 / 웹 소캣에서 처리 후 다시 메시지를 전달해줌


@Log4j2
@Component
public class WebSocketHandler extends TextWebSocketHandler {

	// 접속 시 이름을 보관하기위한 콜렉션 객체
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<String, WebSocketSession>();

	// 1. 소캣 연결 성공 후 세션에 서버 저장
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {

		String sessionId = session.getId();
		sessions.put(sessionId, session);
	}

	// 2. 소캣 연결 후 메시지 전달
	// 메시지 발송 시 동작
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		
		log.info("들어는오냐?");
		// getPayload : 수신자에게 받은 메세지에 담긴 텍스트값을 얻을 수 있음
		String msg = message.getPayload();
		log.info(message);
		

		// map에 저장된 데이터 전체 forEach
		for (String key : sessions.keySet()) {	// 맵 에 담아놓은 sessionId를 키에 저장
			WebSocketSession websocketSession = sessions.get(key);
			try {
				websocketSession.sendMessage(new TextMessage(msg));
				log.info(msg);
			} catch (Exception e) {
				log.info(e.toString());
			}
		}

	}

	// 3. 소캣 연결 종료
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session.getId());
		super.afterConnectionClosed(session, status);
	}

}
