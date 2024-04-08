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

    @Query(value = "select * from meal_mngm where substr(meal_date,1,7)=(:meal_date)", nativeQuery = true)
    List<MealMngm> selectListYM(@Param("meal_date") String meal_date);

    // 사용자가 직접 클릭한 조식 
    // @Query(value = "insert into mealMngm(mem_serial, meal_date, mem_name, staff_nm, brf_meal) " +
    //     "value(:mem_serial, :meal_date, :mem_name, :staff_nm , :brf_meal)", nativeQuery = true)
    // MealMngm save(@Param("mem_serial") String mem_serial, @Param("meal_date") String meal_date, @Param("mem_name") String mem_name,
    //                     @Param("staff_nm") String staff_nm , @Param("brf_meal") int brf_meal) ; 


    // MealMngm save(@Param("mem_serial") String mem_serial, @Param("meal_date") String meal_date, @Param("mem_name") String mem_name,
                        // @Param("staff_nm") String staff_nm , @Param("brf_meal") int brf_meal);
}
