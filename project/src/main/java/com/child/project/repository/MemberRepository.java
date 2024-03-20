package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.Member;

<<<<<<< HEAD
public interface MemberRepository extends JpaRepository<Member, String> {
=======
public interface MemberRepository extends JpaRepository<Member,String> {
    
>>>>>>> kso

    // List<Member> findAll();
    // List<Member> findbyMembers(long mem_serial);

}
