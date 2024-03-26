package com.child.project.domain;

import javax.persistence.Column;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EducationDTO {

    private String memSerial;

    private String memName;

    private String eduBack;
    private String eduName;
    private String eduGrade;
    private String eduTeacher;
    private String eduTeachPhone;

    
}
