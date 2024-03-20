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

@Table(name="pre_fac_info")
@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PreFacInfo {
    @Id
    @Column(name="mem_serial")
    private String memSerial;

    @Column(name="preFacNm")
    private String pre_fac_nm;
    @Column(name="pre_fac_admission_date")
    private String preFacAdmissionDate;
    @Column(name="pre_fac_leaving_date")
    private String preFacLeavingDate;
}