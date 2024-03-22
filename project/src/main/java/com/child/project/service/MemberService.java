package com.child.project.service;
import java.util.List;
import com.child.project.entity.Member;

public interface MemberService {
    
    // selectList
	List<Member> selectList();

    // selectOne
    Member selectOne(String memSerial);

    // select Detail 디테일..엔티티..필요해..
    // List<Member> selectDetail(String memSerial);

    // delete : 별도로 리턴할게 없으므로 void
    void deleteByMemserial(String memSerail);


    
    
}
