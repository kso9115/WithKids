import React from 'react';

export function prg_dtls_inp_ck(prgDataOneD, type) { // 필수입력확인
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
        if (type === "prgInsert") {
            return window.confirm("신규 프로그램을 생성하시겠습니까?");
        } else if (type === "prgUpdate") {
            return window.confirm("입력하신 정보를 저장하시겠습니까?");
        } else {
            alert("잘못된 요청입니다.");
            return false;
        }

    } else {
        alert("사업 대분류를 입력해주세요.");
        return false;
    }
}

export function prg_dtls_prg_inp_ck(prgDetailData, type) { // 필수입력확인
    if (Object.keys(prgDetailData).length > 0) {

        //세부프로그램명 prgDnm
        if (!prgDetailData.prgDnm) {
            alert("세부프로그램명을 입력해주세요.");
            return false;
        }

        //세부프로그램 내용 content

        //첨부파일 prgFile

        console.log("일단왔다");
        // useConfirm("프로젝트를 신규 생성하시겠습니까?",true,false);
        if (type === "prgDtInsert") {
            return window.confirm("신규 세부프로그램을 생성하시겠습니까?");
        } else if (type === "prgDtUpdate") {
            return window.confirm("입력하신 정보를 저장하시겠습니까?");
        } else {
            alert("잘못된 요청입니다.");
            return false;
        }
    } else {
        alert("세부프로그램명을 입력해주세요");
        return false;
    }
}

export function prg_pln_inp_ck(data, type) { // 필수입력확인
    if (Object.keys(data).length > 0) {

        //제목 title
        if (!data.title) {
            alert("제목을 입력해주세요.");
            return false;
        }

        //일자 prgDate
        if (!data.prgDate) {
            alert("일자을 입력해주세요.");
            return false;
        }

        //담당자 prgMngr
        if (!data.prgMngr) {
            alert("담당자을 입력해주세요.");
            return false;
        }

        //프로그램 prgNm
        if (!data.prgNm) {
            alert("프로그램을 선택해주세요.");
            return false;
        }

        //진행자 prgHst
        if (!data.prgHst) {
            alert("진행자를 입력해주세요.");
            return false;
        }

        //계획횟수 plnCnt
        if (!data.plnCnt) {
            alert("계획횟수를 입력해주세요.");
            return false;
        }

        //계획인원 plnNmbPpl
        if (!data.plnNmbPpl) {
            alert("계획인원을 입력해주세요.");
            return false;
        }

        //계획기간 plnPrd
        if (!data.plnPrd) {
            alert("계획기간을 입력해주세요.");
            return false;
        }

        //계획기간2 plnPrd2
        if (!data.plnPrd2) {
            alert("계획기간을 입력해주세요.");
            return false;
        }

        // //계획시간 plnTm
        // if (!data.plnTm) {
        //     alert("계획시간을 입력해주세요.");
        //     return false;
        // }

        //계획시간 plnTm
        if (data.plnTm && !data.plnTm2) {
            alert("계획시간을 비우거나 완벽히 입력해주세요.");
            return false;
        }

        if (type === "prgPlnInsert") {
            return window.confirm("신규 프로그램계획을 생성하시겠습니까?");
        } else if (type === "prgPlnUpdate") {
            return window.confirm("입력하신 정보를 저장하시겠습니까?");
        } else {
            alert("잘못된 요청입니다.");
            return false;
        }
    } else {
        alert("제목을 입력해주세요");
        return false;
    }
}