package com.child.project.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

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
public class Program {

	@Id
	private String prg_id;

	private String prg_big_cls;
	private String prg_mid_cls;
	private String prg_sub_cls;
	private String prg_cls;
	private String prg_nm;
	private String prg_svc;
	private String prg_str;
	private String prg_end;
	private String prg_mngr;
	private String prg_mngr_phnn;
	private String prg_mngr_eml;
	private String prg_nmb_api;
	private int prg_use;
	private int bdg_exc;
	private int bdg_amt;
	private int sgnn_cntr;
	private String cost_clsfc;
	private int prg_fee;
	private int pln_nmb_ppl;
	private int wtl_rgs;
	private String f_typ;
	private String cls_inc;

}
