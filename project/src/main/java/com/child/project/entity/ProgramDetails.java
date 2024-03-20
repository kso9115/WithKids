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

@Entity
@Table(name = "program_details")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(ProgramDetailsId.class)
public class ProgramDetails implements Serializable {

	@Id
	private String rec;

	@Id
	@Column(name = "prg_date")
	private String prgDate;

	private String mngr;

	private String title;

	@Column(name = "prg_nm")
	private String prgNm;

	@Id
	@Column(name = "prg_id")
	private String prgId;

	@Column(name = "pln_prd")
	private String plnPrd;

	@Column(name = "pln_tm")
	private String plnTm;

	@Column(name = "pln_cnt")
	private int plnCnt;

	@Column(name = "pln_nmb_ppl")
	private int plnNmbPpl;

	@Column(name = "prg_hst")
	private String prgHst;

	@Column(name = "pln_mngr")
	private String plnMngr;

	@Column(name = "prgrs_prd")
	private String prgrsPrd;

	@Column(name = "prgrs_tm")
	private String prgrsTm;

	@Column(name = "rqd_tm")
	private String rqdTm;

	private int cnt;

	@Column(name = "nmb_ppl")
	private int nmbPpl;

	@Column(name = "stl_amn")
	private int stlAmn;

	@Column(name = "evl_cls")
	private String evlCls;

	@Column(name = "str_dt")
	private String strDt;

	@Column(name = "end_dt")
	private String endDt;

	@Column(name = "evlt_nmbr")
	private int evltNmbr;

	@Column(name = "str_tm")
	private String strTm;

	@Column(name = "end_tm")
	private String endTm;

	private String content;

	@Column(name = "prg_dnm")
	private String prgDnm;

	@Column(name = "prg_file")
	private String prgFile;

	@Transient
	private String prgFilef;
}
