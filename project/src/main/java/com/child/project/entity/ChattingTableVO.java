package com.child.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChattingTableVO {
	
	private Long id;
    private Long memberId;
    private Long managerId;
    private String roomId;
    private Boolean useYn;

    

}
