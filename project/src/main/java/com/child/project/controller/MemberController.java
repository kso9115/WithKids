package com.child.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Member;
import com.child.project.service.MemberService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping(value = "/api/mem")
@AllArgsConstructor
public class MemberController {

    MemberService memService;

    @GetMapping("/memList")
    public List<Member> memList() {
        List<Member> list = memService.selectList();

		return list;
    }
    
    
}
