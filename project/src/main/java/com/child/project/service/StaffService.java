package com.child.project.service;

import java.util.List;

import com.child.project.domain.StaffDTO;
import com.child.project.entity.Staff;

public interface StaffService {

    List<Staff> findAll();

    List<StaffDTO> findJoinAll();
}
