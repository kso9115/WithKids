import axios from "axios";
import { useEffect, useState } from "react";
import Attandance from './Attandance';


function ChildAttandanceList({ rows, memAttDataOne, setMemAttDataOne }) {

    // Attandance DB 전체 list
    const [attData, setAttData] = useState();

    useEffect(() => {
        const attList = () =>
            axios
                .post("/api/att/attList")
                .then((response) => {
                    console.log(response.data);
                    setAttData(response.data);
                }).catch((err) => {
                    console.log(err);
                })
    }, [memAttDataOne]); // 리스트 중 한명이라도 출결석 변경 시 렌더링..전체를 할 필요가 있나?

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