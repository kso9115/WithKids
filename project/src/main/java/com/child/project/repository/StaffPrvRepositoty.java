package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.child.project.entity.StaffPrv;

public interface StaffPrvRepositoty extends JpaRepository<StaffPrv, String> {

    @Query(value = "select * from staff_prv where not staff_pst = 'master'", nativeQuery = true)
    List<StaffPrv> findPrvAll();

}