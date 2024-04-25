package com.child.project.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.service.ProgramService;
import com.child.project.service.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@Controller
@AllArgsConstructor
public class HomeController {

	ProgramService prgService;
	UserService userService;

	@GetMapping("/api/user/prgImg")
	public ResponseEntity<?> prgSlideImg(@RequestParam String prgId, HttpServletRequest request) throws Exception {
		String realPath = request.getSession().getServletContext().getRealPath("/");

		if (!realPath.contains("tomcat9")) {
			realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/programImg/";
		} else {
			realPath += "resources/programImg/";
		}
		Resource resource = new FileSystemResource(realPath + prgId + "/programImg.png");

		return new ResponseEntity<>(resource, HttpStatus.OK);
	}

	@GetMapping("/api/user/xssDownload")
	public ResponseEntity<?> xssDownload2(@RequestParam("name") String name) {
		try {
			log.info("excelDown");

			// 엑셀 다운로드를 위한 데이터 조회
			List<?> list = userService.xssDownload(name);

			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			log.error("Error occurred while fetching Excel data", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
