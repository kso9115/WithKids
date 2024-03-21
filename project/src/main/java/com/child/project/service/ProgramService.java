package com.child.project.service;

import java.util.List;

import com.child.project.domain.ProgramDTO;
import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramId;

public interface ProgramService {

	List<Program> selectList();

	// List<ProgramDetails> selectDetails();
	List<ProgramDetails> selectDetails(String prgId, String rec);

	Program selectOne(ProgramId programId);

	Program save(Program entity);

	Integer saveCat(String prgBigCls, String prgMidCls, String prgSubCls);

	void deleteById(ProgramId programId);
}
