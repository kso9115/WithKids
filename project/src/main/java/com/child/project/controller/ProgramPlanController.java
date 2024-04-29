package com.child.project.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.ProgramApplication;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.service.ProgramService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/prgPln")
@AllArgsConstructor
public class ProgramPlanController {
	ProgramService prgService;

	@GetMapping("/prgPlnList")
	public List<ProgramDetails> prgPlnList() {

		List<ProgramDetails> list = prgService.selectAllPlan();

		return list;
	} // prgList

	@PostMapping("/prgPlnOne")
	public ProgramDetails prgPlnOne(@RequestBody ProgramDetailsId entityId) {

		ProgramDetails entity = prgService.selectDetailsOne(entityId);

		return entity;
	} // prgDetails

	@GetMapping("/prgPlnListUser")
	public List<ProgramDetails> prgPlnListUser(@RequestParam("word") String word) {

		List<ProgramDetails> list = prgService.selectSearchPlanUs(word);

		return list;
	} // prgList

	@PostMapping("/prgAplList")
	public List<ProgramApplication> prgAplList(@RequestBody ProgramApplication entity) {

		List<ProgramApplication> list = prgService.selectAllApl(entity.getPrgId());

		return list;
	} // prgList

	@GetMapping("/prgPlnSearch")
	public List<ProgramDetails> prgSearch(ProgramDetails entity) {
		log.info(entity);
		List<ProgramDetails> list = prgService.findPlnSearch(entity);

		return list;
	} // prgPlnSearch

	@PostMapping("/aplSave")
	public String aplSave(@RequestBody ProgramApplication entity) {
		String message = "";

		try {
			log.info(" ProgramApplication Save 성공 => " + prgService.aplSave(entity));
			message = "저장에 성공 했습니다.";
		} catch (Exception e) {
			log.info(" ProgramApplication Save Exception => " + e.toString());
			return "저장에 실패 했습니다. 관리자에게 문의하세요.";
		}

		return message;
	} // aplSave

	@PostMapping("/memAplList")
	public List<ProgramApplication> memAplList(@RequestBody ProgramApplication entity) {
		List<ProgramApplication> list = prgService.selectMemApl(entity.getMemSerial());
		return list;
	}
}
