package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;

public interface ProgramDetailsRepository extends JpaRepository<ProgramDetails, ProgramDetailsId> {

	@Query(value = "select * from program_details where prg_id=:prg_id and rec=:rec", nativeQuery = true)
	List<ProgramDetails> selectDetails(@Param("prg_id") String prgId, @Param("rec") String rec);

	@Query(value = "select count(*) from program_details where prg_id=:prg_id and prg_dnm=:prg_dnm and rec='프로그램세부'", nativeQuery = true)
	Integer detailsCnt(@Param("prg_id")String prgId, @Param("prg_dnm")String prgDnm);
}
