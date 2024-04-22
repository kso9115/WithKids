package com.child.project.service;

import java.util.List;
import java.util.Optional;

import lombok.extern.log4j.Log4j2;

import org.springframework.stereotype.Service;

import com.child.project.entity.Attandance;
import com.child.project.entity.Education;
import com.child.project.entity.Member;
import com.child.project.repository.MemberEduRepository;
import com.child.project.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Log4j2
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository repository;
    private final MemberEduRepository eduRepository;

    @Override
    public List<Member> selectList() {
        // log.info("리스트 출력 테스트" + repository.findAll());
        return repository.findAll();
    }

    @Override
    public Member selectOne(String memSerial) {
        Optional<Member> result = repository.findById(memSerial);
        return result.get();
    }

    // @Override
    // public List<Member> selectDetail(String memSerial) {

    // return repository.selectDetail(memSerial);
    // }

    // Delete
    @Override
    public void deleteMemByMemserial(String memSerial) {
        repository.deleteById(memSerial);
    }

    // Insert & Update
    @Override
    public Member save(Member memEntity) {
        // memEntity에 저장
        Member result = repository.save(memEntity);
        return result;
    }

    // SearchBox
    @Override
    public List<Member> searchList(Member entity) {
        return repository.searchList(entity.getMemStr(), entity.getMemEndF(),
                entity.getMemName(), entity.getMemSex(), entity.getMemResPerson(),
                entity.getMemStatus());
    }

    // @Override
    // public List<Member> searchList(String memStr, String memEnd, String memName,
    // String memSex, String memResPerson, String memStatus) {
    // return repository.searchList(memStr, memEnd, memName, memSex, memResPerson,
    // memStatus);
    // }

    // 비밀번호 초기화
    @Override
    public void resetPw(String memLoginPW, String memSerial) {
        repository.resetPassword(memLoginPW, memSerial);
    }

    // ============================
    // Education 엔티티 접근
    @Override
    public Education selectEduData(String memSerial) {
        Optional<Education> result = eduRepository.findById(memSerial);
        log.info("&&&&&&&&&&&&&&" + result);
        return result.get();
    }

    // memSerial 매칭해서 맞는 학력정보 리턴하기 위함
    @Override
    public List<Education> selectEduList() {
        return eduRepository.findAll();
    }

    // Insert & Update
    @Override
    public Education save(Education eduEntity) {
        Education result = eduRepository.save(eduEntity);
        return result;
    }

    // Delete
    @Override
    public void deleteEduByMemserial(String memSerial) {
        eduRepository.deleteById(memSerial);
    }

    // selectAdmissionList : 학생 시리얼 번호만 가져오기
    @Override
    public List<Member> selectAdmissionList() {
        return repository.findAdmissionList();
    }

    @Override
    public Member selectAllMember(String memSerial) {
        Member member = repository.selectOneMember(memSerial);
        member.setEducation(eduRepository.selectEduMember(memSerial));
        return member;
    }

}
