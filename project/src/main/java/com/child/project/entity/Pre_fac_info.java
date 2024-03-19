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
public class Pre_fac_info {
    @Id
    private String mem_serial;

    private String pre_fac_nm;
    private String pre_fac_admission_date;
    private String pre_fac_leaving_date;
}
