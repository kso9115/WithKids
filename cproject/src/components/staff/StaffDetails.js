import React, { useCallback, useEffect, useState } from 'react';
import StaffSpecialNote from './StaffSpecialNote'
import './staffDetails.css'
import axios from 'axios';
import { stf_dtls_inp_ck } from '../../hooks/inputCheck/staffInputCheck';
import { apiCall } from '../../server/apiService';

function StaffDetails({ data, setData, listUpdate, setListUpdate, staffPst }) {
    const [staffDataOneD, setStaffDataOneD] = useState({}); // 클릭한 직원정보 저장

    useEffect(() => {
        if (data.constructor === Object
            && Object.keys(data).length > 0) {
            setStaffDataOneD(data);
        }
    }, [data]);

    console.log(staffDataOneD);

    function resetPswrd() {
        if (window.confirm("정말로 초기화 하시겠습니까?(되돌릴 수 없습니다.)"))
            apiCall('/staff/resetPswrd', 'GET', { staffId: staffDataOneD.staffId })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
    }

    function saveData(type) {
        //유효성검사
        if (stf_dtls_inp_ck(staffDataOneD, type)) {
            apiCall('/staff/staffSave', 'POST', { ...staffDataOneD, type })
                .then((response) => {
                    console.log(response.data);
                    setData({
                        ...staffDataOneD
                    });
                    setListUpdate(!listUpdate);
                    alert(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    alert("서버 통신 에러로 요청에 실패했습니다.");
                })
        }
    }

    function deleteData() {
        if (staffDataOneD.staffId) {
            if (window.confirm("직원정보를 삭제하시겠습니까?")) {
                apiCall('/staff/staffdelete', 'POST', staffDataOneD)
                    .then((response) => {
                        setData({});
                        setListUpdate(!listUpdate);
                        alert(response.data);
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else alert("취소되었습니다.");
        } else alert("선택된 직원정보가 없습니다.");
    }

    const StaffDetailsChange = useCallback((event) => {
        staffDataOneD[event.target.name] = event.target.value;
        setStaffDataOneD({ ...staffDataOneD });
    }, [staffDataOneD]);

    return (
        <div style={{
            height: '100%'
        }}>
            <b>직원 정보</b>
            <div className='staff_dtl_gridBox'>
                <div><span>*</span>직위</div>
                <div>
                    <select id='staffPst' name='staffPst' value={staffDataOneD.staffPst || ""} onChange={StaffDetailsChange} >
                        <option value={null} key="none" ></option>
                        {staffPst.map((e) => {
                            return (
                                <option value={e.staffPst} key={e.staffPst} >{e.staffPst}</option>
                            );
                        })}
                    </select>
                </div>

                <div><span>*</span>이름</div>
                <div><input type="text" id='staffNm' name='staffNm' value={staffDataOneD.staffNm || ""} onChange={StaffDetailsChange}
                    disabled={false} /></div>

                <div><span>*</span>휴대번호</div>
                <div><input type="tel" id='staffPhnn' name='staffPhnn' value={staffDataOneD.staffPhnn || ""} onChange={StaffDetailsChange}
                    disabled={false} /></div>

                <div><span>*</span>아이디</div>
                <div><input type="text" id='staffId' name='staffId' value={staffDataOneD.staffId || ""} onChange={StaffDetailsChange}
                    disabled={false} /></div>

                <div><span>*</span>휴직 유무</div>
                <div className='staff_dtl_radioBox' >
                    <div>
                        <input type="radio" id='staffLeave' name='staffLeave' value={0} onChange={StaffDetailsChange}
                            checked={staffDataOneD.staffLeave == 0} />
                        <label htmlFor='staffLeave'>근무중</label>
                    </div>
                    <div>
                        <input type="radio" id='staffLeave2' name='staffLeave' value={1} onChange={StaffDetailsChange}
                            checked={staffDataOneD.staffLeave == 1} />
                        <label htmlFor='staffLeave2'>휴직</label>
                    </div>
                </div>

                <div>휴직일</div>
                <div><input type="date" id='staffLvdy' name='staffLvdy' value={staffDataOneD.staffLvdy || ""} onChange={StaffDetailsChange}
                    disabled={false} /></div>

                <div>비고</div>
                <div>
                    <textarea cols="120" rows="5" id='rmr' name='rmr' value={staffDataOneD.rmr || ""} onChange={StaffDetailsChange}></textarea>
                </div>

                {/* <div><span>*</span>비밀번호</div>
                <div><input type="password" id='staffPsw' name='staffPsw' value={""} onChange={StaffDetailsChange}
                    disabled={false} /></div> */}
            </div>

            <div className='buttonBox buttonMargin'>
                <div>
                    <button type="button" onClick={() => resetPswrd()}
                    >비밀번호 초기화</button>
                    <button type="button" onClick={() => setStaffDataOneD({})} >입력취소</button>
                    <button type="button" value='삭제' onClick={deleteData} >삭제</button>
                    <button type="button" value='신규'
                        onClick={() => saveData("stfInsert")}
                    >신규</button>
                    <button type="button" value='저장'
                        onClick={() => saveData("stfUpdate")}
                    >저장</button>
                </div>
            </div>

            <StaffSpecialNote staffDataOneD={staffDataOneD} setStaffDataOneD={setStaffDataOneD}></StaffSpecialNote>
        </div>
    );
}

export default React.memo(StaffDetails);