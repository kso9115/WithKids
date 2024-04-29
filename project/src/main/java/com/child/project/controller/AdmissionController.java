package com.child.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.MemAdmission;
import com.child.project.entity.Member;
import com.child.project.service.MemAdmissionService;
import com.child.project.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@Log4j2
@RestController
@RequestMapping(value = "/api/adm")
@AllArgsConstructor
public class AdmissionController {

    MemAdmissionService admService;
    // searchBox 에서의 반환 값은 member임 
    // MemberService memService; 하여 호출 하여야 하지만, 
    // 페이지 제작상 불편하니, admService 에서 만들어 작성함. 

    @PostMapping("/admMem")
    public List<MemAdmission> admMem(){
        List<MemAdmission> list = admService.selectList();

        // log.info("admission List 입소 아동들 확인 " + list);
        
        return list;
    }

    @PostMapping("/admMemOne")
    public MemAdmission admMemOne(@RequestBody MemAdmission entity) {
        log.info("memSerial" + entity.getMemSerial());
        MemAdmission admOne;
        try {
            admOne = admService.selectOne(entity.getMemSerial());
        } catch (Exception e) {
            admOne = null;
        }
        
        
        //  log.info("admission List 입소 아동 detail 확인 => " + admOne);
        // log.info("admission List 입소 아동 getMemSerial 확인 =>" + admOne.getMemSerial());

        return admOne;
    }

    //searchBoX mapping
    @GetMapping("/admSearch")
    public List<Member> admSearch(Member entity){
        log.info("searchBox Controller 맵핑됨 => "+ entity);

        List<Member> list = admService.findSearch(entity);

        return list;
    }
}
