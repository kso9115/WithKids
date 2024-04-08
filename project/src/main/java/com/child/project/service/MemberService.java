package com.child.project.service;

import java.util.List;

import com.child.project.entity.Attandance;
import com.child.project.entity.Education;
import com.child.project.entity.Member;

public interface MemberService {

    // selectList
    List<Member> selectList();

    // selectOne : 안씀
    Member selectOne(String memSerial);

    // select Detail 디테일..엔티티..필요해..
    // List<Member> selectDetail(String memSerial);

    // Delete : 별도로 리턴할게 없으므로 void
    void deleteMemByMemserial(String memSerail);

    // Insert & Update
    Member save(Member memEntity);

    // SearchBox 검색용 : member타입의 list 리턴
    List<Member> searchList(Member entity);

    // pw 초기화
    void resetPw(String memLoginPW, String memSerial);
    

    // ===================================================
    
    // Edu Entity 접근 : 전체 리스트를 가져갈게아니라 하나의 파라미터만 전달해서 받기
    List<Education> selectEduList();
    
    // Edu Entity 접근 
    Education selectEduData(String memSerial);

    // Edu Entity 접근
    Education save(Education eduEntity);

    // Delete : 별도로 리턴할게 없으므로 void
    void deleteEduByMemserial(String memSerail);

    // 중복 삭제한 serial 번호 출력
    // 출석관리 : 이용 상태인 리스트만 가져오기
    List<Member> selectAdmissionList();


    


}
