import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { stf_spcn_inp_ck } from "../../hooks/inputCheck/staffInputCheck";
import { apiCall } from "../../server/apiService";

// 메인 컴포넌트
function StaffSpecialNote({ staffDataOneD, setStaffDataOneD }) {
    const loginInfo = JSON.parse(sessionStorage.getItem("staffname"));
    const [staffAtnId, setStaffAtnId] = useState([]); // 클릭한 아이디 하나
    const [staffAtnOne, setStaffAtnOne] = useState({}); // 클릭한 날짜 하나
    console.log(staffAtnId);
    useEffect(() => {
        // if (staffDataOneD.constructor === Object && Object.keys(staffDataOneD).length > 0) {
        //     const param = {
        //         staffId: staffDataOneD.staffId
        //     }
        //     apiCall('/staff/staffAtnId', 'POST', param)
        //         .then((response) => {
        //             console.log(response.data)
        //             setStaffAtnId(response.data);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
        // }
        const param = {
            staffId: staffDataOneD.staffId
        }
        apiCall('/staff/staffAtnId', 'POST', param)
            .then((response) => {
                console.log(response.data)
                setStaffAtnId(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        setStaffAtnOne({
            staffId: staffDataOneD.staffId,
            staffNm: staffDataOneD.staffNm
        });
    }, [staffDataOneD]);

    function detailsChange(i) {
        setStaffAtnOne({
            ...staffAtnId[i],
        })
    }
    function saveData(type) {
        //유효성검사

        if (staffDataOneD.staffLeave == 1) {
            alert("휴직중인 직원입니다.");
        } else if (stf_spcn_inp_ck(staffAtnOne, type)) {
            apiCall('/jwtPrg/staff/staffAtnSave', 'POST', { ...staffAtnOne, type }, loginInfo.data.token)
                .then((response) => {
                    console.log(response.data);
                    setStaffAtnId([]);
                    setStaffDataOneD({});
                    // setListUpdate(!listUpdate);
                    alert(response.data);
                })
                .catch((error) => {
                    if (error === 403) alert("권한이 없습니다. ");
                    else alert("서버 통신 에러로 요청에 실패했습니다.");
                })
        }
    }

    function deleteData() {
        if (staffDataOneD.staffLeave == 1) {
            alert("휴직중인 직원입니다.");
        } else if (staffAtnOne.staffId) {
            if (window.confirm("직원 휴가/결근/특이사항을 삭제하시겠습니까?")) {
                apiCall('/jwtPrg/staff/staffAtnDelete', 'POST', staffAtnOne, loginInfo.data.token)
                    .then((response) => {
                        alert(response.data);
                        console.log(response.data);
                        // setListUpdate(!listUpdate);
                        // setData({});
                    })
                    .catch((error) => {
                        if (error === 403) alert("권한이 없습니다. ");
                        else alert("서버 통신 에러로 요청에 실패했습니다.");
                    })
            } else alert("취소되었습니다.");
        } else alert("선택된 직원 휴가/결근/특이사항이 없습니다.");
    }

    const StaffAtnChange = useCallback((event) => {
        staffAtnOne[event.target.name] = event.target.value;
        setStaffAtnOne({ ...staffAtnOne });
    }, [staffAtnOne]);

    return (
        <>
            <b>직원 휴가/결근/특이사항</b>
            <div className='staff_dtl_grid'>
                <div className='staff_dtl_gridBox2'>
                    <div><div>날짜</div><div>종류</div><div>내용</div></div>
                    {
                        staffAtnId.map((e, i) => {
                            return (
                                <div key={e.staffDate} onClick={() => { detailsChange(i) }}><div>{e.staffDate}</div><div>{e.staffAtn}</div><div>{e.content}</div></div>
                            );

                        })
                    }
                </div>
            </div>

            <b>직원 휴가/결근/특이사항 상세정보</b>
            <div className='staff_spcNt_gridBox'>
                <div><span>*</span>종류</div>
                <div>
                    <select id='staffAtn' name='staffAtn' value={staffAtnOne.staffAtn || ""} disabled={staffDataOneD.staffLeave == 1}
                        onChange={StaffAtnChange}>
                        <option value={null} key="none" ></option>
                        <option value="결근" key="결근" >결근</option>
                        <option value="휴가" key="휴가" >휴가</option>
                        <option value="병가" key="병가" >병가</option>
                    </select>
                </div>

                <div><span>*</span>날짜</div>
                <div>
                    <input className="staff_spcNt_date" type="date" id='staffDate' name='staffDate' onChange={StaffAtnChange}
                        value={staffAtnOne.staffDate || ""} disabled={staffDataOneD.staffLeave == 1} />
                    {/* ~<input className="staff_spcNt_date" type="date" id='staffDate2' name='staffDate'
                        disabled={staffDataOneD.staffLeave === 1} />
                    <p style={{ color: 'gray' }}>&nbsp;(하루인 경우 앞에 하나만 입력)</p> */}
                </div>

                <div></div>
                <div></div>

                <div><span>*</span>내용</div>
                <div>
                    <textarea value={staffAtnOne.content || ""} cols="120" rows="5" id='content' name='content'
                        onChange={StaffAtnChange} disabled={staffDataOneD.staffLeave == 1}></textarea>
                </div>
            </div>
            <div className='buttonBox'>
                <div>
                    <button type="button" onClick={() => setStaffAtnOne({})}>입력취소</button>
                    {/* <button type="button" value='삭제' onClick={deleteData} >삭제</button> */}
                    <button type="button" value='신규' onClick={() => saveData("stfSpcnInsert")}>신규</button>
                    <button type="button" value='저장' onClick={() => saveData("stfSpcnUpdate")}>저장</button>
                </div>
            </div>
        </>
    )
}

// export default React.memo(staffSpecialNote);
export default React.memo(StaffSpecialNote);