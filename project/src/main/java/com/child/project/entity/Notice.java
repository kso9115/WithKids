package com.child.project.entity;

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
@Table(name = "notice")
public class Notice {

    @Id
    private Integer seq;
    private String title;
    private String content;
    private String regdate;
    private Integer cnt;
    private Integer emphasis;
}
