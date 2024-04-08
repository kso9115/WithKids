import React, { useEffect, useMemo } from 'react';
import './userprogram.css';
import { useLocation } from 'react-router-dom';
import { apiCall } from '../../server/apiService';
import { useState } from 'react';
import { API_BASE_URL } from "../../server/app-config";
import { toStringByFormatting } from '../../hooks/formdate';

function UserprogramDetails() {
    const [prgOne, setPrgOne] = useState({});
    const location = useLocation();
    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));
    
    useEffect(() => {
        apiCall('/prg/prgOne', 'POST', { prgId: location.state.prgId })
            .then((response) => {
                // setPrgOne(response.data)
                setPrgOne({
                    ...location.state,
                    costClsfc: response.data.costClsfc,
                    prgFee: response.data.prgFee
                });
            }).catch((error) => {
                console.error('프로그램 요금정보 가져오기 실패', error);
            })
    }, [location])

    const params = {
        memSerial: sessionData ? sessionData.data.id : null,
        memName: sessionData ? sessionData.data.username : null,
        prgDate: toStringByFormatting(new Date()),
        prgId: prgOne.prgId,
        prgNm: prgOne.prgNm,
        costClsfc: prgOne.costClsfc,
    }


    function downloadFile(event) {
        if (window.confirm(`${event.target.name} 파일을 다운로드 하시겠습니까?`))
            apiCall('/prg/filedownload', 'GET', {
                prgId: prgOne.prgId,
                prgDnm: prgOne.prgDnm,
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
    console.log(sessionData);
    function portone() {
        if (window.confirm('프로그램을 신청하시겠습니까?')) {
            apiCall('/user/aplCheck', 'GET', null, sessionData ? sessionData.data.token : null)
                .then((response) => {
                    if (prgOne.costClsfc === '유료') {
                        if (!window.IMP) return;
                        //가맹점 식별
                        const { IMP } = window;
                        IMP.init(response.data);

                        const toImpData = {
                            pg: "html5_inicis.INIpayTest",//PG사구분코드.{사이트코드},
                            pay_method: "card", // card
                            merchant_uid: sessionData.data.id + prgOne.prgId,
                            name: prgOne.prgNm,
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
                    } else prgAplSave(params);

                })
                .catch((error) => {
                    console.log(error);
                    alert("로그인 후에 이용해주세요.")
                })
        } else alert("취소 하셨습니다.")
    }

    function callback(response) {
        const { success, error_msg } = response;
        if (success) {
            console.log(response);
            const callbackData = {
                ...params,
                paidAmount: response.paid_amount,
                impUid: response.imp_uid,
                merchantUid: response.merchant_uid,
                pgTid: response.pg_tid,
            }
            prgAplSave(callbackData)
        } else {
            alert(`Order Faild !! : ${error_msg}`);
        }
    }

    function prgAplSave(data) {
        apiCall('/user/aplSave', 'POST', data, sessionData.data.token)
            .then((response) => {
                alert('신청이 완료 되었습니다.');
                console.log(response.data);
            })
            .catch((error) => {
                alert('신청에 실패했습니다.\n관리자에게 문의하세요.');
            })
    }
    return (
        <>
            <div className='userPrgDetails'>
                <div>
                    <img src={API_BASE_URL + "/api/prg/prgSlideImg?prgId=" + prgOne.prgId} alt="" />
                    <div>
                        <div><p>{prgOne.prgNm}</p></div>
                        <div>
                            <div>모집일자</div><div>{prgOne.plnPrd}</div>
                            <div>예상인원</div><div>{prgOne.plnNmbPpl} 명</div>
                            <div>진행일자</div><div>{prgOne.plnDate}</div>
                            <div>등록일</div><div>{prgOne.prgDate}</div>
                            <div>비용구분</div><div>{prgOne.costClsfc}</div>
                            <div>가격</div><div>{Number(prgOne.prgFee).toLocaleString()} 원</div>
                        </div>
                        <div><button type='button' onClick={portone}>신청하기</button></div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: prgOne.content }}></div>
                <div>
                    <div>첨부파일:</div>
                    {prgOne.prgFile === "" ? <div>첨부파일이 없습니다.</div> :
                        <div className='prgDetailsFile'>{
                            prgOne.prgFile ? prgOne.prgFile.split("?").map((e) => {
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