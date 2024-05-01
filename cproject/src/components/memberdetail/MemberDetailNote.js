import { useState, useEffect } from 'react';
import { apiCall } from '../../server/apiService';
import './MemberDetailNote.css'

// 멤버 클릭 시 한명의 데이터 전달받기
function MemberDetailNote({ data, setData }) {

    // 리스트 바뀔때마다 학생 시리얼번호 받아야댐
    const [memDataOneD, setMemDataOneD] = useState([]);
    // 멤버가 신청한 프로그램을 띄워주려면 암튼...나는 시리얼로 확인해서 띄워줘야할거가튼대?
    useEffect(() => {
        console.log("??");
        apiCall('/prgPln/memAplList', 'POST', { memSerial: data.memSerial })
            .then((response) => {
                // console.log({ memSerial: data.memSerial });    // 콘솔 확인용
                
                setMemDataOneD(response.data);
            })
            .catch((error) => {
                // console.log(error);    // 콘솔 확인용
            })
    }, [data.memSerial])
    // prgram_application 연결할 서비스, 서비스 임플, 레포지토리, 컨트롤러 추가하기
    // select prgId, prgNm, cost from program_application where mem_serial = (:mem_serial)



    return (
        <div>
            <b>아동별 프로그램 신청 정보</b>
            <div className='gridBox3'>
                <div>
                    <div>
                        <div>
                            <div>프로그램명</div>
                            <div>신청자</div>
                            <div>신청일</div>
                            <div>구분</div>
                            <div>프로그램 요금</div>
                        </div>
                        {memDataOneD.length > 0 ?
                            memDataOneD.map((o, i) => (
                                // 시리얼로 키값 주면 동일한 값이 여러번 나타날수있음
                                // <div key={o.memSerial}>
                                <div key={i}>
                                    <div>{o.prgNm}</div>
                                    <div>{o.memName}</div>
                                    <div>{o.prgDate}</div>
                                    <div>{o.costClsfc}</div>
                                    <div>{o.paidAmount}</div>
                                </div>
                            ))

                            :
                            <div>
                                신청 프로그램이 없습니다.
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MemberDetailNote;
