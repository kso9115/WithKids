import axios from "axios";
import { useEffect, useState } from "react";
import Attandance from './Attandance';


function ChildAttandanceList({size, rows, memAttDataOne, setMemAttDataOne }) {

    // Attandance DB 전체 list
    const [attData, setAttData] = useState();

    useEffect(() => {
        console.log("1111");
        const attList = () =>
            axios
                .get("/api/att/attList")
                .then((response) => {
                    console.log("요청들어오냐?");
                    console.log(response.data);
                    setAttData(response.data);
                }).catch((err) => {
                    console.log("들어오나?");
                    console.log(err);
                })
            attList();  // attList매핑을 위해..
    }, [memAttDataOne]); // 리스트 중 한명이라도 출결석 변경 시 렌더링..전체를 할 필요가 있나?
    console.log(attData);
    console.log(memAttDataOne);

    return (
        <>
            
        </>
    );
}

export default ChildAttandanceList;