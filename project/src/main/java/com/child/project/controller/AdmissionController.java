package com.child.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.MemAdmission;
import com.child.project.service.MemAdmissionService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@Log4j2
@RestController
@RequestMapping(value = "/api/adm")
@AllArgsConstructor
public class AdmissionController {

    MemAdmissionService admService;

    @GetMapping("/admMem")
    public List<MemAdmission> admMem(){
        List<MemAdmission> list = admService.selectList();

        // log.info("admission List 입소 아동들 확인 " + list);
        
        return list;
    }


    @GetMapping("/admMemOne")
    public MemAdmission admMemOne(@RequestParam("memSerial") String memSerial) {
        log.info("memSerial" + memSerial);
        MemAdmission admOne;
        try {
            admOne = admService.selectOne(memSerial);
        } catch (Exception e) {
            admOne = null;
        }
        
        
        //  log.info("admission List 입소 아동 detail 확인 => " + admOne);
        // log.info("admission List 입소 아동 getMemSerial 확인 =>" + admOne.getMemSerial());

        return admOne;
    }
    

    @PostMapping("/admInsert")
    public String admInsert(@RequestBody MemAdmission entity) {
        String message="";
        log.info("컴포넌트는 들어오냐? " + entity);

        if(admService.save(entity) != null){
            try{
                message =" MemAdmission 추가 되었습니다.";
                log.info(" MemAdmission insert 성공 => " + admService.save(entity) );
            } catch (Exception e){
                message ="MemAdmission 추가되지 않았습니다. 관리자에게 문의해야 합니다.";
                log.info(" MemAdmission insert 실패(에러남) => " + e.toString() );
            }
        } else {
            message ="MemAdmission 추가되지 않았습니다. 입력하신 정보를 확인해주세요";
        }
        
        return message;
    }
    


}
