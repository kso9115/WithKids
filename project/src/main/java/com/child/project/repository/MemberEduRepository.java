package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.Education;

public interface MemberEduRepository extends JpaRepository<Education,String> {
    
}
