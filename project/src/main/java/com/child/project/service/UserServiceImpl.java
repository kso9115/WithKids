package com.child.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.child.project.entity.Program;
import com.child.project.repository.ProgramRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ProgramRepository prgRepository;

    @Override
    public List<?> xssDownload(String name) {
        switch (name) {
            case "program":

                return prgRepository.dataAll();

            default:
                return null;
        }
    }

}
