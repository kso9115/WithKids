import React, { useEffect } from 'react';
import './userprogram.css';
import { useLocation } from 'react-router-dom';

import { apiCall } from '../../server/apiService';
import { Callbacks } from 'jquery';
import { useState } from 'react';


function UserprogramDetails() {
    const [prgOne, setPrgOne] = useState({});
    const location = useLocation();
    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));

    useEffect(() => {
        apiCall('/prg/prgOne', 'POST', { prgId: location.state.prgId })
            .then((response) => {
                setPrgOne(response.data)
            }).catch((error) => {
                console.error('프로그램 요금정보 가져오기 실패', error);
            })
    }, [location])

    function downloadFile(event) {
        if (window.confirm(`${event.target.name} 파일을 다운로드 하시겠습니까?`))
            apiCall('/prg/filedownload', 'GET', {
                prgId: location.state.prgId,
                prgDnm: location.state.prgDnm,
                fileName: event.target.name
            })
                .then((response) => {
                    // 파일 다운로드를 위해 blob 데이터를 URL로 변환
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    // a 태그를 생성하고 다운로드 링크를 설정하여 다운로드를 유도
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.target.name); // 다운로드할 파일명을 설정
                    document.body.appendChild(link);
                    link.click();
                    // URL 객체의 사용이 끝나면 해제하여 메모리 누수를 방지
                    URL.revokeObjectURL(url);
                })
                .catch((error) => {
                    console.error('파일 다운로드 실패:', error);
                })
    }

    function portone() {
        if (sessionData) {
            if (prgOne.costClsfc === '유료') {
                if (!window.IMP) return;
                //가맹점 식별
                const { IMP } = window;
                IMP.init("imp61108033");

                const toImpData = {
                    pg: "html5_inicis.INIpayTest",//PG사구분코드.{사이트코드},
                    pay_method: "card", // card
                    merchant_uid: sessionData.data.id + location.state.prgId,
                    name: location.state.prgNm,
                    amount: prgOne.prgFee,
                    // buyer_email: "gildong@gmail.com",
                    buyer_name: sessionData.data.username,
                    // buyer_tel: "010-0000-0000",
                    // buyer_addr: "서울특별시 강남구 신사동",
                    // buyer_postcode: "01181",
                    // m_redirect_url: ""
                }

                IMP.request_pay(toImpData, callback);
                return;
                // console.log(toImpData);
                // alert('일단 여기까지');
            }
            console.log(sessionData);
        } else return alert("로그인 후에 이용해주세요.")
    }

    function callback(response) {
        const { success, error_msg } = response;
        if (success) {
            console.log(success);
        } else {
            alert(`Order Faild !! : ${error_msg}`);
        }
    }

    return (
        <>
            <div className='userPrgDetails'>
                <div>
                    <img src={"/api/prg/prgSlideImg?prgId=" + location.state.prgId} alt="" />
                    <div>
                        <div><p>{location.state.prgNm}</p></div>
                        <div>
                            <div>모집일자</div><div>{location.state.plnPrd}</div>
                            <div>모집인원</div><div>{location.state.plnNmbPpl}</div>
                            <div>진행일자</div><div>{location.state.plnPrd.split("~")[1]}</div>
                            <div>등록일</div><div>{location.state.prgDate}</div>
                            <div>비용구분</div><div>{prgOne.costClsfc}</div>
                            <div>가격</div><div>{Number(prgOne.prgFee).toLocaleString()} 원</div>
                        </div>
                        <div><button type='button' onClick={portone}>신청하기</button></div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: location.state.content }}></div>
                <div>
                    <div>첨부파일:</div>
                    {location.state.prgFile === "" ? <div>첨부파일이 없습니다.</div> :
                        <div className='prgDetailsFile'>{
                            location.state.prgFile ? location.state.prgFile.split("?").map((e) => {
                                return (
                                    <div key={e}>
                                        <div>{e}</div>
                                        <button type='button' name={e} onClick={downloadFile}>다운로드</button>
                                    </div>
                                )
                            }) : <div>첨부파일이 없습니다.</div>
                        }</div>
                    }
                </div>
            </div>
        </>
    );
}

export default UserprogramDetails;