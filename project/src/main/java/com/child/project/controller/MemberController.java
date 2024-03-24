package com.child.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Member;
import com.child.project.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Log4j2
@RestController
@RequestMapping(value = "/api/mem")
@AllArgsConstructor
public class MemberController {

    MemberService memService;

    @GetMapping("/memList")
    public List<Member> memList() {
        log.info("memList확인");
        List<Member> list = memService.selectList();

        // log.info("memList확인" + list); // 넘어오는거 확인함

        return list;
    }

    @GetMapping("/memSelectOne")
    public Member selectOne(@RequestParam("memSerial") String memSerial) {
        Member selectOneMembers = memService.selectOne(memSerial);
        return selectOneMembers;

    }

    @PostMapping("/memDelete")
    public String deleteByMemserial(@RequestParam("memSerial") String memSerial) {

        String message = "";

        try {
            memService.deleteByMemserial(memSerial);
            message = "삭제 성공";
        } catch (Exception e) {
            log.info("member delete Exception" + e.toString());
            message = "삭제 실패";
        }

        return message;
    }

    @PostMapping("/memInesert")
    public String memInsert(Member memEntity, @RequestParam("memSerial") String memSerial) {
        String message = "";
        try {
            log.info("넘어오나?" + memSerial);
            // log.info("member insert 성공 => " + memService.save(memEntity)); // 넘어오는거 확인완
            memService.save(memEntity);
            message = "아동 추가 입력 성공";
        } catch (Exception e) {
            log.info("member insert 성공 => " + e.toString());
            message = "아동 추가 입력 실패";
        }
        return message;
    }
}
