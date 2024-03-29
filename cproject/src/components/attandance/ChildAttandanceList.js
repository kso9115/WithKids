import axios from "axios";
import { useEffect, useState } from "react";
import Attandance from './Attandance';


function ChildAttandanceList({ rows, memAttDataOne, setMemAttDataOne }) {

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
            <div className='att_mng_list' style={{
                display: 'grid',
                gridTemplateColumns: "2% 8% 5% 5% 5% 5% " + rows
            }}>
                {attData && attData.map((o, i) => (
                    <>
                        <div><input type="checkbox" /></div>
                        <div><select></select></div>
                        <div>{o.memName}</div>
                        <div>출석률</div>
                        <div>{o.attStatus}</div>
                        <div>결석</div>
        
                    </>            
                ))}
                {/* {Array.from({ length: size }, (_, index) => {
                    if ((index + 1) % 7 === (count - 1) % 7) {
                        color = "colorBlue"
                    } else if ((index + 1) % 7 === (count) % 7) {
                        color = "colorRed"
                    } else {
                        color = ""
                    }
                    return (
                        <div className={color} key={index + 1}>{index + 1}</div>
                    );
                })} */}

            </div>
        </>
    );
}

export default ChildAttandanceList;