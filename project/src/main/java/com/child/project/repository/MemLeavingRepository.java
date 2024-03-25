package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.MemLeaving;

public interface MemLeavingRepository  extends JpaRepository<MemLeaving, String>{

}
