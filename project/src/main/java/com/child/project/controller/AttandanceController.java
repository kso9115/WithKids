package com.child.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Attandance;
import com.child.project.service.AttandanceService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/att")
@AllArgsConstructor
public class AttandanceController {

    AttandanceService attService;

    // 출석부 리스트 출력 : 쿼리문 및 front에서 1인당
    // @GetMapping("/attList")
    // public List<Attandance> attList(){
    // log.info("출석 리스트 확인 attList 확인");
    // // if (attService.selectList() == null) {
    // // log.error("AttandanceService가 주입되지 않았습니다.");
    // // throw new IllegalStateException("AttandanceService가 주입되지 않았습니다.");
    // // }
    // List<Attandance> list = attService.selectList();
    // log.info("attList확인!!!!!!!!!!!!!!!!!!!!!" +list);

    // return list;
    // }

    // 1. 출석부 리스트 출력 : 전체 리스트 뽑기
    // @GetMapping("/attList")
    // public List<Attandance> attList(@RequestParam("month") String month){
    // log.info("출석 리스트 확인 attList 확인");
    // // if (attService.selectList() == null) {
    // // log.error("AttandanceService가 주입되지 않았습니다.");
    // // throw new IllegalStateException("AttandanceService가 주입되지 않았습니다.");
    // // }
    // List<Attandance> list = attService.selectList(month);
    // log.info("attList확인!!!!!!!!!!!!!!!!!!!!!" +list);

    // return list;
    // }

    @GetMapping("/attList")
    public List<Attandance> attList() {
        log.info("새로운 레포지토리로 들어오나?");
        List<Attandance> list = attService.selectList3();
        log.info(list);
        return list;
    }

}