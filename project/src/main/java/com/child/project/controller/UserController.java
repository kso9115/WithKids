package com.child.project.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.ProgramApplication;
import com.child.project.service.ProgramService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Log4j2
@RestController
@RequestMapping(value = "/api/user")
@AllArgsConstructor // 개별적으로 @Autowired 하지않아도 된다. 생략가능
public class UserController {

    ProgramService prgService;

    @GetMapping("/aplCheck")
    public String aplCheck() {

        return "imp61108033";
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
