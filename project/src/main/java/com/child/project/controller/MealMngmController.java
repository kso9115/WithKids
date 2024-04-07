package com.child.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.MealMngm;
import com.child.project.service.MealMngmService;


import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/meal")
@AllArgsConstructor
public class MealMngmController {

     MealMngmService mealService;

    // @GetMapping("/mealList")
    // public List<MealMngm> mealList() {
    //     List<MealMngm> mealList = mealService.selectList();
        
    //     log.info("meal List 요청까지 옴");

    //     return mealList;
    // }

    @GetMapping("/mealListYM")
    public List<MealMngm> mealListYM(@RequestParam("yearMonth") String yearMonth) {
        List<MealMngm> mealList = mealService.selectListYM(yearMonth);
        
        log.info("meal List  요청까지 옴 => " + yearMonth);

        return mealList;
    }

    @PostMapping("/Insert")
    public MealMngm Insert(@RequestBody MealMngm entity) {
        // log.info("brfInsert 요청까지 옴 111=> " + entity );
        // log.info("brfInsert 요청까지 옴 111=> " + entity.getBrfMeal() );

        MealMngm mealList = mealService.brfInsert(entity);
        
        // log.info("brfInsert 요청까지 옴 222=> " + mealList );

        return mealList;
    }
  
  
}
