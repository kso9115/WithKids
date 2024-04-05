package com.child.project.service;

import java.util.List;

import com.child.project.entity.MealMngm;
import com.child.project.entity.MealMngmId;

// import com.child.project.repository.MealMngmRepository;

public interface MealMngmService {
    List<MealMngm> selectList();

    List<MealMngm> selectListYM(String yearMonth);
    // MealMngm selectOne(MealMngmId mealMngmId);

    List<MealMngm> searchList(String meal_date,String arr);
    // 근데 생각해보니 두개를 합쳐서 전달해야 하는 거 아닌가... 흠...
    
    
}
