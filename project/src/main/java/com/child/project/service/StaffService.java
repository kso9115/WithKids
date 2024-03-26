package com.child.project.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.child.project.domain.StaffDTO;
import com.child.project.entity.ProgramId;
import com.child.project.entity.Staff;
import com.child.project.entity.StaffAtn;
import com.child.project.entity.StaffPrv;

public interface StaffService {

    List<Staff> findAll();

    Staff findOne(String staffId);

    List<StaffDTO> findJoinAll();

    List<StaffPrv> findPrvAll();

    List<StaffAtn> findAtnAll();

    List<StaffAtn> findAtnId(String staffId);

    void updataPassword(String staffId, String staffPsw);

    int countId(String staffId);

    Staff save(Staff entity);

    StaffAtn save(StaffAtn entity);

    void deleteById(String staffId);
}
