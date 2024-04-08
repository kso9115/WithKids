package com.child.project.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Notice;

public interface NoticeRepositoty extends JpaRepository<Notice, Integer> {

    @Query(value = "select * from notice order by emphasis DESC, seq DESC", nativeQuery = true)
    List<Notice> selectAll();

    @Query(value = "select * from notice where title like CONCAT('%',:word,'%') order by emphasis DESC, seq DESC LIMIT :currPage, :rowPerPage", nativeQuery = true)
    List<Notice> selectPage(@Param("currPage") int currPage, @Param("rowPerPage") int rowPerPage,
            @Param("word") String word);

    @Query(value = "select count(*) from notice where title like CONCAT('%',:word,'%') ", nativeQuery = true)
    int noticeCount(@Param("word") String word);

    @Modifying
	@Transactional
	@Query(value = "update notice set cnt=:cnt where seq=:seq", nativeQuery = true)
    void updateCnt(@Param("seq") int seq, @Param("cnt") int cnt);
}
