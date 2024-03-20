package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.child.project.entity.Program;

public interface ProgramRepository extends JpaRepository<Program, String> {

    @Query(value = "select * from program order by prg_big_cls,prg_mid_cls,prg_sub_cls", nativeQuery = true)
    List<Program> findAll();

}
