package com.child.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.child.project.domain.StaffDTO;
import com.child.project.entity.Staff;
import com.child.project.entity.StaffPrv;
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

    @Override
    public List<Staff> findAll() {
        return repository.findAll();
    }

    @Override
    public List<StaffDTO> findJoinAll() {
        return repository.findJoinAll();
    }

    @Override
    public List<StaffPrv> findPrvAll() {
        return prepository.findAll();
    }
}
