package com.child.project.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.domain.AttandanceDTO;
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

    // list가져오기
    @GetMapping("/attList")
    public List<Attandance> attList(@RequestParam("yearMonth") String yearMonth) {
        log.info(attService.selectList3(yearMonth));
        List<Attandance> list = attService.selectList3(yearMonth);
        log.info("멤버리스트 출력하는 레포지토리 쿼리 소환"+list);
        
        
        // log.info(list); //잘와유
        return list;
    }

    @PostMapping("/attChange")
    public String attSave(@RequestBody Attandance entity) {
        String message = "";
        
        log.info(entity);

        try {
            attService.attSave(entity);
            message = "추가 성공";
        } catch (Exception e) {
            log.info(e.toString());
            message = "추가 실패";
        }

        return message;
    }

    @PostMapping("/attInsert")
    public String postMethodName(@RequestBody Attandance entity) {
        String message = "";

        // String ipAdress = request.getRemoteAddr();
        // // 마지막 점('.')의 인덱스를 찾음https://apis.map.kakao.com/web/news
        // int lastIndex = ipAdress.lastIndexOf('.');
        // String subnet = ipAdress.substring(0, lastIndex + 1); // 마지막 점('.') 포함

        // log.info(entity.get);
        String latitude = entity.getLatitude().substring(0,4);
        String longitude = entity.getLongitude().substring(0, 5);

        if(latitude.equals("37.3") && longitude.equals("127.1")){
            try {
                log.info(attService.attInsert(entity));
                attService.attInsert(entity);
                message = "출력 성공";
            } catch (Exception e) {
                message = "출석 실패 : 위치를 확인해주세요";
                log.info(e.toString());
            }
        }
        return message;
    }

    // @GetMapping("/attCount")
    // public Integer attCount(Attandance entity) {
    //     log.info("멤버시리얼 넘어오낭~~~~~~~~~~~~~~~~~~~~~~~~~"+entity.getMemSerial());
    //     return attService.attcount(entity.getMemSerial());
    // }
    
    @GetMapping("/attCount")
    public List<Integer> attandanceCount(@RequestParam("attandanceDate") String attandanceDate) {

        List<Integer> list = attService.attandanceCount(attandanceDate);

        return list;
    }
}