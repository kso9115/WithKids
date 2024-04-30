package com.child.project.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProgramDetailsDTO {

    private String prgId;
    private String prgNm;
    private String prgDnm;
    private String plnPrd;
    private Integer plnNmbPpl;
    private String plnDate;
    private String prgDate;
    private String content;
    private String prgFile;

    private String costClsfc;
    private Integer prgFee;
}
