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

    // Meal 에 대한 data를 chart 그리기 위해서 다듬는 과정. 
//    c("SELECT new com.child.project.domain.mealDTO(SELECT COUNT(substr(mealDate,1,7)) FROM mealMngm AS B WHERE brfMeal=1 AND substr(A.mealDate,1,7) = substr(B.mealDate,1,7)) AS brfMeal,"
//    		+ "(SELECT COUNT(substr(mealDate,1,7)) FROM mealMngm AS B WHERE lncMeal=1 AND substr(A.mealDate,1,7) = substr(B.mealDate,1,7)) AS lncMeal, "
//    		+ "(SELECT COUNT(substr(mealDate,1,7)) FROM mealMngm AS B WHERE dnrMeal=1 AND substr(A.mealDate,1,7) = substr(B.mealDate,1,7)) AS dnrMeal, "
//    		+ "(SELECT COUNT(substr(mealDate,1,7)) FROM mealMngm AS B WHERE snkMeal=1 AND substr(A.mealDate,1,7) = substr(B.mealDate,1,7)) AS snkMeal "
//    		+ "FROM mealMngm AS A "
//    		+ "GROUP BY substr(A.mealDate,1,7) "
//    		+ "ORDER BY substr(A.mealDate,1,7)")
    @Query(value = "select (\r\n"
    		+ "    select count(substr(meal_date,1,7)) \r\n"
    		+ "    from meal_mngm as B\r\n"
    		+ "    where brf_meal=1\r\n"
    		+ "    and substr(A.meal_date,1,7) = substr(B.meal_date,1,7)\r\n"
    		+ ") as brf_meal\r\n"
    		+ "from meal_mngm as A\r\n"
    		+ "group by substr(A.meal_date,1,7)\r\n"
    		+ "order by substr(A.meal_date,1,7)", nativeQuery = true)
    List<Integer> selectChartdata1();
    
    @Query(value = "select (\r\n"
    		+ ",(\r\n"
    		+ "    select count(substr(meal_date,1,7)) \r\n"
    		+ "    from meal_mngm as B\r\n"
    		+ "    where lnc_meal=1\r\n"
    		+ "    and substr(A.meal_date,1,7) = substr(B.meal_date,1,7)\r\n"
    		+ ") as lnc_meal\r\n"

    		+ "from meal_mngm as A\r\n"
    		+ "group by substr(A.meal_date,1,7)\r\n"
    		+ "order by substr(A.meal_date,1,7)", nativeQuery = true)
    List<Integer> selectChartdata2();
    
    @Query(value = "select (\r\n"
    		+ ",(\r\n"
    		+ "    select count(substr(meal_date,1,7)) \r\n"
    		+ "    from meal_mngm as B\r\n"
    		+ "    where dnr_meal=1\r\n"
    		+ "    and substr(A.meal_date,1,7) = substr(B.meal_date,1,7)\r\n"
    		+ ") as dnr_meal\r\n"
    		+ "from meal_mngm as A\r\n"
    		+ "group by substr(A.meal_date,1,7)\r\n"
    		+ "order by substr(A.meal_date,1,7)", nativeQuery = true)
    List<Integer> selectChartdata3();
    
    @Query(value = "select (\r\n"
    		+ ",(\r\n"
    		+ "    select count(substr(meal_date,1,7)) \r\n"
    		+ "    from meal_mngm as B\r\n"
    		+ "    where snk_meal=1\r\n"
    		+ "    and substr(A.meal_date,1,7) = substr(B.meal_date,1,7)\r\n"
    		+ ") as snk_meal\r\n"
    		+ "from meal_mngm as A\r\n"
    		+ "group by substr(A.meal_date,1,7)\r\n"
    		+ "order by substr(A.meal_date,1,7)", nativeQuery = true)
    List<Integer> selectChartdata4();
}
