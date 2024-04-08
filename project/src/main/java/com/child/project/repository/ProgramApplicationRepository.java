package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.ProgramApplication;
import com.child.project.entity.ProgramApplicationId;

public interface ProgramApplicationRepository extends JpaRepository<ProgramApplication, ProgramApplicationId> {

    @Query(value = "select * from program_application where prg_id=:prg_id", nativeQuery = true)
    List<ProgramApplication> selectAllApl(@Param("prg_id") String prgId);


    @Query(value = "select * from program_application where mem_serial=:mem_serial", nativeQuery = true)
    List<ProgramApplication> selectMemApl(@Param("mem_serial") String memSerial);
}