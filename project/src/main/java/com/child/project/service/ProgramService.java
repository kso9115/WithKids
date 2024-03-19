package com.child.project.service;

import java.util.List;

import com.child.project.entity.Program;
import com.child.project.entity.Program_details;

public interface ProgramService {

	List<Program> selectList();
	
	Program_details selectDetails(String rec,String prg_date,String prg_id);

	Program selectOne(String prg_id);

	Program save(Program entity);

	void deleteById(String prg_id);
}
