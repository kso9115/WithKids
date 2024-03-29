package com.child.project.service;

import java.util.List;

import com.child.project.entity.Attandance;

public interface AttandanceService {

    // 출석관리 전체 멤버를 뽑아주기 위함
    List<Attandance> selectList();

    // 출석관리 : 월별 selectList
    // List<Attandance> selectList(String month);
    
}
