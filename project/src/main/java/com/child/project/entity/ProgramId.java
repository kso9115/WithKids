package com.child.project.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgramId implements Serializable {

	private String prgId;

	private String prgBigCls;

	private String prgMidCls;

	private String prgSubCls;
}
