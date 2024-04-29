package com.child.project.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.child.project.domain.ProgramDetailsDTO;
import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.entity.ProgramId;
import com.child.project.service.ProgramService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/prg")
@AllArgsConstructor // 개별적으로 @Autowired 하지않아도 된다. 생략가능
public class ProgramController {

	ProgramService prgService;

	@GetMapping("/prgList")
	public List<Program> prgList() {

		List<Program> list = prgService.selectList();

		return list;
	} // prgList

	@GetMapping("/prgSlide")
	public List<ProgramDetails> Slide(HttpServletRequest request) throws Exception {
		List<ProgramDetails> list = prgService.selectSlide();

		return list;
	}

	@GetMapping("/prgSlideImg")
	public ResponseEntity<?> prgSlideImg(@RequestParam String prgId, HttpServletRequest request) throws Exception {
		String realPath = request.getSession().getServletContext().getRealPath("/");
		log.info(" realPath => " + realPath);

		if (!realPath.contains("tomcat9")) {
			realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/programImg/";
		} else {
			realPath += "resources/programImg/";
		}

		// Resource resource = new FileSystemResource(realPath + prgId +
		// "/programImg.png");
		Resource resource = new FileSystemResource(realPath + prgId + "/programImg.png");

		return new ResponseEntity<>(resource, HttpStatus.OK);
	}

	@GetMapping("/prgSearch")
	public List<Program> prgSearch(Program entity) {
		log.info(" prgList 도착 ");
		List<Program> list = prgService.findSearch(entity);

		return list;
	} // prgList

	@GetMapping("/prgDetails")
	public List<ProgramDetails> prgDetails(@RequestParam("prgId") String prgId,
			@RequestParam("rec") String rec) {

		List<ProgramDetails> list = prgService.selectDetails(prgId, rec);

		return list;
	} // prgDetails

	@PostMapping("/prgDetailsOne")
	public ProgramDetails prgDetailsOne(@RequestBody ProgramDetailsId entityId) {

		ProgramDetails entity = prgService.selectDetailsOne(entityId);

		return entity;
	} // prgDetails

	

	@PostMapping("/fileUpload")
	public String fileUpload(@RequestParam("prgFilef") List<MultipartFile> prgFilef,
			@RequestParam("prgId") String prgId, @RequestParam("prgDnm") String prgDnm, HttpServletRequest request)
			throws IOException {

		// // 1.1) 현제 웹어플리케이션의 실질적인 실행위치 확인
		String realPath = request.getSession().getServletContext().getRealPath("/");
		log.info("** realPath => " + realPath);

		if (!realPath.contains("tomcat9")) {
			realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/uploadFile/" + prgId + prgDnm
					+ "/";
		} else {
			realPath += "resources/uploadFile/" + prgId + prgDnm + "/";
		}
		// // 1.4) 저장경로 완성
		String file1 = "";
		// List<MultipartFile> uploadfilef = entity.getPrgFilef();
		if (prgFilef != null && !prgFilef.isEmpty()) {
			for (MultipartFile f : prgFilef) {
				File delFile = new File(realPath + f);
				if (delFile.isFile())
					delFile.delete(); // file 존재시 삭제
				file1 = realPath + f.getOriginalFilename(); // 저장경로 완성
				f.transferTo(new File(file1));
			}
		}

		return "파일 저장 완료";
	}

	@PostMapping("/imgUpload")
	public String imgUpload(@RequestParam("prgImg") MultipartFile prgImg,
			@RequestParam("prgId") String prgId, HttpServletRequest request)
			throws IOException {

		// // 1.1) 현제 웹어플리케이션의 실질적인 실행위치 확인
		String realPath = request.getSession().getServletContext().getRealPath("/");
		log.info("** realPath => " + realPath);
		// // 1.2) realPath 를 이용해서 물리적 저장위치 (file1) 확인
		// if (!realPath.contains("apache-tomcat"))
		// realPath =
		// "C:/Mtest/childProject/project/src/main/webapp/resources/programImg/"
		// + prgId + "/"; // 개발중.
		// else
		// realPath =
		// "E:/Mtest/IDESet/apache-tomcat-9.0.85/webapps/project/resources/programImg/"
		// + prgId + "/";
		if (!realPath.contains("tomcat9")) {
			realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/programImg/" + prgId + "/";
		} else {
			realPath += "resources/programImg/" + prgId + "/";
		}
		// // 1.4) 저장경로 완성
		String file1 = "";
		// List<MultipartFile> uploadfilef = entity.getPrgFilef();
		if (prgImg != null && !prgImg.isEmpty()) {
			File delFile = new File(realPath + prgImg);
			if (delFile.isFile())
				delFile.delete(); // file 존재시 삭제
			file1 = realPath + "programImg.png"; // 저장경로 완성
			// file1 = realPath + prgImg.getOriginalFilename(); // 저장경로 완성
			prgImg.transferTo(new File(file1));
		}

		return "파일 저장 완료";
	}

	@GetMapping("/filedownload")
	public ResponseEntity<Object> download(@RequestParam("prgId") String prgId, @RequestParam("prgDnm") String prgDnm,
			@RequestParam("fileName") String fileName, HttpServletRequest request) {

		// // 1.1) 현제 웹어플리케이션의 실질적인 실행위치 확인
		String realPath = request.getSession().getServletContext().getRealPath("/");

		if (!realPath.contains("tomcat9")) {
			realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/uploadFile/" + prgId + prgDnm
					+ "/";
		} else {
			realPath += "resources/uploadFile/" + prgId + prgDnm + "/";
		}
		try {
			// 파일 경로 생성
			Path filePath = Paths.get(realPath).resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());

			// 파일이 존재하는지 확인
			if (resource.exists()) {
				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.setContentDispositionFormData("attachment", fileName);

				return ResponseEntity.ok()
						.headers(headers)
						.body(resource);
			} else {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
			}
		} catch (MalformedURLException ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File path is invalid", ex);
		} catch (IOException ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read file", ex);
		}
	}

	@PostMapping("/prgOne")
	public Program prgOne(@RequestBody Program entity) {

		entity = prgService.selectOne(entity.getPrgId());

		return entity;
	} // prgOne

	@PostMapping("/prgdOne")
	public ProgramDetailsDTO prgOne(@RequestBody ProgramDetailsId entityId) {

		ProgramDetailsDTO entity = prgService.selectJoinOne(entityId);

		return entity;
	} // prgdOne

}
