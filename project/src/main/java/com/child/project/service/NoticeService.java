package com.child.project.service;

import java.util.List;

import com.child.project.entity.Notice;

public interface NoticeService {

    List<Notice> findAll();

    List<Notice> selectPage(int currPage, int rowPerPage);

    Notice save(Notice entity);

    int noticeCount();
}
