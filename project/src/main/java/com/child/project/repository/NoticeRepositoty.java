package com.child.project.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Notice;

public interface NoticeRepositoty extends JpaRepository<Notice, Integer> {

        // @Query(value = "select * from notice order by emphasis DESC, seq DESC",
        // nativeQuery = true)
        @Query(value = "select new Notice(seq,title,regdate) from Notice order by emphasis DESC, seq DESC")
        List<Notice> selectAll();

        @Query(value = "select * from notice where STR_TO_DATE(regdate, '%Y-%m-%d') between STR_TO_DATE(:regdate, '%Y-%m-%d') and STR_TO_DATE(:regdate2, '%Y-%m-%d') "
                        + "and title like CONCAT('%',:title,'%') and emphasis like CONCAT('%',:emphasis,'%') "
                        + "order by emphasis DESC, seq DESC", nativeQuery = true)
        List<Notice> findSearch(@Param("regdate") String regdate, @Param("regdate2") String regdate2,
                        @Param("title") String title, @Param("emphasis") Integer emphasis);

        @Query(value = "select * from notice where seq=:seq order by emphasis DESC, seq DESC", nativeQuery = true)
        Notice selectOne(@Param("seq") int seq);

        @Query(value = "select * from notice where title like CONCAT('%',:word,'%')"
                        + " order by emphasis DESC, seq DESC LIMIT :currPage, :rowPerPage", nativeQuery = true)
        // @Query(value = "select new Notice(seq,title,regdate,cnt,emphasis) from Notice
        // where title like CONCAT('%',:word,'%')"
        // + " order by emphasis DESC, seq DESC LIMIT :currPage, :rowPerPage")
        List<Notice> selectPage(@Param("currPage") int currPage, @Param("rowPerPage") int rowPerPage,
                        @Param("word") String word);

        @Query(value = "select count(*) from notice where title like CONCAT('%',:word,'%') ", nativeQuery = true)
        int noticeCount(@Param("word") String word);

        @Modifying
        @Transactional
        @Query(value = "update notice set cnt=:cnt where seq=:seq", nativeQuery = true)
        void updateCnt(@Param("seq") int seq, @Param("cnt") int cnt);
}
