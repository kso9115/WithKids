package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;

public interface ProgramDetailsRepository extends JpaRepository<ProgramDetails, ProgramDetailsId> {

	@Query(value = "select * from program_details where prg_id=:prg_id and rec=:rec", nativeQuery = true)
	List<ProgramDetails> selectDetails(@Param("prg_id") String prgId, @Param("rec") String rec);

	@Query(value = "select * from program_details where STR_TO_DATE(:formatedNow, '%Y-%m-%d') between STR_TO_DATE(SUBSTRING_INDEX(pln_prd, '~', 1), '%Y-%m-%d') and STR_TO_DATE(SUBSTRING_INDEX(pln_prd, '~', -1), '%Y-%m-%d') "
			+ "order by pln_prd", nativeQuery = true)
	List<ProgramDetails> selectSlide(@Param("formatedNow") String formatedNow);

	@Query(value = "select count(*) from program_details where prg_id=:prg_id and prg_dnm=:prg_dnm and rec='프로그램세부'", nativeQuery = true)
	Integer detailsCnt(@Param("prg_id") String prgId, @Param("prg_dnm") String prgDnm);

	@Query(value = "select count(*) from program_details where prg_id=:prg_id and title=:title and rec='프로그램계획'", nativeQuery = true)
	Integer plnCnt(@Param("prg_id") String prgId, @Param("title") String title);

	@Query(value = "select * from program_details where rec='프로그램계획'", nativeQuery = true)
	List<ProgramDetails> selectAllPlan();

	@Query(value = "select * from program_details where rec='프로그램계획' and prg_nm like CONCAT('%',:word,'%')", nativeQuery = true)
	List<ProgramDetails> selectSearchPlanUs(@Param("word") String word);

	@Query(value = "select * from program_details where rec='프로그램계획' "
			+ "and STR_TO_DATE(prg_date, '%Y-%m-%d') between STR_TO_DATE(:prg_date, '%Y-%m-%d') and STR_TO_DATE(:prg_date2, '%Y-%m-%d') "
			+ "and prg_nm like CONCAT('%',:prg_nm,'%') and title like CONCAT('%',:title,'%') and prg_mngr like CONCAT('%',:prg_mngr,'%') ", nativeQuery = true)
	List<ProgramDetails> findSearch(@Param("prg_date") String prgDate,
			@Param("prg_date2") String prgDate2, @Param("prg_nm") String prgNm,
			@Param("title") String title, @Param("prg_mngr") String prgMngr);
}
