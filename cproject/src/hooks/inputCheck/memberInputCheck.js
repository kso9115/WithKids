
export function mem_dtls_inp_ck(memDataOneD) {
    // var regex = /^[0-9]*$/;

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

        if (!memDataOneD.memTel) {
            alert("연락처를 입력해주세요.");
            return false;
        }
    }



}