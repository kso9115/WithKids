package com.child.project.service;

import java.util.List;

import com.child.project.entity.MealMngm;
import com.child.project.entity.MealMngmId;

// import com.child.project.repository.MealMngmRepository;

public interface MealMngmService {
    List<MealMngm> selectList();

    // MealMngm selectOne(MealMngmId mealMngmId);
    
}
