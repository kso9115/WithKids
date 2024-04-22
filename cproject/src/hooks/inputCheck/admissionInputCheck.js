export function admission_inp_ck(admMemOne) {
    if(Object.keys(admMemOne).length > 0){
        if(!admMemOne.memSerial){
            alert("대상자 번호를 입력해주세요.");
            return false;
        }

        if(!admMemOne.admissionDate){
            alert("입소 날짜를 입력해주세요.");
            return false;
        }

        if(!admMemOne.admissionRs){
            alert("입소 사유를 입력해주세요.");
            return false;
        }

        if(!admMemOne.admissionType){
            alert("대상자 유형을 입력해주세요.");
            return false;
        }

        if(!admMemOne.admissionQualification){
            alert("대상자 자격을 입력해주세요.");
            return false;
        }

        if(!admMemOne.memResponsiblePerson){
            alert("담당자를 입력해주세요.");
            return false;
        }

        return true;
    }
}