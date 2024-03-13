import './Member_Leaving.css';


function Member_Leaving(){

    return (
        <div className="lvnggridBox">
            <div>퇴소/종결 일자</div>
            <div><input type="date" /></div>

            <div>퇴소/종결 유형</div>
            <div><input type="text" /></div>

            <div>퇴소/종결 예정일자</div>
            <div><input type="date" /></div>

            <div>퇴소/종결 신청일자</div>
            <div><input type="date" /></div>

            <div>퇴소/종결 사유</div>
            <div><input type="text" /></div>

            <div></div><div></div>

            <div>퇴소/종결 비고</div>
            <div><textarea></textarea></div>
        </div>
    );
}
export default Member_Leaving;