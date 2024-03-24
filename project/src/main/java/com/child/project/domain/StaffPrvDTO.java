package com.child.project.domain;

// import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StaffPrvDTO {

    private String staffPst;

    protected Integer staffChlCr;

    protected Integer staffCmnMng;

    protected Integer staffCntMng;
}
