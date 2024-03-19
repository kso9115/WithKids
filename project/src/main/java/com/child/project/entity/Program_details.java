package com.child.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@IdClass(Program_detailsId.class)
public class Program_details implements Serializable{

	@Id
	@Column(name="rec")
	private String rec;
	
	@Id
	@Column(name="prg_date")
	private String prg_date;
	
	private String mngr;
	private String title;
	private String prg_nm;
	
	@Id
	@Column(name="prg_id")
	private String prg_id;
	
	private String pln_prd;
	private String pln_tm;
	private int pln_cnt;
	private int pln_nmb_ppl;
	private String prg_hst;
	private String pln_mngr;
	private String prgrs_prd;
	private String prgrs_tm;
	private String rqd_tm;
	private int cnt;
	private int nmb_ppl;
	private int stl_amn;
	private String evl_cls;
	private String str_dt;
	private String end_dt;
	private int evlt_nmbr;
	private String str_tm;
	private String end_tm;
	private String content;
	private String prg_dnm;
	private String prg_file;
	
	@Transient
	private String prg_filef;
}
