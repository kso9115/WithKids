package com.child.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.child.project.entity.Notice;
import com.child.project.repository.NoticeRepositoty;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepositoty repository;

    @Override
    public List<Notice> findAll() {
        return repository.selectAll();
    }

    @Override
    public List<Notice> findSearch(Notice entity) {
        return repository.findSearch(entity.getRegdate(), entity.getRegdate2(),
                entity.getTitle(), entity.getEmphasis());
    }

    @Override
    public List<Notice> selectPage(int currPage, int rowPerPage, String word) {
        currPage = (currPage - 1) * rowPerPage;
        return repository.selectPage(currPage, rowPerPage, word);
    }

    @Override
    public Notice save(Notice entity) {
        log.info("** register : entity => " + entity);
        repository.save(entity); // 처리후 entity 를 return

        return entity;
    }

    @Override
    public int noticeCount(String word) {
        return repository.noticeCount(word);
    }

    @Override
    public void updateCnt(int seq, int cnt) {
        repository.updateCnt(seq, cnt);
    }

    @Override
    public Notice selectOne(int seq) {
        return repository.selectOne(seq);
    }
}
