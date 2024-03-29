package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.child.project.entity.Attandance;
import com.child.project.entity.AttandanceId;


public interface AttandanceRepository extends JpaRepository<Attandance, AttandanceId>  {

    @Query(value = "select * from attandance order by mem_name", nativeQuery = true)
    List<Attandance> findAttList();

    // 월을 기준으로 데이터 전체 가져오기
    // @Query(value = "select * from attandance "
    // + "where substring(attandance_date, locate(\"-\",attandance_date)+1, 2) = (:month);", nativeQuery = true)
    // List<Attandance> findAttList(@Param("month")String month);

}
