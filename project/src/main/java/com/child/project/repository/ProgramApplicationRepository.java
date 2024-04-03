package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.ProgramApplication;
import com.child.project.entity.ProgramApplicationId;

public interface ProgramApplicationRepository extends JpaRepository<ProgramApplication, ProgramApplicationId> {

}