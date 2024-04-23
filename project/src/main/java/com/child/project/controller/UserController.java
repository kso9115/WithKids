package com.child.project.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.ProgramApplication;
import com.child.project.entity.ProgramApplicationId;
import com.child.project.service.ProgramService;
import com.google.gson.JsonObject;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.web.bind.annotation.GetMapping;

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
        // entityId.setMemSerial(entity.getMemSerial());
        // entityId.setPrgId(entity.getPrgId());
        // log.info(" ProgramApplication ID => " +
        // prgService.MemAplCk(entity.getMemSerial(), entity.getPrgId()));
        if (prgService.MemAplCk(entity.getMemSerial(), entity.getPrgId()) == 0) {
            try {
                log.info(" ProgramApplication Save 성공 => " + prgService.aplSave(entity));
                return "신청이 완료 되었습니다.";
            } catch (Exception e) {
                log.info(" ProgramApplication Save Exception => " + e.toString());
                return "신청에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else {
            return "이미 신청한 프로젝트 입니다.";
        }

    } // aplSave

    @PostMapping("/prgCnclt")
    public String prgCnclt(@RequestBody ProgramApplication entity) {
        if (entity.getCnclt() == 0) {
            try {
                if ("유료".equals(entity.getCostClsfc())) {
                    String token = prgService.getToken("6734840681387581",
                            "8U9YFQL5IQDVo9qGj7q2YmySxkPinUJMKvTzjMKQvxI3j5aeJst4YE6mPnUQdriDQYhrZdkKTbvtNDm7");
                    if (!"0".equals( prgService.refundRequest(token, entity.getImpUid(), "프로그램 취소") ) ) 
                        return "취소에 실패 했습니다. 관리자에게 문의하세요.";
                }
                log.info(" ProgramApplication update 성공 ");
                prgService.prgCnclt(entity);
                return "취소가 완료 되었습니다.";
            } catch (Exception e) {
                log.info(" ProgramApplication Save Exception => " + e.toString());
                return "취소에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else {
            return "이미 취소된 프로젝트입니다.";
        }

    } // prgCnclt
}
