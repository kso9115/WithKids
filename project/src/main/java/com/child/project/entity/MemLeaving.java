package com.child.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name="mem_leaving")
@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MemLeaving {

    @Id
    @Column(name="mem_serial")
    private String memSerial;
    
    @Column(name="leaving_date")
    private String leavingDate;
    @Column(name="leaving_prop_date")
    private String leavingPropDate;
    @Column(name="leaving_rs")
    private String leavingRs;
    @Column(name="leaving_detail")
    private String leavingDetail;
    @Column(name="leaving_type")
    private String leavingType;
    @Column(name="leaving_expct_date")
    private String leavingExpctDate;
}
