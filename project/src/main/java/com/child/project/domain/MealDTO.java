package com.child.project.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MealDTO {
	
	List<Integer> brk_meal;  
	List<Integer> lnc_meal;  
	List<Integer> dnr_meal;  
	List<Integer> snk_meal;  
	
} //class
