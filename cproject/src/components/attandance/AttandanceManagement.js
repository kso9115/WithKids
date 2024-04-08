import React, { useEffect, useRef, useState } from 'react';
import './attandanceTest.css'
import { Icon } from '@iconify/react'
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, addDays, addMonths } from 'date-fns';
// import ChildAttandanceList from './ChildAttandanceList';
import axios from 'axios';
import { apiCall } from '../../server/apiService';

function AttandanceMangement() {

    // Attandance : DB 전체 list
    const [attData, setAttData] = useState([]);   // 출석 list
    // Member : Attandance 중복없는 memSerial list useState
    const [admissionData, setAdmissionData] = useState([]); // 이름 serial list

    // Attandance 한명 useState : 출/결석 변경을 위한 상태값
    const [memAttDataOne, setMemAttDataOne] = useState({});

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());


    // 출/결석 변경을 위한 요청 발송 1
    const handleAttendanceChange = (memSerial, memName, day, currentStatus, index) => {
        const newStatus = currentStatus === '출' ? '결' : '출';
        attData[index].attStatus = newStatus;
        console.log(memSerial);
        console.log(newStatus);
        console.log(day);

        // const params = { memSerial, day, newStatus } 
        // 출석 상태 변경 요청 보내기
        apiCall('/att/attChange', 'POST',
            {
                memSerial: memSerial,
                memName: memName,
                attDate: day,
                attStatus: newStatus
            })
            .then(response => {
                // controller 확인 시 response에는 지금 message를 전달하고 있음

                // 출석 status 변경 : 콜백사용하여 이전 상태 데이터 배열을 업데이트
                // attData는 배열 내 하나의 객체들이 쭉 담겨있는 상태이므로 [ ] 중괄호 안에 펼쳐줘야 typeError미발생
                setAttData([...attData]);

            })
            .catch(error => {
                console.error('출석 상태 변경 실패:', error);
            });
    };

    // 출석 리스트(입소리스트) & 리스트 별 출석 현황 요청
    useEffect(() => {
        // 멤버 리스트 출력을 위해 DB로 요청보내기 : 리스트를 가지고 오기 위한 DB요청(1~31일 데이터 나열)
        apiCall("/att/attList", "GET", { yearMonth: format(currentMonth, 'yyyy-MM') })
            .then((response) => {
                setAttData(response.data);
            }).catch((err) => {
                console.log(err);
            })

        // 입소중인 멤버 리스트 요청
        apiCall("/mem/admissionList", "GET")
            .then((response) => {
                console.log(response.data);
                setAdmissionData(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [format(currentMonth, 'yyyy-MM'),]); // 리스트 중 한명이라도 출결석 변경 시 렌더링..전체를 할 필요가 있나?

    // 오늘 일자 확인 => 지우기 필요없슴
    const today = currentMonth.getDate();
    const month = currentMonth.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    const year = currentMonth.getFullYear();
    // console.log(today);  // 1일
    // console.log("currentMonth를 찍으면?" + currentMonth);
    // console.log("지금 렌더링해야할 월은?" + month);  // 4월
    // console.log(year);
    // console.log(date);


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
    //       ...prevState,;
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

    // 출석률 계산
    var attDate;

    console.log(startDate);

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

    // console.log("보낼날짜확인" + format(currentMonth, 'yyyy-MM'));




    // console.log(attData);
    // console.log(admissionData);



    return (
        <div className="att_mng">
            <div>
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
                {format(currentMonth, 'yyyy')}년
                {format(currentMonth, 'M')}월
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
                <div style={{ display: thisMonth }}>오늘의 날짜는 : {format(currentMonth, 'dd')}일</div>

            </div>
            <div></div>
            <div>
                <div className='att_mng_list' style={{
                    display: 'grid',
                    gridTemplateColumns: "2% 8% 5% 5% 5% 5% " + rows,
                    backgroundColor: "var(--admin)",
                }}>
                    <div><input type="checkbox" /></div>
                    <div>대상자 번호</div>
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
                            <div className={color} key={index + 1}>{index + 1}

                            </div>
                        );
                    })}
                </div>

                {admissionData && admissionData.map((o, i) => {
                    return (
                        <div className='att_mng_list' style={{
                            display: 'grid',
                            gridTemplateColumns: "2% 8% 5% 5% 5% 5% " + rows,
                        }}>
                            <>
                                {/* 우측에서는 체크박스, serial, 이름만 출력  */}
                                <div><input type="checkbox" /></div>
                                <div>{o.memSerial}</div>
                                <div>{o.memName}</div>
                                <div></div>
                                <div></div>
                                <div></div>

                                {/* index : 날짜 count : 첫 번째 주 일요일*/}
                                {Array.from({ length: size }, (_, index) => {
                                    let day;

                                    // 날짜가 한자리 수 일 때 앞에 0을 붙여줘야된다
                                    if (index.length == 1) {
                                        day = "0" + (index + 1);
                                    } else {
                                        day = "" + (index + 1);
                                    }
                                    // 시리얼 번호 비교 & 날짜 데이터 동일한지 비교하고 찾기
                                    // console.log(attData);
                                    // console.log(o.memSerial);

                                    let count = attData.find((item) => (item.memSerial === o.memSerial) && (parseInt(item.attDate.split("-")[2]) === parseInt(day)));
                                    let attindex = attData.findIndex((item) => (item.memSerial === o.memSerial) && (parseInt(item.attDate.split("-")[2]) === parseInt(day)));
                                    console.log();
                                    attDate = (index + 1);
                                    // console.log(count);
                                    // console.log(attindex);

                                    if (count) {
                                        return (

                                            <div
                                                className="attandance_data"
                                                // 기본적으로 index가 0에서 시작하기때문에 + 1
                                                key={index + 1}
                                                // onClick={() => setAttData([count.attStatus])}>
                                                onClick={() => handleAttendanceChange(o.memSerial, o.memName, count.attDate, count.attStatus, attindex)}>
                                                {count.attStatus}


                                            </div>

                                        );
                                    } else {
                                        return (
                                            <div key={index + 1}>
                                                {/* 출석이 없으면 빈문자열 반환 */}-
                                            </div>
                                        )
                                    }
                                })}

                            </>
                        </div>
                    )
                })}
                <div className='att_mng_list'
                    style={{
                        display: 'grid',
                        gridTemplateColumns: "2% 8% 5% 5% 5% 5% " + rows,
                    }}
                >
                    <div></div>
                    <div>합계</div>
                    <div>하는게</div>
                    <div>맞을까?</div>
                    <div></div>
                    <div></div>

                </div>
                <div className='buttonBox'>
                    <div>
                        <button type="submit" value='출석등록' >출석 등록</button>
                        <button type="submit" value='출석삭제'>출석 삭제</button>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default AttandanceMangement;

