import { useState, useEffect, useCallback } from 'react';
import './Member_Leaving.css';
import axios from 'axios';

function Member_Leaving({ memDataOne , lvngMem  , dataDML}){
    // 가져온 DATA 를 Mem의 정보를 가져옴 -> 변할 때마다 leaving이 serial전달
    const[lvngMemD,setLvngMemD]=useState({});
    console.log(memDataOne);
    
    useEffect(()=>{
        // console.log("Leaving");
        setLvngMemD({...lvngMem }) ; 
    },[lvngMem] );
    console.log(lvngMemD);
    
    const lvngChange = (e) => {

        const { name, value } = e.target;
        setLvngMemD(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
   
    // 함수 받아오기 
    const setDataDML = (type,dml, data)=>{
        dataDML(type,dml, data);
    }

    return (
        <div>
            <div className="lvnggridBox">
                <div><span></span>퇴소/종결 일자</div>
                <div><input type="date" name='leavingDate' value={lvngMemD.leavingDate || '' } onChange={lvngChange}/></div>

                <div>퇴소/종결 유형</div>
                <div><input type="text" name='leavingType'  value={lvngMemD.leavingType || ''} onChange={lvngChange}/></div>

                <div>퇴소/종결 예정일자</div>
                <div><input type="date" name='leavingPropDate'  value={lvngMemD.leavingPropDate || ''} onChange={lvngChange}/></div>

                <div>퇴소/종결 신청일자</div>
                <div><input type="date" name='leavingExpctDate'  value={lvngMemD.leavingExpctDate || ''} onChange={lvngChange}/></div>

                <div>퇴소/종결 사유</div>
                <div><input type="text" name='leavingRs'  value={lvngMemD.leavingRs || ''} onChange={lvngChange}/></div>

                <div></div><div></div>

                <div>퇴소/종결 비고</div>
                <div><textarea name='leavingDetail' value={lvngMemD.leavingDetail || ''} onChange={lvngChange}></textarea></div>
            </div>

            <div className='buttonBox'>
                <div>
                    <button type="reset" onClick={()=> setLvngMemD({}) }>입력취소</button>
                    {/* <button type="submit" value='삭제'  onClick={()=>setDataDML("2","delete",lvngMemD)}>삭제</button> */}
                    <button type="submit" value='신규' onClick={()=>{
                        if(memDataOne.memSerial!=null && lvngMemD.leavingDate!=null){
                            setDataDML("2","insert",lvngMemD);
                        }else {
                            alert("입력이 잘 되어 있는지 확인 부탁드립니다.");
                        }
                    }}
                    >신규 및 수정</button>
                        
                </div>
            </div>
        </div>
    );
}
export default Member_Leaving;