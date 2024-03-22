package com.child.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

// import com.child.project.domain.ProgramDTO;
import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.entity.ProgramId;
import com.child.project.repository.ProgramDetailsRepository;
import com.child.project.repository.ProgramRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService {

	private final ProgramRepository repository;
	// private final ProgramDTO DTO;
	private final ProgramDetailsRepository prgdrepository;

	@Override
	public List<Program> selectList() {
		return repository.findAll();
	}

	@Override
	public Integer detailsCnt(String prgId, String prgDnm) {
		return prgdrepository.detailsCnt(prgId, prgDnm);
	}

	@Override
	public Program selectOne(ProgramId programId) {
		Optional<Program> result = repository.findById(programId);

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
	public ProgramDetails dtSave(ProgramDetails entity) {
		log.info("** register : entity => " + entity);
		prgdrepository.save(entity); // 처리후 entity 를 return

		return entity;
	}

	@Override
	public Integer saveCat(String prgBigCls, String prgMidCls, String prgSubCls) {
		return repository.saveCat(prgBigCls, prgMidCls, prgSubCls);
	}

	@Override
	public void deleteById(ProgramId entityId) {
		repository.deleteById(entityId);
	}

	@Override
	public void deleteDtById(ProgramDetailsId entityId) {
		prgdrepository.deleteById(entityId);
	}
	
	@Override
	public List<ProgramDetails> selectDetails(String prgId, String rec) {
		return prgdrepository.selectDetails(prgId, rec);
	}

	

	// @Override
	// public List<ProgramDetails> selectDetails() {
	// return prgdrepository.findAll();
	// }
}
