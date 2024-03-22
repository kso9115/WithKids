package com.child.project.service;

import java.util.List;

import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.entity.ProgramId;

public interface ProgramService {

	List<Program> selectList();

	List<Program> findSearch(Program entity);

	Integer detailsCnt(String prgId,String prgDnm);

	// List<ProgramDetails> selectDetails();
	List<ProgramDetails> selectDetails(String prgId, String rec);

	Program selectOne(ProgramId programId);

	Program save(Program entity);

	ProgramDetails dtSave(ProgramDetails entity);

	Integer saveCat(String prgBigCls, String prgMidCls, String prgSubCls);

	void deleteById(ProgramId entityId);

	void deleteDtById(ProgramDetailsId entityId);
}
