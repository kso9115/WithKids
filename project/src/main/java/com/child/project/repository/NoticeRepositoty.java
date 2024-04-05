package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Notice;

public interface NoticeRepositoty extends JpaRepository<Notice, Integer> {

    @Query(value = "select * from notice order by emphasis DESC, seq DESC", nativeQuery = true)
    List<Notice> selectAll();

    @Query(value = "select * from notice order by emphasis DESC, seq DESC LIMIT :currPage, :rowPerPage", nativeQuery = true)
    List<Notice> selectPage(@Param("currPage") int currPage, @Param("rowPerPage") int rowPerPage);

    @Query(value = "select count(*) from notice", nativeQuery = true)
    int noticeCount();
}
