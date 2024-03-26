package com.child.project.service;

import com.child.project.entity.MemAdmission;
import com.child.project.entity.MemLeaving;

public interface MemLeavingService {
    MemLeaving selectOne(String memSerial);

    MemLeaving save(MemLeaving entity);

    MemLeaving delete(MemLeaving entity);
}
