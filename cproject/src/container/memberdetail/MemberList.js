import MemberSearch from "./MemberSearch";
import './MemberList.css';

function MemberList() {
    return (
        <div className="memberList">

            <table border="1">
                <tr>
                    <th>번호</th>
                    <td>받아오기</td>
                </tr>
                <tr>
                    <th>대상자번호</th>
                    <td>받아오기</td>
                </tr>
                <tr>
                    <th>대상자명</th>
                    <td>받아오기</td>
                </tr>
                <tr>
                    <th>성별</th>
                    <td>받아오기</td>
                </tr>
                <tr>
                    <th>생년월일</th>
                    <td>받아오기</td>
                </tr>
            </table>

        </div>
    );
}

export default MemberList;