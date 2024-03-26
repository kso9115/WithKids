package com.child.project.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.child.project.entity.MemAdmission;
import com.child.project.entity.MemLeaving;
import com.child.project.repository.MemLeavingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
@Service
@Log4j2
@RequiredArgsConstructor
public class MemLeavingServiceImpl implements MemLeavingService{

    private final MemLeavingRepository lvngRepository;
    @Override
    public MemLeaving selectOne(String memSerial) {
        Optional<MemLeaving> result = lvngRepository.findById(memSerial);
        
        if(result.isPresent()){
            return result.get();
        } else {
            return null;
        }
    }

     @Override
    public MemLeaving save(MemLeaving entity) {
        log.info("** MemAdmission insert : MemAdmission entity => " + entity);

        lvngRepository.save(entity);
        return entity;
    }

    @Override
    public MemLeaving delete(MemLeaving entity) {
        log.info("** MemAdmission delete : MemAdmission entity => " + entity);
        lvngRepository.delete(entity);

        return entity;
    }

}
