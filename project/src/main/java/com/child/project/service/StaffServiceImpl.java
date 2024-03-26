package com.child.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.child.project.domain.StaffDTO;
import com.child.project.entity.Staff;
import com.child.project.entity.StaffAtn;
import com.child.project.entity.StaffPrv;
import com.child.project.repository.StaffAtnRepository;
import com.child.project.repository.StaffPrvRepositoty;
import com.child.project.repository.StaffRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository repository;
    private final StaffPrvRepositoty prepository;
    private final StaffAtnRepository arepository;

    @Override
    public List<Staff> findAll() {
        return repository.findAll();
    }

    @Override
    public Staff findOne(String staffId) {
        return repository.findOne(staffId);
    }

    @Override
    public List<StaffDTO> findJoinAll() {
        return repository.findJoinAll();
    }

    @Override
    public List<StaffPrv> findPrvAll() {
        return prepository.findPrvAll();
    }

    @Override
    public List<StaffAtn> findAtnAll() {
        return arepository.findAll();
    }

    @Override
    public List<StaffAtn> findAtnId(String staffId) {
        return arepository.findAtnId(staffId);
    }

    @Override
    public void updataPassword(String staffId, String staffPsw) {
        repository.updataPassword(staffId, staffPsw);
    }

    @Override
    public int countId(String staffId) {
        return repository.countId(staffId);
    }

    @Override
    public Staff save(Staff entity) {
        repository.save(entity);
        log.info("** register : entity => " + entity);

        return entity;
    }

    @Override
    public StaffAtn save(StaffAtn entity) {
        arepository.save(entity);
        log.info("** register : entity => " + entity);

        return entity;
    }

    @Override
    public void deleteById(String staffId) {
        repository.deleteById(staffId);
    }

}
