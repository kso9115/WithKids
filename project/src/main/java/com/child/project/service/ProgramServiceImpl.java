package com.child.project.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

// import com.child.project.domain.ProgramDTO;
import com.child.project.entity.Program;
import com.child.project.entity.ProgramApplication;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.entity.ProgramId;
import com.child.project.repository.ProgramApplicationRepository;
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

	private final ProgramApplicationRepository prgarepository;

	@Override
	public List<Program> selectList() {
		return repository.findAll();
	}

	@Override
	public Program selectOne(String prgId) {
		return repository.selectOne(prgId);
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
	public List<ProgramDetails> selectSlide() {
		LocalDate now = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String formatedNow = now.format(formatter);

		return prgdrepository.selectSlide(formatedNow);
	}

	@Override
	public List<Program> findSearch(Program entity) {
		return repository.findSearch(entity.getPrgStr(), entity.getPrgEnd(),
				entity.getPrgNm(), entity.getPrgMngr(), entity.getPrgCls());
	}

	@Override
	public List<ProgramDetails> findPlnSearch(ProgramDetails entity) {
		log.info(entity.getPrgDate().split("~")[0]);
		log.info(entity.getPrgDate().split("~")[1]);
		return prgdrepository.findSearch(entity.getPrgDate().split("~")[0], entity.getPrgDate().split("~")[1],
				entity.getPrgNm(), entity.getTitle(), entity.getPrgMngr());
	}

	@Override
	public Integer detailsCnt(String prgId, String prgDnm) {
		return prgdrepository.detailsCnt(prgId, prgDnm);
	}

	@Override
	public Integer plnCnt(String prgId, String title) {
		return prgdrepository.plnCnt(prgId, title);
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

	@Override
	public List<ProgramDetails> selectAllPlan() {

		return prgdrepository.selectAllPlan();
	}

	@Override
	public List<ProgramApplication> selectAllApl(String prgId) {
		return prgarepository.selectAllApl(prgId);
	}

	@Override
	public ProgramApplication aplSave(ProgramApplication entity) {
		return prgarepository.save(entity);
	}

	// @Override
	// public List<ProgramDetails> selectDetails() {
	// return prgdrepository.findAll();
	// }
}
