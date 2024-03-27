package com.child.project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.MemLeaving;
import com.child.project.service.MemLeavingService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/lvn")
@AllArgsConstructor
public class LeavingController {

    MemLeavingService lvngService;

    @PostMapping("/lvngMemOne")
    public MemLeaving admMemOne(@RequestParam("memSerial") String memSerial) {
        MemLeaving lvngOne = lvngService.selectOne(memSerial);
        
        log.info("Leaving List 입소 아동 detail 확인 => " + lvngOne);

        return lvngOne;
    }

    @PostMapping("/insert")
    public String insert(@RequestBody MemLeaving entity) {
        String message="";
        log.info("컴포넌트는 들어오냐? " + entity);

        if(lvngService.save(entity) != null){
            try{
                message =" MemLeaving 추가 되었습니다.";
                log.info(" MemLeaving insert 성공 => " + lvngService.save(entity) );
            } catch (Exception e){
                message ="MemLeaving 추가되지 않았습니다. 관리자에게 문의해야 합니다.";
                log.info(" MemLeaving insert 실패(에러남) => " + e.toString() );
            }
        } else {
            message ="MemLeaving 추가되지 않았습니다. 입력하신 정보를 확인해주세요";
        }
        
        return message;
    }




    @PostMapping("/update")
    public String update(@RequestBody MemLeaving entity) {
        String message="";
        log.info("Update Controller까지는 옴?");


        if(lvngService.save(entity) != null){
            try{
                message =" MemLeaving 수정 되었습니다.";
                log.info(" MemLeaving Update 성공 => " + lvngService.save(entity) );
            } catch (Exception e){
                message ="MemLeaving 수정되지 않았습니다. 관리자에게 문의해야 합니다.";
                log.info(" MemLeaving Update 실패(에러남) => " + e.toString() );
            }
        } else {
            message ="MemLeaving 수정되지 않았습니다. 입력하신 정보를 확인해주세요";
        }
        
        return message;
    }



    @PostMapping("/delete")
    public String delete(@RequestBody MemLeaving entity) {
        String message="";

        log.info("Delete Controller까지는 옴?");

        if(lvngService.delete(entity)!=null){
            try {
                message =" MemLeaving 삭제 완료 !";
                log.info(" MemLeaving Update 성공 => " + entity.getMemSerial() );
                
            } catch (Exception e) {
                message ="MemLeaving 삭제 불가능. 관리자에게 문의해야 합니다.";
                log.info(" MemLeaving delete 실패(에러남) => " + e.toString() );
            }
        } else {
            message ="MemLeaving 삭제 불가능. 다시 한번 확인 부탁드립니다, ";
        }
        
        return message;
    }
    
}
