package com.child.project.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

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
@Table(name = "program_application")
@IdClass(ProgramApplicationId.class)
public class ProgramApplication implements Serializable {

    @Id
    @Column(name = "mem_serial")
    private String memSerial;

    @Column(name = "mem_name")
    private String memName;
    @Column(name = "prg_date")
    private String prgDate;

    @Id
    @Column(name = "prg_id")
    private String prgId;

    @Column(name = "prg_nm")
    private String prgNm;

    @Column(name = "cost_clsfc")
    private String costClsfc;

    @Column(name = "paid_amount")
    private Integer paidAmount;

    @Column(name = "imp_uid")
    private String impUid;

    @Column(name = "merchant_uid")
    private String merchantUid;

    @Column(name = "pg_tid")
    private String pgTid;

    private Integer cnclt;

    @PrePersist
    public void setCreatedAt() {
        this.cnclt = this.cnclt == null ? 0 : this.cnclt;
    }

}
