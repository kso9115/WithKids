package com.child.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name = "mem_education")
@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Education {

    @Id
    @Column(name = "mem_serial")
    private String memSerial;

    @Column(name="mem_name")
    private String memName;

    @Column(name="education_background")
    private String eduBack;
    @Column(name="education_name")
    private String eduName;
    @Column(name="education_grade")
    private String eduGrade;
    @Column(name="education_teacher")
    private String eduTeacher;
    @Column(name="education_teacherPhone")
    private String eduTeachPhone;

    
}
