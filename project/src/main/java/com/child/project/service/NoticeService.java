package com.child.project.service;

import java.util.List;

import com.child.project.entity.Notice;

public interface NoticeService {

    List<Notice> findAll();

    List<Notice> selectPage(int currPage, int rowPerPage, String word);

    Notice save(Notice entity);

    int noticeCount(String word);

    void updateCnt(int seq, int cnt);

    Notice selectOne(int seq);
}
