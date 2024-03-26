package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.StaffAtn;
import com.child.project.entity.StaffAtnId;

public interface StaffAtnRepository extends JpaRepository<StaffAtn, StaffAtnId> {

    @Query(value = "select * from staff_atn where staff_id = :staff_id", nativeQuery = true)
    List<StaffAtn> findAtnId(@Param("staff_id") String staffId);
}
