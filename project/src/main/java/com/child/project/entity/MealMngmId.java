package com.child.project.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealMngmId implements Serializable {

    private String mem_serial;

    private String meal_date;
}
