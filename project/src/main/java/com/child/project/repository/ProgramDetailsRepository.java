package com.child.project.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Program_details;
import com.child.project.entity.Program_detailsId;

public interface ProgramDetailsRepository extends JpaRepository<Program_details, Program_detailsId> {

	@Modifying
	@Transactional
	@Query("select * from Program_details where rec=:rec and prg_date=:prg_date and prg_id=:prg_id")
	Program_details selectDetails(@Param("rec") String rec, @Param("prg_date") String prg_date,
			@Param("prg_id") String prg_id);
}
