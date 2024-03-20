package com.child.project.service;

import java.util.List;


import com.child.project.entity.MemAdmission;


public interface MemAdmissionService {

    //입소 맴버 리스트 불러오기
    List<MemAdmission> selectList();

}
