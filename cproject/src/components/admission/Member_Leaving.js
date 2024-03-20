import './Member_Leaving.css';


function Member_Leaving(){

    return (
        <form action="" method="get">
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

            <div className='buttonBox'>
                <div>
                    <button type="reset">입력취소</button>
                    <button type="submit" value='삭제' formaction="/leaving/delete">삭제</button>
                    <button type="submit" value='신규' formaction="/leaving/insert">신규</button>
                    <button type="submit" value='저장' formaction="/leaving/update">저장</button>
                </div>
            </div>
        </form>
    );
}
export default Member_Leaving;