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

@Table(name = "member")
@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @Column(name="mem_serial")
    private String memSerial;

    @Column(name="mem_name")
    private String memName;
    @Column(name="mem_loginPW")
    private String memLoginPW;
    @Column(name="mem_resident_registration_number")    // 주민번호
    private String memRegNum;
    @Column(name="mem_birthday")
    private String memBirth;
    @Column(name="mem_sex")
    private String memSex;
    @Column(name="mem_register_datetime")               // 접수일자
    private String memRegisterDate;
    @Column(name="mem_presence_family")
    private String memFamily;
    @Column(name="mem_responsible_person")              // 담당자
    private String memResPerson;
    @Column(name="mem_age")
    private String memAge;
    @Column(name="mem_mail")
    private String memMail;
    @Column(name="mem_mail2")
    private String memMail2;
    @Column(name="mem_tel")
    private String memTel;
    @Column(name="mem_phone")
    private String memPhone;
    @Column(name="mem_address1")
    private String memAddress1;
    @Column(name="mem_address2")
    private String memAddress2;
    @Column(name="mem_info")
    private String memInfo;
    @Column(name="mem_bank")
    private String memBank;
    @Column(name="mem_account")
    private String memAccount;
    @Column(name="mem_depositor")
    private String memDepositor;
    @Column(name="mem_agreeP")
    private String memAgreeP;
    @Column(name="mem_agreeN")
    private String memAgreeN;
    @Column(name="mem_str")
    private String memStr;
    @Column(name="mem_end")
    private String memEnd;
    @Column(name="mem_status")
    private String memStatus;


}
