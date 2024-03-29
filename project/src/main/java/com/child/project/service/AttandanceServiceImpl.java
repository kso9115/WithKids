package com.child.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.child.project.entity.Attandance;
import com.child.project.repository.AttandanceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Log4j2
@Service
public class AttandanceServiceImpl implements AttandanceService {
    
    AttandanceRepository repository;
    
    @Override
    public List<Attandance> selectList() {
        return repository.findAttList();
    }
    
}
