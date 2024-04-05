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

}
