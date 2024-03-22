package com.child.project.service;

import java.util.List;
import java.util.Optional;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import com.child.project.entity.Member;
import com.child.project.entity.Program;
import com.child.project.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Log4j2
@Service
public class MemberServiceImpl implements MemberService {
    
    private final MemberRepository repository;

    @Override
    public List<Member> selectList() {
        log.info("리스트 출력 테스트"+repository.findAll());
        return repository.findAll();
    }

    @Override
    public Member selectOne(String memSerial) {
        Optional<Member> result = repository.findById(memSerial);        
        return result.get();
    }

    // @Override
    // public List<Member> selectDetail(String memSerial) {
        
    //     return repository.selectDetail(memSerial);
    // }

    @Override
    public void deleteByMemserial(String memSerial) {
        repository.deleteById(memSerial);
    }

    
}
