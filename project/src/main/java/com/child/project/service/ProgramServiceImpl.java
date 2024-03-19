package com.child.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.child.project.entity.Program;
import com.child.project.repository.ProgramRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService {

	private final ProgramRepository repository;

	@Override
	public List<Program> selectList() {
		return repository.findAll();
	}

	@Override
	public Program selectOne(String prg_id) {
		Optional<Program> result = repository.findById(prg_id);

		if (result.isPresent())
			return result.get(); // ver01
		else
			return null;
	}

	@Override
	public Program save(Program entity) {
		log.info("** register : entity => " + entity);
		repository.save(entity); // 처리후 entity 를 return

		return entity;
	}

	@Override
	public void deleteById(String prg_id) {
		repository.deleteById(prg_id);
	}

}
