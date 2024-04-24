package com.child.project.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Notice;
import com.child.project.service.NoticeService;
import com.child.project.service.ProgramService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api")
@AllArgsConstructor // 개별적으로 @Autowired 하지않아도 된다. 생략가능
public class JwtTokenPrgController {

    NoticeService Ntcservice;
    ProgramService prgService;

    @PostMapping("/jwtPrg/noticeSave")
    public String noticeSave(@RequestBody Notice entity, HttpServletRequest request) throws IOException {
        String message = "";

        String realPath = request.getSession().getServletContext().getRealPath("/");
        log.info("** realPath => " + realPath);

        // // 1.2) realPath 를 이용해서 물리적 저장위치 (file1) 확인
        // if (!realPath.contains("apache-tomcat")) {
        // realPath =
        // "C:/Mtest/childProject/project/src/main/webapp/resources/noticeFile/"
        // + entity.getSeq() + "/"; // 개발중.
        // } else {
        // realPath =
        // "E:/Mtest/IDESet/apache-tomcat-9.0.85/webapps/project/resources/noticeFile/"
        // + entity.getSeq() + "/";
        // }

        if (!realPath.contains("tomcat9")) {
            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/noticeFile/"
                    + entity.getSeq() + "/";
        } else {
            realPath += "resources/noticeFile/" + entity.getSeq() + "/";
        }

        // // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
        File file = new File(realPath);
        if (!file.exists()) {
            // 저장 폴더가 존재하지 않는경우 만들어줌
            file.mkdir();
        }

        try {
            log.info(" notice save 성공 => " + Ntcservice.save(entity));
            message = "성공 했습니다.";
        } catch (Exception e) {
            log.info(" notice save Exception => " + e.toString());
            message = "실패 했습니다. 관리자에게 문의하세요.";
        }
        return message;
    }// noticeSave

}