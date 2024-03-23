package com.child.project.domain;

import javax.persistence.Column;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StaffDTO extends Staff_prvDTO {

    // StaffPrv getStaffPrv();

    // Staff getStaff();

    private String staff_pst;

    private String staff_nm;

    private String staff_id;

    private String staff_psw;

    private String staff_phnn;

    private boolean staff_leave;

    private String staff_lvdy;

    private String rmr;

    public StaffDTO(String staff_pst, String staff_nm, String staff_id, String staff_psw,
            String staff_phnn, boolean staff_leave, String staff_lvdy, String rmr,
            boolean staff_chl_cr, boolean staff_cmn_mng, boolean staff_cnt_mng) {
        this.staff_pst = staff_pst;
        this.staff_nm = staff_nm;
        this.staff_id = staff_id;
        this.staff_psw = staff_psw;
        this.staff_phnn = staff_phnn;
        this.staff_leave = staff_leave;
        this.staff_lvdy = staff_lvdy;
        this.rmr = rmr;
        super.staff_chl_cr = staff_chl_cr;
        super.staff_cmn_mng = staff_cmn_mng;
        super.staff_cnt_mng = staff_cnt_mng;
    }
}
