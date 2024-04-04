package com.child.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Notice;
import com.child.project.service.NoticeService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/notice")
@AllArgsConstructor
public class NoticeController {

    NoticeService service;

    @GetMapping("/noticeList")
    public List<Notice> noticeList() {
        return service.findAll();
    }
}
