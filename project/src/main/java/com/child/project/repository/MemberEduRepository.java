package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Education;

public interface MemberEduRepository extends JpaRepository<Education, String> {

    @Query(value = "select * from mem_education where mem_serial = :mem_serial", nativeQuery = true)
    Education selectEduMember(@Param("mem_serial") String memSerial);
}
