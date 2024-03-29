import { useEffect, useRef, useState } from 'react';
import './attandanceTest.css'
import { Icon } from '@iconify/react'
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, addDays, addMonths } from 'date-fns';
import ChildAttandanceList from './ChildAttandanceList';
import axios from 'axios';

// function ChildComponent({ rows }) {

//     return (
//         <div className='att_mng_list' style={{
//             display: 'grid',
//             gridTemplateColumns: "2% 8% 5% 5% 5% 5% " + rows
//         }}>

//         </div>
//     );
// }

function AttandanceMangement() {

    // Attandance DB 전체 list
    const [attData, setAttData] = useState();


    // Attandance테이블 list useState
    const [memAttDataOne, setMemAttDataOne] = useState({});

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    let day = startDate;
    let count = 0;
    let color = ""
    const thisMonth = format(currentMonth, 'yyyy') + format(currentMonth, 'M')
        === format(selectedDate, 'yyyy') + format(selectedDate, 'M') ? "block" : "none";
    let size = format(monthEnd, 'd');
    let rows = 70 / size + "%";

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    for (let i = 1; i < size; i++) {
        rows += " " + 70 / size + "%";
    }

    if (format(monthStart, 'M') === format(startDate, 'M')) {
        count = format(startDate, 'd') * 1
    } else {
        count = format(addDays(startDate, 7), 'd') * 1
    }

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
        <div className="att_mng">
            <div>
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
                {format(currentMonth, 'yyyy')}년
                {format(currentMonth, 'M')}월
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
                <div style={{ display: thisMonth }}>이번달</div>
            </div>
            <div></div>
            <div>
                <div className='att_mng_list' style={{
                    display: 'grid',
                    gridTemplateColumns: "2% 8% 5% 5% 5% 5% " + rows
                }}>
                    <div><input type="checkbox" /></div>
                    <div><select></select></div>
                    <div>이름</div>
                    <div>출석률</div>
                    <div>출석</div>
                    <div>결석</div>
                    {Array.from({ length: size }, (_, index) => {
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
                    })}
                </div>
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
                            {Array.from({ length: size }, (_, index) => {
                                // if ((index + 1) % 7 === (count - 1) % 7) {
                                //     color = "colorBlue"
                                // } else if ((index + 1) % 7 === (count) % 7) {
                                //     color = "colorRed"
                                // } else {
                                //     color = ""
                                // }
                                return (
                                    <div
                                        // className={color} 
                                        key={index + 1}></div>
                                );
                            })}

                        </>
                    ))}


                </div>
            </div>
        </div>
    );

}

export default AttandanceMangement;

