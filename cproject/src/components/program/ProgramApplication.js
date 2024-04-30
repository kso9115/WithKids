import axios from 'axios';
import { apiCall } from '../../server/apiService';
import './programApplication.css';
import { useEffect, useState } from 'react';


function ProgramApplication({ data, setData, listUpdate, setListUpdate }) {
    const [aplData, setAplData] = useState([]);
    const loginInfo = JSON.parse(sessionStorage.getItem("staffname"));
    useEffect(() => {
        apiCall('/prgPln/prgAplList', 'POST', { prgId: data.prgId })
            .then((response) => {
                setAplData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [data])

    async function cnclAplct(data, i) {
        if (loginInfo.data.staffCntMng !== 2) {
            if (window.confirm("신청을 취소하시겠습니까?")) {
                // apiCall('/user/prgCnclt', 'POST', data, loginInfo.data.token)
                //     .then((response) => {
                //         alert(response.data);
                //         setAplData([ ...aplData ]);
                //     })
                //     .catch((error) => {
                //         console.error(error);
                //     })
            } else alert("취소하셨습니다.");
        }
    }
    return (
        <div style={{
            height: '100%'
        }}>
            <div className='prg_apl_header'>
                <b>프로그램신청 정보</b>
                <div>
                    <div>
                        <div>
                            <div>신청자</div>
                            <div>신청일</div>
                            <div>프로그램명</div>
                            <div>구분</div>
                            <div>프로그램 요금</div>
                            {/* <div>취소</div> */}
                        </div>
                        {aplData.length > 0 ?
                            aplData.map((ele, i) => (
                                <div key={ele.memSerial}>
                                    <div>{ele.memName}</div>
                                    <div>{ele.prgDate}</div>
                                    <div>{ele.prgNm}</div>
                                    <div>{ele.costClsfc}</div>
                                    <div>{ele.paidAmount}</div>
                                    {/* <div>
                                        {ele.costClsfc === '취소' ? null : <button type='button' onClick={() => cnclAplct(ele, i)}>취소</button>}
                                    </div> */}
                                </div>
                            ))

                            :
                            <div >
                                <div className='nonePrgPln'>신청자가 없습니다.</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgramApplication;