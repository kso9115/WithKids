package com.child.project.domain;

import javax.persistence.Column;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttandanceDTO {

    private String memSerial;
    private String attDate;
    private String memName;
    
    private String attStatus;

    // SQL 구문 처리 시 제외, front 표시용 가상컬럼

    // private String latitude;
    // private String longitude;

    // 출석일자 전달용
    private Long attcount;
    private Long abscount;
    
}
