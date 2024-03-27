package com.child.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Education;
import com.child.project.entity.Member;
import com.child.project.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Log4j2
@RestController
@RequestMapping(value = "/api/mem")
@AllArgsConstructor
public class MemberController {

    MemberService memService;

    // 파라미터로 데이터를 전달하는게 아니니까 get매핑 사용해도 무방
    @GetMapping("/memList")
    public List<Member> memList() {
        log.info("memList확인");
        List<Member> list = memService.selectList();

        // log.info("memList확인" + list); // 넘어오는거 확인함

        return list;
    }

    // @GetMapping("/memEduList")
    // public List<Education> selectEduList() {
    // log.info("memEduList 확인");
    // List<Education> list = memService.selectEduList();

    // // log.info("memEduList 확인" + list);

    // return list;
    // }

    // Get방식 하나의 Edu 데이터 전달
    // @GetMapping("/memSelectOneEdu")
    // public Education selectEduData(@RequestParam("memSerial") String memSerial) {
    // log.info("11111111111111111111111");
    // Education selectOneEdu = memService.selectEduData(memSerial);
    // return selectOneEdu;
    // }

    // Post방식 하나의 Edu 데이터 전달 : Education타입의 바디에 담아서 전달
    @PostMapping("/memSelectOneEdu")
    public Education selectEduData(@RequestBody Education entity) {
        log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&오냐?");

        // String memSerial = entity.getMemSerial(); // memSerial 파라미터 값 저장
        Education selectOneEdu = memService.selectEduData(entity.getMemSerial());
        return selectOneEdu;
    }

    // 안씀;
    @GetMapping("/memSelectOne")
    public Member selectOne(@RequestParam("memSerial") String memSerial) {
        Member selectOneMembers = memService.selectOne(memSerial);
        return selectOneMembers;
    }

    @PostMapping("/memDelete")
    public String deleteMemByMemserial(@RequestParam("memSerial") String memSerial) {

        String message = "";

        try {
            memService.deleteMemByMemserial(memSerial);
            message = "삭제 성공";
        } catch (Exception e) {
            log.info("member delete Exception" + e.toString());
            message = "삭제 실패";
        }

        return message;
    }

    // Member 엔티티, memSerial 가져올 entity추가
    @PostMapping("/memInesert")
    public String memInsert(@RequestBody Member entity) {
        String message = "";
        // log.info("데이터 전달되는 부분 확인");
        // log.info("entity 값을 확인해보자" + entity);
        // log.info("넘어오나?" + entity.getMemSerial());
        
        
        
        // save하려는 값이 없으면 실행x
            try {
                // if (memService.save(entity) != null) {

                // }

                // 초기 기본 비밀번호 설정을 위한 값 부여
                entity.setMemLoginPW("12345!");
                entity.setMemRegisterDate("2023-03-26");
                memService.save(entity);
                
                 // 파라미터 값 저장
                // log.info("member insert 성공 => " + memService.save(memEntity)); // 넘어오는거 확인완
                
                message = "아동 추가 입력 성공";
            } catch (Exception e) {
                log.info("member insert 실패 => " + e.toString());
                message = "아동 추가 입력 실패";
            }
      
        return message;
    }
    
    // Education 엔티티에 접근
    @PostMapping("/memEduInesert")
    public String memEduInsert(@RequestBody Education entity) {
        String message = "";
        log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%데이터 전달되는 부분 확인");
        // log.info("entity 값을 확인해보자" + entity);
        // log.info("넘어오나?" + entity.getMemSerial());
        log.info(entity);
            try {
                
                memService.save(entity);
                // entity.setMemRegisterDate("2023-03-26");
                // memService.save(entity);
                
                 // 파라미터 값 저장
                // log.info("member insert 성공 => " + memService.save(memEntity)); // 넘어오는거 확인완
                
                message = "아동 추가 입력 성공";
            } catch (Exception e) {
                log.info("member insert 실패 => " + e.toString());
                message = "아동 추가 입력 실패";
            }
      
        return message;
    }

    @GetMapping("/memSearch")
    public List<Member> memSearch(Member entity) {
        List<Member> list= memService.searchList(entity);
        return list;
    }
    

    @PostMapping("/eduDelete")
    public String deleteEduByMemserial(@RequestParam("memSerial") String memSerial) {

        String message = "";

        try {
            memService.deleteEduByMemserial(memSerial);
            message = "삭제 성공";
        } catch (Exception e) {
            log.info("member delete Exception" + e.toString());
            message = "삭제 실패";
        }

        return message;
    }
}
