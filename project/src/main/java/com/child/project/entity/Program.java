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
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@ToString
@Table(name = "program")
@IdClass(ProgramId.class)
public class Program implements Serializable {

	@Id
	@Column(name = "prg_id")
	private String prgId;

	@Id
	@Column(name = "prg_big_cls")
	private String prgBigCls;

	@Id
	@Column(name = "prg_mid_cls")
	private String prgMidCls;

	@Column(name = "prg_sub_cls")
	private String prgSubCls;

	@Column(name = "prg_cls")
	private String prgCls;

	@Column(name = "prg_nm")
	private String prgNm;

	@Column(name = "prg_svc")
	private String prgSvc;

	@Column(name = "prg_str")
	private String prgStr;

	@Column(name = "prg_end")
	private String prgEnd;

	@Column(name = "prg_mngr")
	private String prgMngr;

	@Column(name = "prg_mngr_phnn")
	private String prgMngrPhnn;

	@Column(name = "prg_mngr_eml")
	private String prgMngrEml;

	@Column(name = "prg_nmb_api")
	private String prgNmbApi;

	@Column(name = "prg_use")
	private Integer prgUse;

	@Column(name = "bdg_exc")
	private Integer bdgExc;

	@Column(name = "bdg_amt")
	private Integer bdgAmt;

	@Column(name = "sgnn_cntr")
	private Integer sgnnCntr;

	@Column(name = "cost_clsfc")
	private String costClsfc;

	@Column(name = "prg_fee")
	private Integer prgFee;

	@Column(name = "pln_nmb_ppl")
	private Integer plnNmbPpl;

	@Column(name = "wtl_rgs")
	private Integer wtlRgs;

	@Column(name = "f_typ")
	private String ffTyp;

	@Column(name = "cls_inc")
	private String clsInc;

	@Transient
	private String type;

	public Program(String prgId, String prgBigCls, String prgMidCls,
			String prgSubCls, String prgNm) {
		this.prgId = prgId;
		this.prgBigCls = prgBigCls;
		this.prgMidCls = prgMidCls;
		this.prgSubCls = prgSubCls;
		this.prgNm = prgNm;
	}

}
