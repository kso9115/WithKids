import { useState } from "react";

export function admission_inp_ck(admMemOneD) {
    // console.log(admMemOneD);

    if(Object.keys(admMemOneD).length > 0){
        if(!admMemOneD.memSerial){
            alert("대상자 번호를 입력해주세요.");
            return false;
        }

        if(!admMemOneD.admissionDate){
            alert("입소/이용일자를 입력해주세요.");
            return false;
        }

        if(!admMemOneD.admissionRs){
            alert("입소 사유를 입력해주세요.");
            return false;
        }

        if(!admMemOneD.admissionType){
            alert("대상자 유형을 입력해주세요.");
            return false;
        }

        if(!admMemOneD.admissionQualification){
            alert("대상자 자격을 입력해주세요.");
            return false;
        }

        if(!admMemOneD.memResponsiblePerson){
            alert("담당자를 입력해주세요.");
            return false;
        }

        return true;
    } else {
        alert("memSerial이 입력부탁드립니다.");
        return false;
    }
}