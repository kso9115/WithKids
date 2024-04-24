package com.child.project.repository;

import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.child.project.entity.ChattingTableVO;

@Repository
public class ChattingTableDAO {
	
	/**
	 * 업설트
	 * @param chattingTableVO
	 */
	public void upsertChattingTable(ChattingTableVO chattingTableVO) {
	}
	/**
	 * 채팅방 정보가져오기
	 * 
	 * @param memberId
	 * @param gender
	 * @return
	 */
	public List<ChattingTableVO> selectChattingList(@Param("memberId") Long memberId, @Param("managerId") Long managerId, @Param("useYn") Boolean useYn) {
		return null;
	}
	
	/**
	 * 채팅방 정보 불러오기
	 * @param memberId
	 * @return
	 */
	public ChattingTableVO selectChattingOne(@Param("roomId") String roomId) {
		return null;
	}
	
	/**
	 * 채팅 테이블 업데이트
	 * @param chattingTableVO
	 */
	public void updateChattingTable(ChattingTableVO chattingTableVO) {
	}

}
