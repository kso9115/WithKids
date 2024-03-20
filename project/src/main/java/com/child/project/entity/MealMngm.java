package com.child.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
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
@IdClass(MealMngmId.class)
public class MealMngm implements Serializable {

    @Id
    @Column(name="mem_serial")
    private String memSerial;
    @Id
    @Column(name="meal_date")
    private String mealDate;
    
    @Column(name="staff_id")
    private String staffId;
    @Column(name="staff_nm")
    private String staffNm;
    @Column(name="brf_meal")
    private int brfMeal;
    @Column(name="lnc_meal")
    private int lncMeal;
    @Column(name="dnr_meal")
    private int dnrMeal;
    @Column(name="snk_meal")
    private int snkMeal;
}
