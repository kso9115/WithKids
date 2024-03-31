package com.child.project.service;

import java.util.List;

import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.entity.ProgramId;

public interface ProgramService {

	List<Program> selectList();

	List<Program> selectSlide();

	List<Program> findSearch(Program entity);

	List<ProgramDetails> findPlnSearch(ProgramDetails entity);

	Integer detailsCnt(String prgId, String prgDnm);

	Integer plnCnt(String prgId, String title);

	// List<ProgramDetails> selectDetails();
	List<ProgramDetails> selectDetails(String prgId, String rec);

	List<ProgramDetails> selectAllPlan();

	Program selectOne(ProgramId programId);

	Program save(Program entity);

	ProgramDetails dtSave(ProgramDetails entity);

	Integer saveCat(String prgBigCls, String prgMidCls, String prgSubCls);

	void deleteById(ProgramId entityId);

	void deleteDtById(ProgramDetailsId entityId);
}
