package com.child.project.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.service.ProgramService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Log4j2
@RestController
@RequestMapping(value = "/api/prg")
@AllArgsConstructor // 개별적으로 @Autowired 하지않아도 된다. 생략가능
public class ProgramController {

	ProgramService prgService;

	@GetMapping("/prgList")
	public List<Program> prgList(Model model) {
		List<Program> list = prgService.selectList();

		return list;
	} // prgList

	@GetMapping("/prgDetails")
	public List<ProgramDetails> prgDetails(Model model, @RequestParam("prgId") String prgId,
			@RequestParam("rec") String rec) {
		System.out.println(prgId + ' ' + rec);
		return prgService.selectDetails(prgId, rec);
	} // prgDetails

	// @RequestBody
	@PostMapping("/prgInsert")
	public String prgInsert(Program entity) {

		log.info(entity);
		// try {
		// log.info(" program insert 성공 => " + prgService.save(entity));
		// } catch (Exception e) {
		// log.info(" program insert Exception => " + e.toString());
		// }

		return "";
	}

	@GetMapping("/hi")
	public String hi() {

		return "hi";
	} // prgList
}
