package com.child.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@ToString
@Table(name = "staff_prv")
public class StaffPrv {
    @Id
    @Column(name = "staff_pst")
    private String staffPst;
    @Column(name = "staff_chl_cr")
    protected int staffChlCr;
    @Column(name = "staff_cmn_mng")
    protected int staffCmnMng;
    @Column(name = "staff_cnt_mng")
    protected int staffCntMng;
}
