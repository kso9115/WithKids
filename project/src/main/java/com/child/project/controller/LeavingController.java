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
    
}
