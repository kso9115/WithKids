import './MemberList.css';
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiCall } from "../../server/apiService"

// setData={setMemDataOne}  serEduData={setEduMemOne}
// function MemberList({ setData, memListUpdate, setMemListUpdate }) {
function MemberList({ name, setData, memListUpdate }) {
    const [memData, setMemData] = useState([]); // memData : DB 멤버 전체 테이블 저장

    useEffect(() => {
        if (memListUpdate !== true && memListUpdate !== false) {
            apiCall(`/${name.name}/${name.name}Search`, 'GET', memListUpdate)
                .then((response) => {
                    setMemData(response.data);
                    setData([]);    // 디테일 비워주기
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            apiCall(`/mem/memList`, "GET")
                .then((response) => {
                    //console.log(response.data); // 데이터 전달 확인용
                    setMemData(response.data);
                }).catch((err) => {
                    console.log(err);
                })
        }
    }, [memListUpdate]);

    // 이전버전
    // useEffect(() => {
    //     apiCall("/mem/memList", "GET").then((response) => {
    //         console.log(response.data); // 데이터 전달 확인용
    //         setMemData(response.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     })

    //     function SearchBox(src) {

    //         apiCall(`/${src == "1" ? "mem/memSearch" : "adm/searchBox"}`, "GET", memListUpdate)
    //             apiCall('/mem/memSearch', 'GET', memListUpdate)
    //                 .then((response) => {
    //                     console.log("서치박스!!!" + response.data);
    //                     setMemData(response.data);
    //                 }).catch((err) => {
    //                     console.log(err);
    //                 })

    //             apiCall('/adm/searchBox', 'GET', memListUpdate)
    //             .then((response) => {
    //                 console.log("서치박스!!!" + response.data);
    //                 setMemData(response.data);
    //             }).catch((err) => {
    //                 console.log(err);
    //             })

    //         console.log(memListUpdate);

    //         apiCall(`/${src == "1" ? "mem/memSearch" : "adm/searchBox"}`, "GET", { params: memListUpdate })
    //         .then((response)=>{
    //             console.log("서치박스!!!" + response.data);
    //                 setMemData(response.data);
    //         }).catch((err)=>{
    //             console.log(err);
    //         })

    //         axios
    //             .get(`/api/${src == "1" ? "mem/memSearch" : "adm/searchBox"}`, { params: memListUpdate })
    //             .then((res) => {
    //                 console.log("서치박스!!!" + res.data);
    //                 setMemData(res.data);
    //             }).catch((err) => {
    //                 console.log(err);
    //             })
    //     }

    //     // 위의 요청을 처리해주기 위함
    //     if (memListUpdate !== true && memListUpdate !== false) {
    //         SearchBox(1);
    //     } else {
    //         SearchBox(2);
    //     }
    //     // else memList();
    // }, [memListUpdate]);

    return (
        <>
            <b>{name.list}</b>

            <div className={`memList`} >
                <div className={`memList_container`}>
                    <div className={`memList_row memheader`}>
                        {/* <div className="memberList_cell">번호</div> */}
                        {name.title.map((o, i) => {
                            return (<div className={`memList_cell`} key={`${name.name}head${i}`}>{o}</div>);
                        })}
                    </div>

                    {memData && memData.map((o, i) => {
                        return (
                            // <div className={`memList_row`}>
                                <div className={`memList_row memdata`} key={o + i} onClick={() => setData({ ...o })}>
                                    {name.menu.map((o2, i2) => {
                                        return (<div className={`memList_cell`} key={o2 + i2}>{o[o2]}</div>)
                                    })}
                                </div>
                            // </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default MemberList;
