import React from "react";

function StaffSpecialNote({ staffDataOneD }) {



    return (
        <>
            <b>직원 휴가/결근/특이사항</b>
            <div className='staff_spcNt_gridBox'>
                <div><span>*</span>종류</div>
                <div>
                    <select id='staffPst' name='staffPst' disabled={staffDataOneD.staffLeave === 1}>
                        <option value={null} key="none" ></option>
                        <option value="결근" key="결근" >결근</option>
                        <option value="휴가" key="휴가" >휴가</option>
                        <option value="병가" key="병가" >병가</option>
                    </select>
                </div>

                <div><span>*</span>날짜</div>
                <div>
                    <input className="staff_spcNt_date" type="date" id='staffLvdy' name='staffLvdy' 
                    disabled={staffDataOneD.staffLeave === 1} /> ~ 
                    <input className="staff_spcNt_date" type="date" id='staffLvdy' name='staffLvdy'
                        disabled={staffDataOneD.staffLeave === 1} />
                    <p style={{color:'gray'}}>&nbsp;(하루인 경우 앞에 하나만 입력)</p>
                </div>

                <div><span>*</span>내용</div>
                <div>
                    <textarea cols="120" rows="5" id='rmr' name='rmr' ></textarea>
                </div>
            </div>
            <div className='buttonBox'>
                <div>
                    <button type="button"
                        // onClick={() => setPrgDataOneD({})}
                    >입력취소</button>
                    <button type="button" value='삭제'
                        // onClick={deleteData}
                    >삭제</button>
                    <button type="button" value='신규'
                        // onClick={() => saveData("prgInsert")}
                    >신규</button>
                    <button type="button" value='저장'
                        // onClick={() => saveData("prgUpdate")}
                    >저장</button>
                </div>
            </div>
        </>
    )
}

// export default React.memo(staffSpecialNote);
export default StaffSpecialNote;