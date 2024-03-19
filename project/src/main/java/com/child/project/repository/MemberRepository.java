package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.Member;

public interface MemberRepository extends JpaRepository<Member,Long> {
    
}
