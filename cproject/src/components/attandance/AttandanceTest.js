import { useEffect, useRef, useState } from 'react';
import './attandanceTest.css'
import { Icon } from '@iconify/react'
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, addDays, addMonths } from 'date-fns';
// import ChildAttandanceList from './ChildAttandanceList';
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

    // 오늘 일자 확인
    const today = currentMonth.getDate();
    const month = currentMonth.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    const year = selectedDate.getFullYear();
    console.log(today);  // 1일
    console.log("지금 렌더링해야할 월은?" + month);  // 4월
    console.log(year);
    const date = year + "-" + month + "-" + today
    console.log(date);


    // 체크박스 전체선택, 특정 그룹 선택
    // const [selectAllChecked, setSelectAllChecked] = useState(false);
    // const [checkboxes, setCheckboxes] = useState({
    //     mojeon: false,
    //     migeum: false
    // });

    // const selectAllChange = (e) => {
    //     const { checked } = e.target;
    //     setSelectAllChecked(checked);
    //     setCheckboxes(prevState => ({
    //       ...prevState,
    //       mojeon: checked,
    //       migeum: checked,
    //     }));
    //   };

    //   const CheckboxChange = (event) => {
    //     const { name, checked } = event.target;
    //     setCheckboxes(prevState => ({
    //       ...prevState,
    //       [name]: checked
    //     }));
    //     if (!checked) {
    //       setSelectAllChecked(false);
    //     } else {
    //       // Check if all animal checkboxes are checked
    //       const allChecked = Object.values(checkboxes).every(checkbox => checkbox);
    //       setSelectAllChecked(allChecked);
    //     }
    //   };

    // 날짜 라이브러리
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

    // 해당하는 달의 일자만큼 전체 사이즈를 70%로
    for (let i = 1; i < size; i++) {
        rows += " " + 70 / size + "%";
    }

    if (format(monthStart, 'M') === format(startDate, 'M')) {
        count = format(startDate, 'd') * 1
    } else {
        count = format(addDays(startDate, 7), 'd') * 1
    }

    // 멤버 리스트 출력을 위해 DB로 요청보내기
    useEffect(() => {
        console.log("왜안들어와..?");
        const attList = () =>
            axios
                .get("/api/att/attList", {
                    month: month
                })
                .then((response) => {
                    console.log("attList 요청들어오냐?");    // 들어옴
                    // console.log(response.data);
                    setAttData(response.data);
                }).catch((err) => {
                    console.log("들어오나?");
                    console.log(err);
                })
        attList();  // attList매핑을 위해..
    }, [memAttDataOne, currentMonth]); // 리스트 중 한명이라도 출결석 변경 시 렌더링..전체를 할 필요가 있나?
    // console.log(attData);
    // console.log(memAttDataOne);
    console.log("오늘" + format(currentMonth, 'M'));
    console.log(attData);

    return (
        <div className="att_mng">
            <div>
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
                {format(currentMonth, 'yyyy')}년
                {format(currentMonth, 'M')}월
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
                <div style={{ display: thisMonth }}>!!이번달!!</div>
                <span>today : {format(today, 'd')}일</span>

            </div>
            <div></div>
            <div>
                <div className='att_mng_list' style={{
                    display: 'grid',
                    gridTemplateColumns: "2% 8% 5% 5% 5% 5% " + rows
                }}>
                    <div><input type="checkbox" /></div>
                    <div>
                        <select>
                            <option type="checkbox" value="allattandance"
                            // checked={selectAllChecked}
                            // onChange={selectAllChange}
                            >전체그룹</option>
                            <option type="checkbox" value="mojeon" id="mojeon" name="admissionAtt"
                            // checked={checkboxes.mojeon}
                            // onChange={CheckboxChange}
                            >모전</option>
                            <option type="checkbox" value="migeum" id="migeum" name="admissionAtt"
                            // checked={checkboxes.migeum}
                            // onChange={CheckboxChange}
                            >미금</option>
                        </select>
                    </div>
                    <div>이름</div>
                    <div>출석률</div>
                    <div>출석</div>
                    <div>결석</div>
                    {Array.from({ length: size }, (_, index) => {
                        // 4월기준 6일 index : 5(0부터시작)
                        // count : 첫 주의 시작 7
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
                            {/* 기존코드 */}
                            <div><input type="checkbox" /></div>
                            <div>모전</div>
                            <div>{o.memName}</div>
                            <div style={{
                                fontSize: 11
                            }}>{o.attDate}</div>
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

                                for (let index = 0; index < o.attDate.length; index++) {


                                }
                                // {Array.from({ length: o.attDate }, (_, index) => {

                                //         const attendanceStatus = o.attStatus[index]; // 예시로, attData의 객체 안에 있는 attendanceStatus 배열로 가정합니다.
                                //         let color = '';

                                //         // 출결 상태에 따라 색상 지정
                                //         if (attendanceStatus === '출석') {
                                //             // 출석
                                //         } else if (attendanceStatus === '결석') {
                                //             // 결석
                                //         } else {

                                //         }

                                //         return (
                                //             <div>

                                //             </div>
                                //         )
                                //     })
                                // }

                                return (
                                    <div
                                        // className={color} 
                                        // 기본적으로 index가 0에서 시작하기때문에
                                        key={index + 1}>

                                    </div>
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

