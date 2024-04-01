import React, { useEffect, useState } from 'react';
import './userprogram.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


function UserprogramDetails() {
    const [prgData, setPrgData] = useState([]);
    const location = useLocation();
    console.log(location.state);

    function downloadFile(event) {
        if (window.confirm(`${event.target.name} 파일을 다운로드 하시겠습니까?`))
            axios({
                url: '/api/prg/filedownload', // 스프링 서버의 파일 다운로드 엔드포인트
                method: 'GET',
                responseType: 'blob', // 파일 다운로드를 위해 responseType을 'blob'으로 설정
                params: {
                    prgId: location.state.prgId,
                    prgDnm: location.state.prgDnm,
                    fileName: event.target.name
                }
            })
                .then(response => {
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
                .catch(error => {
                    console.error('파일 다운로드 실패:', error);
                });
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
                        </div>
                        <div><button>신청하기</button></div>
                    </div>
                </div>
                <div>{location.state.content}</div>
                <div>
                    <div>첨부파일:</div>
                    {location.state.prgFile === "" ? <div>첨부파일이 없습니다.</div> :
                        <div className='prgDetailsFile'>{
                            location.state.prgFile.split(" ").map((e) => {
                                return (
                                    <div key={e}>
                                        <div>{e}</div>
                                        <button type='button' name={e} onClick={downloadFile}>다운로드</button>
                                    </div>
                                )
                            })
                        }</div>
                    }
                </div>
            </div>
        </>
    );
}

export default UserprogramDetails;