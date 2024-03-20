package com.child.project.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table
@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    private long mem_serial;

    private String mem_name;
    private String mem_loginPW;
    private String mem_resident_registration_number;
    private String mem_birthday;
    private String mem_sex;
    private String mem_register_datetime;
    private String mem_presence_family;
    private String mem_responsible_person;
    private String mem_age;
    private String mem_mail;
    private String mem_mail2;
    private String mem_tel;
    private String mem_phone;
    private String mem_zipcode;
    private String mem_address1;
    private String mem_address2;
    private String mem_info;
    private String mem_bank;
    private String mem_account;
    private String mem_depositor;
    private String mem_agreeP;
    private String mem_agreeN;
    private String mem_str;
    private String mem_end;
    private String mem_status;


}

