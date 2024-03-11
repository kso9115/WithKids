import MemberAdmission from "./Member_admission";
import MemberList from "../memberlist/MemberList";
import MemberAssortment from "./Member_assortment";
import MemberAdmission from "./Member_admission";
import MemberAdmission from "./Member_Leaving";


function AdmLvng_Manager() {

    retrun (
        <div>
            <h3>입소(이용)/퇴소(종결) 관리</h3>
            <table>
                <tr>조회기간</tr><td><input type="text"></input> </td><td></td>
                <tr>대상자 성명</tr><td><input type="text"></input> </td><td></td>
                <tr>담당자 성명</tr><td><input type="text"></input> </td><td></td>
                <tr>입소/이용 상태</tr><td><input type="text"></input> </td><td></td>
                <tr>입소이용결정 상태</tr><td><input type="text"></input> </td><td></td>
            </table>
            <MemberList />
            <MemberAssortment />
            <MemberAdmission />
        </div>
    );
}

export default AdmLvng_Manager;