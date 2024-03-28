package com.child.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
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
	public List<ProgramDetails> prgList() {

		List<ProgramDetails> list = prgService.selectAllPlan();

		return list;
	} // prgList

	@GetMapping("/prgPlnSearch")
	public List<ProgramDetails> prgSearch(ProgramDetails entity) {

		List<ProgramDetails> list = prgService.findPlnSearch(entity);

		return list;
	} // prgList
}
