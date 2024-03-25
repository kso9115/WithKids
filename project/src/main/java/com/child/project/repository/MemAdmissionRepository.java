package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.MemAdmission;

public interface MemAdmissionRepository extends JpaRepository<MemAdmission, String>  {
    
}
