import { apiCall } from '../../server/apiService';
import './programApplication.css';
import { useEffect, useState } from 'react';


function ProgramApplication({ data, setData, listUpdate, setListUpdate }) {
    const [aplData, setAplData] = useState([]);

    useEffect(() => {
        apiCall('/prgPln/prgAplList', 'POST', { prgId: data.prgId })
            .then((response) => {
                setAplData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [data])
    console.log(aplData);
    console.log(data);
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
                            <div>취소</div>
                        </div>
                        {aplData.length > 0 ? 
                            <div>
                                <div>{aplData.memSerial}</div>
                                <div>{aplData.prgDate}</div>
                                <div>{aplData.prgNm}</div>
                                <div>{aplData.costClsfc}</div>
                                <div>{aplData.paidAmount}</div>
                                <div>취소</div>
                            </div>
                        :
                            <div>
                                신청자가 없습니다.
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgramApplication;