package com.child.project.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table
@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MealMngm {

    @Id
    private String mem_serial;
    @Id
    private String meal_date;

    private String staff_id;
    private String staff_nm;
    private int brf_meal;
    private int lnc_meal;
    private int dnr_meal;
    private int snk_meal;
}
