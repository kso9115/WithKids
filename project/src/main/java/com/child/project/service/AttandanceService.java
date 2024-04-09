package com.child.project.service;

import java.util.List;

import com.child.project.domain.AttandanceDTO;
import com.child.project.entity.Attandance;

public interface AttandanceService {

    // 출석관리 전체 멤버를 뽑아주기 위함
    List<Attandance> selectList();

    // 출석관리 : 월별 selectList
    // List<Attandance> selectList(String month);

    // 월별 selectList : 레포지토리에 쿼리 작성
    // List<Attandance> selectList3();
    List<Attandance> selectList3(String yearMonth);
    // front에서 reduce 써주면 되는거라 일단꺼놓기..ㅠ.ㅠ
    // List<AttandanceDTO> selectList3(String yearMonth);

    // 출석관리 : 이용중인 컬럼 리스트만 가져오기
    List<Attandance> selectAdmissionList();

    // 출석 변경
    Attandance attSave(Attandance entity);

    // 출석 입력
    Attandance attInsert(Attandance entity);

    // 출석 일수 확인
    // Integer attcount (String memSerial);
}
