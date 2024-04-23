package com.child.project.service;

import java.io.IOException;
import java.util.List;

import com.child.project.domain.ProgramDetailsDTO;
import com.child.project.entity.Program;
import com.child.project.entity.ProgramApplication;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.entity.ProgramId;

public interface ProgramService {

	List<Program> selectList();

	Program selectOne(String prgId);

	ProgramDetailsDTO selectJoinOne(ProgramDetailsId programDetailsId);

	List<ProgramDetails> selectSlide();

	List<Program> findSearch(Program entity);

	List<ProgramDetails> findPlnSearch(ProgramDetails entity);

	Integer detailsCnt(String prgId, String prgDnm);

	Integer plnCnt(String prgId, String title);

	List<ProgramDetails> selectDetails(String prgId, String rec);

	ProgramDetails selectDetailsOne(ProgramDetailsId entity);

	List<ProgramDetails> selectAllPlan();

	List<ProgramDetails> selectSearchPlanUs(String word);

	List<ProgramApplication> selectAllApl(String prgId);

	Program save(Program entity);

	ProgramDetails dtSave(ProgramDetails entity);

	Integer saveCat(String prgBigCls, String prgMidCls, String prgSubCls);

	void deleteById(ProgramId entityId);

	void deleteDtById(ProgramDetailsId entityId);

	ProgramApplication aplSave(ProgramApplication entity);

	List<ProgramApplication> selectMemApl(String memSerial);

	Integer MemAplCk(String memSerial, String prgId);

	void prgCnclt(ProgramApplication entity) ;

	String refundRequest(String access_token, String merchant_uid, String reason) throws Exception;
	
	String getToken(String apiKey, String secretKey) throws IOException;
}
