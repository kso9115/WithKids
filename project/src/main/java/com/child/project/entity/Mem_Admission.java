package com.child.project.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table
@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Mem_Admission {
    
    @Id
    private String mem_serial;
    
    private String admission_date;
    private String admission_rs;
    private int transfer;
    private String admission_detail;
    private String mem_register_time;
    private String admission_status;
    private String admission_status_detail;
    private String admission_type;
    private String admission_qualification;

}
