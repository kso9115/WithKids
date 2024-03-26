package com.child.project.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.domain.StaffDTO;

import com.child.project.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, String> {

    // @Query(value = "select a.*,b.staff_chl_cr,b.staff_cmn_mng,b.staff_cnt_mng \n"
    // + //
    // "from staff a left join staff_prv b \n" + //
    // " on a.staff_pst = b.staff_pst", nativeQuery = true)
    @Query("SELECT new com.child.project.domain.StaffDTO(a.staffPst,a.staffNm,a.staffId,a.staffPhnn,a.staffLeave,a.staffLvdy,a.rmr,"
            + "b.staffChlCr,b.staffCmnMng,b.staffCntMng) FROM Staff a LEFT JOIN StaffPrv b ON a.staffPst=b.staffPst WHERE NOT a.staffId='master'")
    List<StaffDTO> findJoinAll();

    @Query("SELECT new com.child.project.domain.StaffDTO(a.staffPst,a.staffNm,a.staffId,a.staffPhnn,a.staffLeave,a.staffLvdy,a.rmr,"
            + "b.staffChlCr,b.staffCmnMng,b.staffCntMng) FROM Staff a LEFT JOIN StaffPrv b ON a.staffPst=b.staffPst WHERE NOT a.staffId='master' "
            + "and a.staffPst like CONCAT('%',:staffPst,'%') and a.staffNm like CONCAT('%',:staffNm,'%') and a.staffId like CONCAT('%',:staffId,'%') and a.staffPhnn like CONCAT('%',:staffPhnn,'%')")
    List<StaffDTO> findSearch(@Param("staffPst") String staffPst, @Param("staffNm") String staffNm,
            @Param("staffId") String staffId, @Param("staffPhnn") String staffPhnn);

    @Query(value = "select * from staff where staff_id=:staff_id", nativeQuery = true)
    Staff findOne(@Param("staff_id") String staffId);

    @Modifying
    @Transactional
    @Query(value = "update staff set staff_psw=:staff_psw where staff_id=:staff_id", nativeQuery = true)
    void updataPassword(@Param("staff_id") String staffId, @Param("staff_psw") String staffPsw);

    @Query(value = "select count(*) from staff where staff_id=:staff_id", nativeQuery = true)
    int countId(@Param("staff_id") String staffId);
}
