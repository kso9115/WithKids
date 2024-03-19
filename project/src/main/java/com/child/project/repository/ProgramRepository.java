package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.Program;

public interface ProgramRepository extends JpaRepository<Program, String> {

}
