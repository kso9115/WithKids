import MemberAdmission from "./Member_admission";
import MemberList from "../memberdetail/MemberList";
import MemberAssortment from "./Member_assortment";
import MemberLeaving from "./Member_Leaving";
import './AdmLvng_Manager.css';


function AdmLvng_Manager() {

    return (
        <div id="admLvngBox">
            <p class>입소(이용)/퇴소(종결) 관리</p>
            <form>
                <div class="admLvngSearch"> 
                    <div>
                        <span>*</span>조회기간&nbsp;&nbsp;
                        <input type="date" value></input> ~ <input type="date" value></input>
                    </div>
                    <div>
                        <span>대상자 성명</span>
                        <input type="text"></input>
                    </div>
                    <div>
                        <span>담당자 성명</span>
                        <input type="text"></input>
                    </div>
                    <div>
                        <span>입소/이용 상태</span>
                        <input type="text"></input>
                    </div>
                    <div>
                        <span>입소이용결정 상태</span>
                        <input type="text"></input>
                    </div>
                </div>
            </form>

            <MemberList />
            <MemberAssortment />
            <MemberAdmission />
            <MemberLeaving/>
        </div>
    );
}

export default AdmLvng_Manager;