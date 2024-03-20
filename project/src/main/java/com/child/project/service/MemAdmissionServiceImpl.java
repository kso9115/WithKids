package com.child.project.service;

import java.util.List;

import com.child.project.entity.MemAdmission;
import com.child.project.repository.MemAdmissionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemAdmissionServiceImpl implements MemAdmissionService  {

    private final MemAdmissionRepository admissionRepository;
    
     //입소 맴버 리스트 불러오기
    @Override
    public List<MemAdmission> selectList() {
        
        return admissionRepository.findAll();
    }

}
