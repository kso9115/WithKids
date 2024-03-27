import './MemberList.css';
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

// setData={setMemDataOne}  serEduData={setEduMemOne}
function MemberList({ setData, memListUpdate, setMemListUpdate }) {
    const [memData, setMemData] = useState([]); // memData : DB 멤버 전체 테이블 저장

    // 기존 리스트만 출력하는 코드 : 멤버 테이블 전체 데이터에 접근
    // useEffect(() => {
    //     axios
    //         .get("/api/mem/memList")
    //         .then((res) => {
    //             // console.log(res.data); // 데이터 전달 확인용
    //             setMemData(res.data);
    //             // setMemListUpdate(!memListUpdate);  // 렌더링이 두번 일어나도 어쩔수없지..리스트 바뀌는거 감지하면 바로 리스트 업데이트 진행해주는거
    //         })
    // }, []);

    useEffect(() => {
        const memList = () =>
            axios
                .get("/api/mem/memList")
                .then((res) => {
                    console.log(res.data); // 데이터 전달 확인용
                    setMemData(res.data);
                    // setMemListUpdate(!memListUpdate);  // 렌더링이 두번 일어나도 어쩔수없지..리스트 바뀌는거 감지하면 바로 리스트 업데이트 진행해주는거
                }).catch((err) => {
                    console.log(err);
                })

        // const memSearchAndAdmSearch = () => {
        //     const url = memSearchType === "memSearch" ? "/api/mem/memSearch" : "/api/adm/searchBox/";
        //     fetchData(url);
        // };

        // const fetchData = (url) => {
        //     axios
        //         .get(url, { params: memListUpdate })
        //         .then((res) => {
        //             setMemData(res.data);
        //             console.log(res.data); // 필요에 따라 콘솔 로그를 추가하거나 제거할 수 있습니다.
        //         })
        //         .catch((err) => {
        //             console.log("에러남 -" + err);
        //         });
        // };

        // 서치박스로의 요청
        // const memSearch = () =>
        //     axios
        //         .get("/api/mem/memSearch", { params: memListUpdate }, { search: mem })
        //         .then((res) => {
        //             setMemData(res.data);
        //         }).catch((err) => {
        //             console.log(err);
        //         })
        // const admSearch = () => axios
        //     .get("/api/adm/searchBox", { params: memListUpdate }, { search: adm })
        //     .then((res) => {
        //         setMemData(res.data);
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log("에러남 -" + err);
        //     })

        function SearchBox(src) {
            console.log(memListUpdate);
            axios
                .get(`/api/${src == "1" ? "mem/memSearch" : "adm/searchBox"}`, { params: memListUpdate })
                .then((res) => {
                    console.log("서치박스!!!"+res.data);
                    setMemData(res.data);
                }).catch((err) => {
                    console.log(err);
                })
        }

        // 위의 요청을 처리해주기 위함
        if (memListUpdate !== true && memListUpdate !== false) {
            SearchBox(1);
            }
        else memList();
    }, [memListUpdate]);

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