package com.child.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class Program_detailsId implements Serializable {
	@Column(name = "rec")
	private String rec;

	@Column(name = "prg_date")
	private String prg_date;

	@Column(name = "prg_id")
	private String prg_id;
}
