package com.child.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
public class Program {

	@Id
	@Column(name = "prg_id")
	private String prgId;

	@Column(name = "prg_big_cls")
	private String prgBigCls;

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
	private int prgUse;

	@Column(name = "bdg_exc")
	private int bdgExc;

	@Column(name = "bdg_amt")
	private int bdgAmt;

	@Column(name = "sgnn_cntr")
	private int sgnnCntr;

	@Column(name = "cost_clsfc")
	private String costClsfc;

	@Column(name = "prg_fee")
	private int prgFee;

	@Column(name = "pln_nmb_ppl")
	private int plnNmbPpl;

	@Column(name = "wtl_rgs")
	private int wtlRgs;

	@Column(name = "f_typ")
	private String ffTyp;

	@Column(name = "cls_inc")
	private String clsInc;

}
