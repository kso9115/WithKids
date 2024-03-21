package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Program;
import com.child.project.entity.ProgramId;

public interface ProgramRepository extends JpaRepository<Program, ProgramId> {

    @Query(value = "select * from program order by prg_big_cls,prg_mid_cls,prg_sub_cls", nativeQuery = true)
    List<Program> findAll();

    @Query(value = "select count(*) from program where prg_big_cls=:prg_big_cls and prg_mid_cls=:prg_mid_cls and prg_sub_cls=:prg_sub_cls", nativeQuery = true)
    Integer saveCat(@Param("prg_big_cls") String prgBigCls, @Param("prg_mid_cls") String prgMidCls,
            @Param("prg_sub_cls") String prgSubCls);
}
