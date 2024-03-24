package com.child.project.service;

import java.util.List;

import com.child.project.domain.StaffDTO;
import com.child.project.entity.Staff;
import com.child.project.entity.StaffPrv;

public interface StaffService {

    List<Staff> findAll();

    List<StaffDTO> findJoinAll();

    List<StaffPrv> findPrvAll();
}
