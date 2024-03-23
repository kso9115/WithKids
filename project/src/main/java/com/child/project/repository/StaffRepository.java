package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.child.project.domain.StaffDTO;

import com.child.project.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, String> {

    // @Query(value = "select a.*,b.staff_chl_cr,b.staff_cmn_mng,b.staff_cnt_mng \n" + //
    //         "from staff a left join staff_prv b \n" + //
    //         "    on a.staff_pst = b.staff_pst", nativeQuery = true)
    @Query("SELECT new com.child.project.domain.StaffDTO(a.*,b.staff_chl_cr,b.staff_cmn_mng,b.staff_cnt_mng) FROM Staff a LEFT JOIN StaffPrv b ON a.staff_pst = b.staff_pst")
    List<StaffDTO> findJoinAll();
}
