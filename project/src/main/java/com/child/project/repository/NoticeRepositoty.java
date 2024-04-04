package com.child.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.child.project.entity.Notice;

public interface NoticeRepositoty extends JpaRepository<Notice, Integer> {

}
