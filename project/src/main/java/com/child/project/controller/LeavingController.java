package com.child.project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.MemLeaving;
import com.child.project.service.MemLeavingService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/lvng")
@AllArgsConstructor
public class LeavingController {

    MemLeavingService lvngService;

    @GetMapping("/lvngMemOne")
    public MemLeaving admMemOne(@RequestParam("memSerial") String memSerial) {
        MemLeaving lvngOne = lvngService.selectOne(memSerial);
        
        log.info("Leaving List 입소 아동 detail 확인 => " + lvngOne);

        return lvngOne;
    }
}
