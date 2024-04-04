package com.child.project.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	public List<ProgramDetails> prgList() {

		List<ProgramDetails> list = prgService.selectAllPlan();

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

	@PostMapping("/prgPlnDtdelete")
	public String prgdelete(@RequestBody ProgramDetailsId entityId) {
		String message = "";

		try {
			prgService.deleteDtById(entityId);
			log.info(" ProgramDetails delete 성공 ");
			message = "삭제에 성공 했습니다.";
		} catch (Exception e) {
			log.info(" ProgramDetails delete Exception => " + e.toString());
			message = "삭제에 실패 했습니다. 관리자에게 문의하세요.";
		}

		return message;
	}

	@PostMapping("/prgPlnSave")
	public String prgInsert(@RequestBody ProgramDetails entity, HttpServletRequest request) throws IOException {
		log.info("** 내게 허락된건 힘겹기만한 ");
		String message = "";

		String realPath = request.getRealPath("/");

		// // 1.2) realPath 를 이용해서 물리적 저장위치 (file1) 확인
		if (!realPath.contains("apache-tomcat")) {
			realPath = "C:\\Mtest\\childProject\\project\\src\\main\\webapp\\resources\\uploadFile\\"
					+ entity.getPrgId() + entity.getPrgDnm() + "\\"; // 개발중.
		} else {
			realPath = "E:\\Mtest\\IDESet\\apache-tomcat-9.0.85\\webapps\\project\\resources\\uploadFile\\"
					+ entity.getPrgId() + entity.getPrgDnm() + "\\";
		}

		// // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
		File file = new File(realPath);
		if (!file.exists()) {
			// 저장 폴더가 존재하지 않는경우 만들어줌
			file.mkdir();
		}

		if (entity
				.getPrgId() != null && entity.getTitle() != null
				&& "prgPlnInsert".equals(entity.getType())
				&& prgService.plnCnt(entity.getPrgId(), entity.getTitle()) == 0) {
			try {
				log.info(" ProgramDetails insert 성공 => " + prgService.dtSave(entity));
				message = "신규생성에 성공 했습니다.";
			} catch (Exception e) {
				log.info(" ProgramDetails insert Exception => " + e.toString());
				message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
			}
		} else if (entity.getPrgId() != null && entity.getTitle() != null && "prgPlnUpdate".equals(entity.getType())
				&& prgService.plnCnt(entity.getPrgId(), entity.getTitle()) > 0) {
			try {
				log.info(" ProgramDetails Update 성공 => " + prgService.dtSave(entity));
				message = "저장에 성공 했습니다.";
			} catch (Exception e) {
				log.info(" ProgramDetails Update Exception => " + e.toString());
				message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
			}
		} else if ("prgPlnInsert".equals(entity.getType())) {
			message = "신규생성에 실패 했습니다. 같은 프로그램이 있는지 확인하세요.";
		} else if ("prgPlnUpdate".equals(entity.getType())) {
			message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
		} else {
			message = "요청에 실패했습니다. 관리자에게 문의하세요.";
		}

		return message;
	}

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
}
