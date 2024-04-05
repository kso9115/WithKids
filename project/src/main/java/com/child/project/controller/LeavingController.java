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
    public MemLeaving admMemOne(@RequestBody MemLeaving entity) {
        MemLeaving lvngOne = lvngService.selectOne(entity.getMemSerial());
        
        log.info("Leaving List 입소 아동 detail 확인 => " + lvngOne);

        return lvngOne;
    }

    @PostMapping("/insert")
    public MemLeaving insert(@RequestBody MemLeaving entity) {
        MemLeaving lvngOne = lvngService.save(entity) ;
        log.info("컴포넌트는 들어오냐? " + entity);

        if(lvngOne != null){
            try{
                log.info(" MemLeaving insert 성공 => " + lvngService.save(entity) );
            } catch (Exception e){
                log.info(" MemLeaving insert 실패(에러남) => " + e.toString() );
            }
        }
        
        return lvngOne;
    }




    @PostMapping("/update")
    public MemLeaving update(@RequestBody MemLeaving entity) {
        MemLeaving lvngOne = lvngService.save(entity) ;
        log.info("Update Controller까지는 옴?");


        if(lvngOne != null){
            try{
                log.info(" MemLeaving Update 성공 => " + lvngService.save(entity) );
            } catch (Exception e){
                log.info(" MemLeaving Update 실패(에러남) => " + e.toString() );
            }
        } 
        
        return lvngOne;
    }



    @PostMapping("/delete")
    public MemLeaving delete(@RequestBody MemLeaving entity) {
        MemLeaving lvngOne = lvngService.delete(entity) ;

        // log.info("Delete Controller까지는 옴?");
        
        log.info(" MemLeaving delete 성공 => " + lvngOne ); 
        
        return lvngOne;
    }
    
}
