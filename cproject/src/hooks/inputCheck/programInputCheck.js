import React from 'react';

export function prg_dtls_inp_ck(prgDataOneD) { // 필수입력확인
    var regex = /^[0-9]*$/;
    if (Object.keys(prgDataOneD).length > 0) {
        //사업 대분류 prgBigCls
        if (!prgDataOneD.prgBigCls) {
            alert("사업 대분류를 입력해주세요.");
            return false;
        }

        //사업 중분류 prgMidCls
        if (!prgDataOneD.prgMidCls) {
            alert("사업 중분류를 입력해주세요.");
            return false;
        }

        //사업 소분류 prgSubCls
        if (!prgDataOneD.prgSubCls) {
            alert("사업 소분류를 입력해주세요.");
            return false;
        }

        //프로그램 구분 prgCls
        if (!prgDataOneD.prgCls) {
            alert("프로그램 구분을 선택해주세요.");
            return false;
        }

        //프로그램명 prgNm
        if (!prgDataOneD.prgNm) {
            alert("프로그램명을 입력해주세요.");
            return false;
        }

        //서비스 분류 prgSvc

        //프로그램 시작 기간 prgStr
        if (!prgDataOneD.prgStr) {
            alert("프로그램 시작 기간을 선택해주세요.");
            return false;
        }

        //프로그램 종료 기간 prgEnd
        if (!prgDataOneD.prgEnd) {
            alert("프로그램 종료 기간을 선택해주세요.");
            return false;
        }

        //담당자 prgMngr
        if (!prgDataOneD.prgMngr) {
            alert("담당자를 입력해주세요.");
            return false;
        }

        //담당자 전화번호 prgMngrPhnn
        if (!prgDataOneD.prgMngrPhnn) {
            alert("담당자 전화번호를 입력해주세요.");
            return false;
        }

        //담당자 이메일 prgMngrEml
        if (!prgDataOneD.prgMngrEml) {
            alert("담당자 이메일을 입력해주세요.");
            return false;
        }

        //지원횟수 prgNmbApi
        if (!prgDataOneD.prgNmbApi) {
            alert("지원횟수를 입력해주세요.");
            return false;
        } else if (!regex.test(prgDataOneD.prgNmbApi)) {
            alert("지원횟수는 숫자만 입력해주세요.");
            return false;
        }

        //사용여부 prgUse
        if (!prgDataOneD.prgUse) {
            alert("사용여부 선택해주세요.");
            return false;
        }

        //예산집행여부 bdgExc

        //예산금액 bdgAmt

        //이용계약체결 sgnnCntr

        //비용구분 costClsfc
        if (!prgDataOneD.costClsfc) {
            alert("비용구분을 입력해주세요.");
            return false;
        } 

        //프로그램요금 prgFee
        if (!regex.test(prgDataOneD.prgFee)) {
            alert("프로그램요금은 숫자만 입력해주세요.");
            return false;
        }

        //계획인원(정원) plnNmbPpl
        if (!prgDataOneD.plnNmbPpl) {
            alert("계획인원(정원)을 입력해주세요.");
            return false;
        } else if (!regex.test(prgDataOneD.plnNmbPpl)) {
            alert("계획인원(정원)은 숫자만 입력해주세요.");
            return false;
        }

        //대기자등록 wtlRgs

        //가구유형 ffTyp
        if (!prgDataOneD.ffTyp) {
            alert("가구유형을 선택해주세요.");
            return false;
        }

        //소득구분 clsInc
        if (!prgDataOneD.clsInc) {
            alert("소득구분을 입력해주세요.");
            return false;
        }

        console.log("일단왔다");
        // useConfirm("프로젝트를 신규 생성하시겠습니까?",true,false);
        return window.confirm("신규 프로젝트를 생성하시겠습니까?");
    } else {
        alert("사업 대분류를 입력해주세요.");
        return false;
    }
}