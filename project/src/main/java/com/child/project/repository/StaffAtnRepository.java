package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.StaffAtn;
import com.child.project.entity.StaffAtnId;

public interface StaffAtnRepository extends JpaRepository<StaffAtn,StaffAtnId> {
    
}
