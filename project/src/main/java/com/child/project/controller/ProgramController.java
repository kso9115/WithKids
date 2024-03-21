package com.child.project.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.domain.ProgramDTO;
import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramId;
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
		String message = "";
		// LocalDate now = LocalDate.now(); // 포맷 정의
		// DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
		// String formatedNow = now.format(formatter);

		entity.setPrgId(entity.getPrgBigCls() + entity.getPrgMidCls() + entity.getPrgSubCls());
		if (prgService.saveCat(entity.getPrgBigCls(), entity.getPrgMidCls(), entity.getPrgSubCls()) == 0) {
			try {
				log.info(" program insert 성공 => " + prgService.save(entity));
				message = "신규생성에 성공 했습니다.";
			} catch (Exception e) {
				log.info(" program insert Exception => " + e.toString());
				message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
			}
		} else {
			message = "신규생성에 실패 했습니다.\n사업 분류(대,중,소)가 같은 프로그램이 존재합니다.";
		}
		

		return message;
	}

	@PostMapping("/prgDtInsert")
	public String prgDtInsert(HttpServletRequest request, ProgramDetails entity) {
		String message = "";
		// LocalDate now = LocalDate.now(); // 포맷 정의
		// DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
		// String formatedNow = now.format(formatter);
		if (prgService.detailsCnt(entity.getPrgId(), entity.getPrgDnm()) == 0) {
			String realPath = request.getRealPath("/");
			log.info("** realPath => " + realPath);

			if (!realPath.contains("tomcat"))
				realPath = "D:\\MTest\\childProject\\project\\src\\main\\file\\"; // 개발중.
			else
				realPath = "E:\\Mtest\\IDESet\\apache-tomcat-9.0.85\\webapps\\demoM\\resources\\uploadImages\\";



			try {
				// log.info(" program insert 성공 => " + prgService.dtSave(entity));
				message = "신규생성에 성공 했습니다.";
			} catch (Exception e) {
				log.info(" program insert Exception => " + e.toString());
				message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
			}
		} else {
			message = "신규생성에 실패 했습니다.\n같은 세부프로그램명이 존재합니다.";
		}
		

		return message;
	}

	@PostMapping("/prgUpdate")
	public String prgUpdate(Program entity) {
		String message = "";

		try {
			log.info(" program insert 성공 => " + prgService.save(entity));
			message = "저장에 성공 했습니다.";
		} catch (Exception e) {
			log.info(" program insert Exception => " + e.toString());
			message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
		}

		return message;
	}

	@PostMapping("/prgdelete")
	public String prgdelete(ProgramId programId) {
		String message = "";

		try {
			prgService.deleteById(programId);
			log.info(" member delete 성공 ");
			message = "삭제에 성공 했습니다.";
		} catch (Exception e) {
			log.info(" member delete Exception => " + e.toString());
			message = "삭제에 실패 했습니다. 관리자에게 문의하세요.";
		}

		return message;
	}

	@GetMapping("/hi")
	public String hi() {

		return "hi";
	} // prgList
}
