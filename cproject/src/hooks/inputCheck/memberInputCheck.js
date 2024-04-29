
export function mem_dtls_inp_ck(memDataOneD) {
    const loginInfo = JSON.parse(sessionStorage.getItem("staffname")).data;
    // var regex = /^[0-9]*$/;

    if (loginInfo.staffChlCr !== 2) {
        alert("권한이 없습니다.");
        return false;
    }

    // 배열의 길이가 0이면 실행 x => else 에서 false로
    if (Object.keys(memDataOneD).length > 0) {

        // 대상자 번호
        if (!memDataOneD.memSerial) {
            alert("대상자 번호를 입력해주세요.");
            return false;
        }

        if (!memDataOneD.memName) {
            alert("대상자 이름을 입력해주세요.");
            return false;
        }

        if (!memDataOneD.memRegNum) {
            alert("주민번호를 입력해주세요.");
            return false;
        }

        if (!memDataOneD.memBirth) {
            alert("생일을 입력해주세요.");
            return false;
        }

        if (!memDataOneD.memSex) {
            alert("성별을 입력해주세요.");
            return false;
        }

        if (!memDataOneD.memAge) {
            alert("나이를 입력해주세요.");
            return false;
        }

        if (!memDataOneD.memPhone) {
            alert("연락처를 입력해주세요.");
            return false;
        }
        // return true를 안해주고 있었음..

        alert("등록 및 수정 성공");
        return true;

    } else {
        alert("대상자 번호를 입력해주세요.")
        return false;
    }



}