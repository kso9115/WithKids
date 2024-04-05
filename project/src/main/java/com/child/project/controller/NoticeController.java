package com.child.project.controller;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.child.project.entity.Notice;
import com.child.project.service.NoticeService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Log4j2
@RestController
@RequestMapping(value = "/api/notice")
@AllArgsConstructor
public class NoticeController {

    NoticeService service;

    @GetMapping("/noticeList")
    public List<Notice> noticeList() {
        return service.findAll();
    }// noticeList

    @GetMapping("/selectPage")
    public List<Notice> selectPage(@RequestParam("rowPerPage") int rowPerPage,
            @RequestParam("currPage") int currPage, @RequestParam("word") String word) {
        return service.selectPage(currPage, rowPerPage, word);
    }// selectPage

    @PostMapping("/noticeSave")
    public String noticeSave(@RequestBody Notice entity, HttpServletRequest request) throws IOException {
        String message = "";

        String realPath = request.getRealPath("/");
        log.info("** realPath => " + realPath);

        // // 1.2) realPath 를 이용해서 물리적 저장위치 (file1) 확인
        if (!realPath.contains("apache-tomcat")) {
            realPath = "C:\\Mtest\\childProject\\project\\src\\main\\webapp\\resources\\noticeFile\\"
                    + entity.getSeq() + "\\"; // 개발중.
        } else {
            realPath = "E:\\Mtest\\IDESet\\apache-tomcat-9.0.85\\webapps\\project\\resources\\noticeFile\\"
                    + entity.getSeq() + "\\";
        }

        // // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
        File file = new File(realPath);
        if (!file.exists()) {
            // 저장 폴더가 존재하지 않는경우 만들어줌
            file.mkdir();
        }

        try {
            log.info(" notice save 성공 => " + service.save(entity));
            message = "성공 했습니다.";
        } catch (Exception e) {
            log.info(" notice save Exception => " + e.toString());
            message = "실패 했습니다. 관리자에게 문의하세요.";
        }
        return message;
    }// noticeSave

    @PostMapping("/fileUpload")
	public String fileUpload(@RequestParam("filef") List<MultipartFile> filef,
			@RequestParam("seq") String seq, HttpServletRequest request)
			throws IOException {

		// // 1.1) 현제 웹어플리케이션의 실질적인 실행위치 확인
		String realPath = request.getRealPath("/");
		log.info("** realPath => " + realPath);
		// // 1.2) realPath 를 이용해서 물리적 저장위치 (file1) 확인
		if (!realPath.contains("apache-tomcat"))
			realPath = "C:\\Mtest\\childProject\\project\\src\\main\\webapp\\resources\\noticeFile\\"
					+ seq + "\\"; // 개발중.
		else
			realPath = "E:\\Mtest\\IDESet\\apache-tomcat-9.0.85\\webapps\\project\\resources\\noticeFile\\"
					+ seq + "\\";

		// // 1.4) 저장경로 완성
		String file1 = "";
		// List<MultipartFile> uploadfilef = entity.getPrgFilef();
		if (filef != null && !filef.isEmpty()) {
			for (MultipartFile f : filef) {
				File delFile = new File(realPath + f);
				if (delFile.isFile())
					delFile.delete(); // file 존재시 삭제
				file1 = realPath + f.getOriginalFilename(); // 저장경로 완성
				f.transferTo(new File(file1));
			}
		}

		return "파일 저장 완료";
	}

    @GetMapping("/filedownload")
	public ResponseEntity<Object> download(@RequestParam("seq") String seq,
			@RequestParam("fileName") String fileName, HttpServletRequest request) {

		// // 1.1) 현제 웹어플리케이션의 실질적인 실행위치 확인
		String realPath = request.getRealPath("/");
		log.info("** realPath => " + realPath);
		// // 1.2) realPath 를 이용해서 물리적 저장위치 (file1) 확인
		if (!realPath.contains("apache-tomcat"))
			realPath = "C:\\Mtest\\childProject\\project\\src\\main\\webapp\\resources\\noticeFile\\"
					+ seq + "\\"; // 개발중.
		else
			realPath = "E:\\Mtest\\IDESet\\apache-tomcat-9.0.85\\webapps\\project\\resources\\noticeFile\\"
					+ seq + "\\";
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

    @GetMapping("/noticeCount")
    public int noticeCount(@RequestParam("word") String word) {
        return service.noticeCount(word);
    }// noticeCount

}
