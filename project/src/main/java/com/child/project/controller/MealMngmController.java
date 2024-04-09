package com.child.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.MealMngm;
import com.child.project.entity.MealMngmId;
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
    // List<MealMngm> mealList = mealService.selectList();

    // log.info("meal List 요청까지 옴");

    // return mealList;
    // }

    @GetMapping("/mealListYM")
    public List<MealMngm> mealListYM(@RequestParam("yearMonth") String yearMonth) {
        List<MealMngm> mealList = mealService.selectListYM(yearMonth);

        log.info("meal List  요청까지 옴 => " + yearMonth);

        return mealList;
    }

    @PostMapping("/Insert")
    public MealMngm Insert(@RequestBody MealMngm entity, MealMngmId entityId) {
        // log.info("brfInsert 요청까지 옴 111=> " + entity);
       
        entityId.setMemSerial(entity.getMemSerial());
        entityId.setMealDate(entity.getMealDate());
        

        MealMngm mealOne = mealService.selectOne(entityId); 

        if(mealOne!=null){ // 데이터가 하나라도 입력 되어 있는 경우

            if (entity.getBrfMeal() == 1)
                mealOne.setBrfMeal(entity.getBrfMeal());
            if (entity.getLncMeal() == 1)
                mealOne.setLncMeal(entity.getLncMeal());
            if (entity.getDnrMeal() == 1)
                mealOne.setDnrMeal(entity.getDnrMeal());
            if (entity.getBrfMeal() == 1)
                mealOne.setSnkMeal(entity.getSnkMeal());
                
            return mealService.mealInsert(mealOne);

        } else { // 데이터가 없는 경우 
            
            return mealService.mealInsert(entity);
        }


        // log.info("brfInsert 요청까지 옴 222=> " + mealList );

        // return entity;
        
    }

    @PostMapping("/MInsert")
    public MealMngm MInsert(@RequestBody MealMngm entity) {
        // log.info("MInsert 요청까지 옴 111=> " + entity);
 
        MealMngm mealListO = mealService.mnInsert(entity);


        return mealListO;


    }

}
