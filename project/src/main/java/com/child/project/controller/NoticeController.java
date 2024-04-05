package com.child.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public String noticeSave(@RequestBody Notice entity) {
        String message = "";
        try {
            log.info(" notice save 성공 => " + service.save(entity));
            message = "성공 했습니다.";
        } catch (Exception e) {
            log.info(" notice save Exception => " + e.toString());
            message = "실패 했습니다. 관리자에게 문의하세요.";
        }
        return message;
    }// noticeSave

    @GetMapping("/noticeCount")
    public int noticeCount(@RequestParam("word") String word) {
        return service.noticeCount(word);
    }// noticeCount

}
