package com.child.project.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.child.project.service.ProgramService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class HomeController {

	ProgramService prgService;

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

}
