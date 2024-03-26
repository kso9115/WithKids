package com.child.project.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.child.project.entity.Member;

public interface MemberRepository extends JpaRepository<Member,String> {


    // List<Member> findAll();
    // List<Member> findbyMembers(long mem_serial);
    // JPQL : Entity 접근
    // @Query("insert member")

    

}