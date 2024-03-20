package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.Member;

public interface MemberRepository extends JpaRepository<Member,String> {
    

    // List<Member> findAll();
    // List<Member> findbyMembers(long mem_serial);

}
