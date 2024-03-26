package com.child.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.child.project.entity.MemAdmission;
import com.child.project.repository.MemAdmissionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class MemAdmissionServiceImpl implements MemAdmissionService  {
    
    
    private final MemAdmissionRepository admRepository;
    
    @Override
    public List<MemAdmission> selectList() {
        
        return admRepository.findAll();
    }

    @Override
    public MemAdmission selectOne(String memSerial) {
        
        Optional<MemAdmission> result =  admRepository.findById(memSerial);
        
        if (result.isPresent()){
		    return result.get(); // 존재하면 결과 받아오기
        } else {
		    return null;
        }
    }

    @Override
    public MemAdmission save(MemAdmission entity) {
        log.info("** MemAdmission insert : MemAdmission entity => " + entity);

        admRepository.save(entity);
        return entity;
    }

    @Override
    public MemAdmission delete(MemAdmission entity) {
        log.info("** MemAdmission delete : MemAdmission entity => " + entity);
        admRepository.delete(entity);

        return entity;
    }


    
}
