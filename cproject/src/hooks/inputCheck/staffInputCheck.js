export function stf_dtls_inp_ck(staffDataOneD, type) { // 필수입력확인
    var regex = /^[0-9]*$/;
    if (Object.keys(staffDataOneD).length > 0) {
        //직위 staffPst
        console.log(!staffDataOneD.staffPst);
        if (!staffDataOneD.staffPst) {
            alert("직위를 입력해주세요.");
            return false;
        }
        //이름 staffNm
        if (!staffDataOneD.staffNm) {
            alert("이름을 입력해주세요.");
            return false;
        }
        //아이디 staffId
        if (!staffDataOneD.staffId) {
            alert("아이디를 입력해주세요.");
            return false;
        }


        //휴대번호 staffPhnn
        if (!staffDataOneD.staffPhnn) {
            alert("휴대번호를 입력해주세요.");
            return false;
        }
        //휴직 유무 staffLeave
        if (!staffDataOneD.staffLeave && !(staffDataOneD.staffLeave === 0 || staffDataOneD.staffLeave === 1)) {
            alert("휴직 유무를 입력해주세요.");
            return false;
        }
        //휴직일 staffLvdy
        if (staffDataOneD.staffLeave == 1) {
            if (!staffDataOneD.staffLvdy) {
                alert("휴직에 체크했을 경우 휴직일을 입력해주세요.");
                return false;
            }
            //비고 rmr
            if (!staffDataOneD.rmr) {
                alert("휴직에 체크했을 경우 비고를 입력해주세요.");
                return false;
            }
        }
        

        console.log("일단왔다");
        // useConfirm("프로젝트를 신규 생성하시겠습니까?",true,false);
        if (type === "stfInsert") {
            return window.confirm("신규 직원정보를 생성하시겠습니까?");
        } else if (type === "stfUpdate") {
            return window.confirm("입력하신 정보를 저장하시겠습니까?");
        } else {
            alert("잘못된 요청입니다.");
            return false;
        }

    } else {
        alert("직위를 입력해주세요.");
        return false;
    }
}

export function stf_spcn_inp_ck(staffDataOneD, type) { // 필수입력확인
    var regex = /^[0-9]*$/;
    if (Object.keys(staffDataOneD).length > 0) {

        //종류 staffAtn
        if (!staffDataOneD.staffAtn) {
            alert("종류를 선택해주세요.");
            return false;
        }
        //날짜 staffDate
        if (!staffDataOneD.staffDate) {
            alert("날짜를 입력해주세요.");
            return false;
        }
        //내용 content
        if (!staffDataOneD.content) {
            alert("내용을 입력해주세요.");
            return false;
        }

        // useConfirm("프로젝트를 신규 생성하시겠습니까?",true,false);
        if (type === "stfSpcnInsert") {
            return window.confirm("직원 휴가/결근/특이사항을 생성하시겠습니까?");
        } else if (type === "stfSpcnUpdate") {
            return window.confirm("입력하신 정보를 저장하시겠습니까?");
        } else {
            alert("잘못된 요청입니다.");
            return false;
        }

    } else {
        alert("종류를 선택해주세요.");
        return false;
    }
}