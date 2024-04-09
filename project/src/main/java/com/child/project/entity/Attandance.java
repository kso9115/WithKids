package com.child.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name = "attandance")
@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@IdClass(AttandanceId.class)
public class Attandance implements Serializable {

    @Id
    @Column(name = "mem_serial")
    private String memSerial;

    @Id
    @Column(name = "attandance_date")
    private String attDate;

    @Column(name = "mem_name")
    private String memName;
    @Column(name = "attandance_status")
    private String attStatus;

    // SQL 구문 처리 시 제외, front 표시용 가상컬럼
    @Transient
    private String latitude;
    @Transient
    private String longitude;

    // 출석일자 전달용
    @Transient
    private String attcount;
}
