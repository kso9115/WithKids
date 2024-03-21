package com.child.project.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProgramDTO {

	private String prgId;
	private String prgBigCls;
	private String prgMidCls;
	private String prgSubCls;
	private String prgCls;
	private String prgNm;
	private String prgSvc;
	private String prgStr;
	private String prgEnd;
	private String prgMngr;
	private String prgMngrPhnn;
	private String prgMngrEml;
	private String prgNmbApi;
	private int prgUse;
	private int bdgExc;
	private int bdgAmt;
	private int sgnnCntr;
	private String costClsfc;
	private int prgFee;
	private int plnNmbPpl;
	private int wtlRgs;
	private String ffTyp;
	private String clsInc;
}
