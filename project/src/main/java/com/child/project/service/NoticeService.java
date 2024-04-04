package com.child.project.service;

import java.util.List;

import com.child.project.entity.Notice;

public interface NoticeService {

    List<Notice> findAll();

    Notice save(Notice entity);
}
