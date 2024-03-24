import React, { useCallback, useEffect, useState } from 'react';
import StaffSpecialNote from './StaffSpecialNote'
import './staffDetails.css'
import axios from 'axios';

function StaffDetails({ data, setData, listUpdate, setListUpdate }) {
    const [staffDataOneD, setStaffDataOneD] = useState({});
    const [staffPst, setStaffPst] = useState([]);

    console.log(staffDataOneD)
    console.log(staffPst)
    useEffect(() => {
        setStaffDataOneD(data);

        axios.get(`/api/staff/staffPstList`)
            .then((response) => {
                console.log(response.data)
                setStaffPst(response.data);
            }).catch((error) => {
                // handle error
                console.log(error);
            })
    }, [data])

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
                            checked={staffDataOneD.staffLeave === 0} />
                        <label htmlFor='interior'>근무중</label>
                    </div>
                    <div>
                        <input type="radio" id='staffLeave2' name='staffLeave2' value={1} onChange={StaffDetailsChange}
                            checked={staffDataOneD.staffLeave === 1} />
                        <label htmlFor='prgCls2'>휴직</label>
                    </div>
                </div>
                
                <div><span>*</span>휴직일</div>
                <div><input type="date" id='staffLvdy' name='staffLvdy' value={staffDataOneD.staffLvdy || ""} onChange={StaffDetailsChange}
                    disabled={false} /></div>

                <div><span>*</span>비고</div>
                <div>
                    <textarea cols="120" rows="5" id='rmr' name='rmr' value={staffDataOneD.rmr || ""} onChange={StaffDetailsChange}></textarea>
                </div>
                
                {/* <div><span>*</span>비밀번호</div>
                <div><input type="password" id='staffPsw' name='staffPsw' value={""} onChange={StaffDetailsChange}
                    disabled={false} /></div> */}
            </div>
            <div className='buttonBox buttonMargin'>
                <div>
                    <button type="button"
                    // onClick={() => }
                    >비밀번호 초기화</button>
                    <button type="button" onClick={() => setStaffDataOneD({})} >입력취소</button>
                    <button type="button" value='삭제'onClick={()=> setStaffDataOneD({})} >삭제</button>
                    <button type="button" value='신규'
                        // onClick={() => saveData("prgInsert")}
                    >신규</button>
                    <button type="button" value='저장'
                        // onClick={() => saveData("prgUpdate")}
                    >저장</button>
                </div>
            </div>
            <StaffSpecialNote staffDataOneD={staffDataOneD}></StaffSpecialNote>
        </div>
    );
}

export default React.memo(StaffDetails);