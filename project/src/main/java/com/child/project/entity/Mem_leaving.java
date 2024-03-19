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
public class Mem_leaving {

    @Id
    private String mem_serial;
    private String leaving_date;
    private String leaving_prop_date;
    private String leaving_rs;
    private String leaving_detail;
    private String leaving_type;
    private String leaving_expct_date;
}
