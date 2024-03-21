package com.child.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Member;
import com.child.project.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

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
    
        log.info("memList확인"+list);
    

        return list;
    }

}
