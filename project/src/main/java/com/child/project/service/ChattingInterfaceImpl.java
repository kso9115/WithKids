//package com.child.project.service;
//
//import java.io.BufferedReader;
//import java.io.File;
//import java.io.FileReader;
//import java.util.ArrayList;
//import java.util.List;
//
//import net.sf.json.JSONObject;
//
//import org.apache.commons.lang.StringUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.stereotype.Service;
//
//import com.child.project.entity.ChattingMessage;
//import com.child.project.entity.ChattingTableVO;
//import com.child.project.repository.ChattingTableDAO;
//
//
//@Service
//@PropertySource("classpath:config/file-${spring.profiles.active:local}.properties")
//public class ChattingInterfaceImpl implements ChattingInterface {
//	
//	private static String SPLITE_STRING = "$^#$@";
//
//	@Value("${chatting.enter}")
//	private String ENTER;
//
//	@Value("${chatting.path}")
//	private String CHATTING_PATH;
//
//	@Autowired
//	private ChattingTableDAO chattingTableDAO;
//
//	@Override
//	public List<ChattingTableVO> getChattingList() {
//		return chattingTableDAO.selectChattingList(null, null, null);
//	}
//
//	@Override
//	public void upsertChattingTable(ChattingTableVO chattingTable) throws Exception {
//		chattingTableDAO.upsertChattingTable(chattingTable);
//	}
//	
//	@Override
//	public List<ChattingTableVO> getChattingList(Long memberId) throws Exception {
//		return chattingTableDAO.selectChattingList(memberId, null, null);
//	}
//
//	@Override
//	public ChattingTableVO getChattingOne(String roomId) throws Exception {
//		return chattingTableDAO.selectChattingOne(roomId);
//	}
//
//	@Override
//	public List<ChattingMessage> readMessage(String roomId) throws Exception {
//		File targetDir = new File(CHATTING_PATH);
//		if (!targetDir.exists()) { // 디렉토리 없으면 생성.
//			targetDir.mkdirs();
//		}
//		String chattingFileName = CHATTING_PATH + roomId;
//		File chattingFile = new File(chattingFileName);
//		FileReader fileReader = new FileReader(chattingFile);
//		BufferedReader bufReader = new BufferedReader(fileReader);
//		StringBuilder strBuilder = new StringBuilder();
//
//		String line = "";
//		while ((line = bufReader.readLine()) != null) {
//			strBuilder.append(line);
//		}
//		bufReader.close();
//		String fullString = strBuilder.toString();
//		String[] msgList = StringUtils.split(fullString, SPLITE_STRING);
//		List<ChattingMessage> chattingMessageList = new ArrayList<ChattingMessage>();
//
//		for (String msg : msgList) {
//			JSONObject jsonObject = new JSONObject(msg);
//			ChattingMessage chattingMessage = new ChattingMessage(jsonObject);
//			chattingMessageList.add(chattingMessage);
//		}
//		System.out.println(fullString);
//
//		return chattingMessageList;
//	}
//
//	
//
//}
