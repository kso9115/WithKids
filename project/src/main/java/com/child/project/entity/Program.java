package com.child.project.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
// @Table(name="guestbook") // 클래스 이름과 동일한 경우 생략가능

@Getter
@Builder // 복잡한 객체의 생성 과정과 표현 방법을 분리하여 다양한 구성의 인스턴스를 만드는 생성 패턴. 출처:
			// https://inpa.tistory.com/entry/GOF-💠-빌더Builder-패턴-끝판왕-정리
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
