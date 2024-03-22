package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.MemAdmission;
import com.child.project.entity.Program;

public interface MemAdmissionRepository extends JpaRepository<MemAdmission, String>  {
    
}
