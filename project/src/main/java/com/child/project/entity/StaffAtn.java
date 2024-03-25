package com.child.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.IdClass;

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
@Table(name = "staff_atn")
@IdClass(StaffAtnId.class)
public class StaffAtn implements Serializable {

    @Id
    @Column(name = "staff_id")
    private String staffId;

    @Column(name = "staff_nm")
    private String staffNm;

    @Id
    @Column(name = "staff_date")
    private String staffDate;

    @Column(name = "staff_atn")
    private String staffAtn;

    @Column(name = "content")
    private String content;
}
