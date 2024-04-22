package com.child.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name = "member")
@Entity
@Data // get, set
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    // @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "mem_serial")
    private String memSerial;

    @Column(name = "mem_name")
    private String memName;

    // updatable : 업데이트 시 자동 업뎃방지
    @Column(name = "mem_login_pw", updatable = false)
    private String memLoginPW;

    @Column(name = "mem_resident_registration_number") // 주민번호
    private String memRegNum;
    @Column(name = "mem_birthday")
    private String memBirth;
    @Column(name = "mem_sex")
    private String memSex;
    @Column(name = "mem_register_datetime", updatable = false) // 접수일자
    private String memRegisterDate;
    @Column(name = "mem_presence_family")
    private String memFamily;
    @Column(name = "mem_responsible_person") // 담당자
    private String memResPerson;
    @Column(name = "mem_age")
    private String memAge;
    @Column(name = "mem_mail")
    private String memMail;
    // @Column(name = "mem_mail2")
    // private String memMail2;
    @Column(name = "mem_tel")
    private String memTel;
    @Column(name = "mem_phone")
    private String memPhone;
    @Column(name = "mem_zipcode")
    private String memZipCode;
    @Column(name = "mem_address1")
    private String memAddress1;
    @Column(name = "mem_address2")
    private String memAddress2;
    @Column(name = "mem_info")
    private String memInfo;
    @Column(name = "mem_agreeP")
    private String memAgreeP;
    @Column(name = "mem_agreeN")
    private String memAgreeN;

    @Column(name = "mem_bank")
    private String memBank;
    @Column(name = "mem_account")
    private String memAccount;
    @Column(name = "mem_depositor")
    private String memDepositor;

    @Column(name = "mem_str")
    private String memStr;
    @Column(name = "mem_end")
    private String memEnd;
    @Column(name = "mem_status")
    private String memStatus;

    // Table 보관용(File_Name): DB보관용
    // 테이블에 별도로 저장하지 않을 예정이라 꺼놓기
    // private String uploadfile;

    // SQL 구문 처리 시 제외, front 표시용 가상컬럼
    @Transient
    private String memEndF; // 입소 종료 일자 표시용

	@Transient
    private MultipartFile uploadfilef; // 파일에 대한 정보가 들어있는 타입 생성
    
    @Transient
    private Education education;

    // @OneToOne(fetch = FetchType.LAZY)
    // @OneToOne
    // @JoinColumn(name = "mem_serial")
    // private Education education;
}