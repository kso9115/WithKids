package com.child.project.service;

import java.util.List;

import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;

public interface ProgramService {

	List<Program> selectList();

	// List<ProgramDetails> selectDetails();
	List<ProgramDetails> selectDetails(String prgId, String rec);

	Program selectOne(String prg_id);

	Program save(Program entity);

	void deleteById(String prg_id);
}
