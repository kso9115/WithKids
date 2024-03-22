package com.child.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

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
public class Attandance {

    @Id
    @Column(name="mem_serial")
    private String memSerial;
    
    @Id
    @Column(name="attandance_date")
    private String attDate;
    
    @Column(name="mem_name")
    private String memName;
    @Column(name="attandance_status")
    private String attStatus;

}
