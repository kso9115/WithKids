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


@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="mem_Admission")
public class MemAdmission {
    
    @Id
    @Column(name="mem_serial")
    private String memSerial;
    
    @Column(name="admission_date")
    private String admissionDate;
    
    @Column(name="admission_rs")
    private String admissionRs;
    private int transfer;
    @Column(name="admission_detail")
    private String admissionDetail;
    @Column(name="mem_register_time")
    private String memRegisterTime;
    @Column(name="admission_status")
    private String admissionStatus;
    @Column(name="admission_status_detail")
    private String admissionStatusDetail;
    @Column(name="admission_type")
    private String admissionType;
    @Column(name="admission_qualification")
    private String admissionQualification;

    // 수정사항. 2024-03.24
    @Column(name="pre_fac_nm")
    private String preFacNm;
    @Column(name="pre_fac__admission_date")
    private String preFacAdmissionDate;
    @Column(name="pre_fac_leaving_date")
    private String preFacLeavingDate;
}
