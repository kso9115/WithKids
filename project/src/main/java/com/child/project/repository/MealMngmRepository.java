package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.MealMngm;
import com.child.project.entity.MealMngmId;

public interface MealMngmRepository extends JpaRepository<MealMngm,MealMngmId> {
    
    List<MealMngm> findAll();

    @Query(value = "select * from mealMngm where substr(meal_date,1,7)=(:meal_date)", nativeQuery = true)
    List<MealMngm> selectListYM(@Param("meal_date") String meal_date);

    @Query(value = "select (:brf_meal) , (:lnc_meal), (:dnr_meal), (:snk_meal) from mealMngm where brf_meal is not null and lnc_meal is not null and dnr_meal is not null and snk_meal is not null" , nativeQuery = true)
    List<MealMngm> searchList(@Param("brf_meal") String brf_meal, @Param("lnc_meal") String lnc_meal, @Param("dnr_meal") String dnr_meal, @Param("snk_meal") String snk_meal);
}
