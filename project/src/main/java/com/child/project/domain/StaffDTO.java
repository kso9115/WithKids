package com.child.project.domain;

import javax.persistence.Column;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StaffDTO extends StaffPrvDTO {

    // StaffPrv getStaffPrv();

    // Staff getStaff();

    private String staffPst;

    private String staffNm;

    private String staffId;

    private String staffPsw;

    private String staffPhnn;

    private Integer staffLeave;

    private String staffLvdy;

    private String rmr;

    public StaffDTO(String staffPst, String staffNm, String staffId,
            String staffPsw,
            String staffPhnn, Integer staffLeave, String staffLvdy, String rmr,
            Integer staffChlCr, Integer staffCmnMng, Integer staffCntMng) {
        this.staffPst = staffPst;
        this.staffNm = staffNm;
        this.staffId = staffId;
        this.staffPsw = staffPsw;
        this.staffPhnn = staffPhnn;
        this.staffLeave = staffLeave;
        this.staffLvdy = staffLvdy;
        this.rmr = rmr;
        super.staffChlCr = staffChlCr;
        super.staffCmnMng = staffCmnMng;
        super.staffCntMng = staffCntMng;
    }
}
