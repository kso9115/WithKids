import './MemberList.css';
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

// setData={setMemDataOne}  serEduData={setEduMemOne}
function MemberList({ setData, setEduDataOne }) {
    const [memData, setMemData] = useState([]); // memData : DB 멤버 전체 테이블 저장

    // 멤버 테이블 전체 데이터에 접근
    useEffect(() => {
        axios
            .get("/api/mem/memList")
            .then((res) => {
                // console.log(res.data); // 데이터 전달 확인용
                setMemData(res.data);
            })
    }, []);

    // setData, setEduDataOne 둘다 실행하기 위한 함수 추가
    // const handleRowClick = (memData) => {
    //     setData(memData);
    //     setEduDataOne(memData);
    //   }

    return (
        <>
            <b>대상자 리스트</b>

            <div className="memberList">
                <div className="memberList_container">
                    <div className="memberList_row header">
                        <div className="memberList_cell">번호</div>
                        <div className="memberList_cell">대상자번호</div>
                        <div className="memberList_cell">대상자명</div>
                        <div className="memberList_cell">성별</div>
                        <div className="memberList_cell">생년월일</div>
                    </div>

                    {memData && memData.map((o, i) => (
                        // key값에 인덱스보다는 식별번호 넣어주기 -> 인덱스는 최후의 수단?으로 입력
                        <div className="memberList_row" key={o.memSerial} onClick={() => setData(o)}>
                            <div className="memberList_cell">★</div>
                            <div className="memberList_cell">{o.memSerial}</div>
                            <div className="memberList_cell">{o.memName}</div>
                            <div className="memberList_cell">{o.memSex}</div>
                            <div className="memberList_cell">{o.memBirth}</div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    );
}

export default MemberList;