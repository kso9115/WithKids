package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

import com.child.project.entity.MealMngm;
import com.child.project.entity.MealMngmId;

public interface MealMngmRepository extends JpaRepository<MealMngm,MealMngmId> {
    
    List<MealMngm> findAll();
}
