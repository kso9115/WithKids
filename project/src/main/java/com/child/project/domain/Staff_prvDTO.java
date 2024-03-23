package com.child.project.domain;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Staff_prvDTO {

    private String staff_pst;

    private boolean staff_chl_cr;

    private boolean staff_cmn_mng;

    private boolean staff_cnt_mng;
}
