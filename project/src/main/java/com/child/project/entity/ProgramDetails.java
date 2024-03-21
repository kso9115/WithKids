package com.child.project.entity;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "program_details")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@IdClass(ProgramDetailsId.class)
public class ProgramDetails implements Serializable {

	@Id
	private String rec;

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
	private Integer plnCnt;

	@Column(name = "pln_nmb_ppl")
	private Integer plnNmbPpl;

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

	private Integer cnt;

	@Column(name = "nmb_ppl")
	private Integer nmbPpl;

	@Column(name = "stl_amn")
	private Integer stlAmn;

	@Column(name = "evl_cls")
	private String evlCls;

	@Column(name = "str_dt")
	private String strDt;

	@Column(name = "end_dt")
	private String endDt;

	@Column(name = "evlt_nmbr")
	private Integer evltNmbr;

	@Column(name = "str_tm")
	private String strTm;

	@Column(name = "end_tm")
	private String endTm;

	private String content;

	@Id
	@Column(name = "prg_dnm")
	private String prgDnm;

	@Column(name = "prg_file")
	private String prgFile;

	@Transient
	private List<MultipartFile> prgFilef;
	// private HashMap<String,MultipartFile> prgFilef;
}
