package com.child.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.child.project.domain.AttandanceDTO;
import com.child.project.entity.Attandance;
import com.child.project.repository.AttandanceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Log4j2
@Service
public class AttandanceServiceImpl implements AttandanceService {

    private final AttandanceRepository repository;

    @Override
    public List<Attandance> selectList() {
        return repository.findAttList();
    }
    
    @Override
    public Attandance selectedOne(String memSerial, String attandanceDate) {
    	return repository.selectedOne(memSerial,attandanceDate);
    }

    // select * from attandance where attandance_date = SUBSTRING(DATE(NOW()), 1,
    // 10)
    // 쿼리문 테스트
    // list ver01
    @Override
    public List<Attandance> selectList3(String yearMonth) {
    return repository.findAttList3(yearMonth);
    }

    // list ver02 : front에서 reduce 써주면 되는거라 일단꺼놓기..ㅠ.ㅠ
    // @Override
    // public List<AttandanceDTO> selectList3(String yearMonth) {
    //     return repository.findAttList3(yearMonth);
    // }

    // selectAdmissionList : 학생 시리얼 번호만 가져오기
    // member테이블에서 받아오므로 쓸일이 없어졌다..
    @Override
    public List<Attandance> selectAdmissionList() {
        return repository.findAdmissionList();
    }

    // 출석 데이터 업데이트
    @Override
    public Attandance attSave(Attandance entity) {
        repository.save(entity);

        return entity;
    }

    //
    @Override
    public Attandance attInsert(Attandance entity) {
        return repository.save(entity);

    }

    @Override
    public List<Integer> attandanceCount(String attandanceDate) {
        return repository.attandanceCount(attandanceDate);
    }

    // 출석 일자 카운팅
    // @Override
    // public Integer attcount(String memSerial) {
    // return repository.attcount(memSerial);
    // }

    // 월별 db
    // @Override
    // public List<Attandance> selectList(String month) {
    // return repository.findAttList(month);
    // }

}
