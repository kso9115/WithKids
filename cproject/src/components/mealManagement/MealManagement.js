import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react'
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, addDays, addMonths } from 'date-fns';
import axios from 'axios';
import './mealManagement.css'

function MealManagement() {

    // mealMng DB 전체 list
    const [memData, setMemData] = useState([]); // 이름과 serial 번호 받기 
    const [mealData, setMealData] = useState([]); // mealList 받아오기 

    // mealMng 테이블 list useState
    // const [memMealDataOne, setMemMealDataOne] = useState({});

    const [currentMonth, setCurrentMonth] = useState(new Date()); // 내가 보려고 선택한 달
    const [selectedDate, setSelectedDate] = useState(new Date()); // 현재 2024년의 몇월 달 (현재기준 4월)

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    // let day = startDate;
    let count = 0;
    let color = "";

    // 날짜 및 시간을 원하는 형태의 문자열로 변경 
    const thisMonth = format(currentMonth, 'yyyy') + format(currentMonth, 'M')
        === format(selectedDate, 'yyyy') + format(selectedDate, 'M') ? "block" : "none";
    
        let size = format(monthEnd, 'd');
    let rows = 60 / size + "%";

    //이전 월 혹은 다음 월 선택 했을 때, 이동
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    for (let i = 1; i < size; i++) {
        rows += " " + 60 / size + "%";
    }

    if (format(monthStart, 'M') === format(startDate, 'M')) {
        count = format(startDate, 'd') * 1
    } else {
        count = format(addDays(startDate, 7), 'd') * 1
    }

    useEffect(() => {
        console.log("1111");
        const mealList = () =>
            axios
                .get("/api/meal/mealList")
                .then((response) => {
                    console.log("mealList에 대한 요청");
                    setMealData(response.data);
                }).catch((err) => {
                    console.log("mealList에 대한 요청 에러 => " + err);
                });
        const memList = () =>
            axios
                .get("/api/mem/memList")
                .then((res) => {
                    // console.log(res.data); // 데이터 전달 확인용
                    setMemData(res.data);
                    // setMemListUpdate(!memListUpdate);  // 렌더링이 두번 일어나도 어쩔수없지..리스트 바뀌는거 감지하면 바로 리스트 업데이트 진행해주는거
                }).catch((err) => {
                    console.log(err);
                })

        memList()
        mealList();  // mealList매핑을 위해..
    }, [mealData]); // 리스트 중 한명이라도 출결석 변경 시 렌더링..전체를 할 필요가 있나?
    console.log(mealData);
    // console.log(memMealDataOne);

    // for(let i = 1; i < untilrow ;i++){
    //     const memS = `user2024950808f${i}`;
    //     if(memS){

    //         for(let j = 1 ; j < 31; j++){
    //             if(mealData.brfMeal===0) starD.push(<span>X</span>)
    //             else if(mealData.brfMeal===1) starD.push(<span>O</span>)
    //             if(mealData.lncMeal===0) starD.push(<span>X</span>)
    //             else if(mealData.lncMeal===1) starD.push(<span>O</span>)
    //             if(mealData.dnrMeal===0) starD.push(<span>X</span>)
    //             else if(mealData.dnrMeal===1) starD.push(<span>O</span>)
    //             if(mealData.snkMeal===0) starD.push(<span>X</span>)
    //             else if(mealData.snkMeal===1) starD.push(<span>O</span>)
    //         }
    //     }
    // }

    // mealData && mealData.map((meal) => {

    //     for (let j = 1; j <= 31; j++) {
    //       if (meal.brfMeal === 0) starD.push(<span key={`brf-${j}`}>X</span>);
    //       else if (meal.brfMeal === 1) starD.push(<span key={`brf-${j}`}>O</span>);
    //       if (meal.lncMeal === 0) starD.push(<span key={`lnc-${j}`}>X</span>);
    //       else if (meal.lncMeal === 1) starD.push(<span key={`lnc-${j}`}>O</span>);
    //       if (meal.dnrMeal === 0) starD.push(<span key={`dnr-${j}`}>X</span>);
    //       else if (meal.dnrMeal === 1) starD.push(<span key={`dnr-${j}`}>O</span>);
    //       if (meal.snkMeal === 0) starD.push(<span key={`snk-${j}`}>X</span>);
    //       else if (meal.snkMeal === 1) starD.push(<span key={`snk-${j}`}>O</span>);
    //     }
    //    starD.push(<br/>);
    //   }); 
    //   console.log({starD});


    return (
        <div className="mealBox">
            <div>
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
                {format(currentMonth, 'yyyy')}년
                {format(currentMonth, 'M')}월
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
                <div style={{ display: thisMonth }}>이번달</div>
            </div>
            <div></div>
            <div>
                <div className='meal_mng_list' style={{
                    display: 'grid',
                    gridTemplateColumns: "10% 5% 5%" + rows + " 20% "
                }}>
                    <div>아동식별번호</div>
                    <div>이름</div>
                    <div>구분

                    </div>

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

                    <div>합계</div>
                </div>

                {memData.map((o, i) => {
                    return (
                        <div className='meal_mng_list' style={{
                            display: 'grid',
                            gridTemplateColumns: "10% 5% 5% " + rows + "10%",
                        }}>
                            <div>{o.memSerial}</div>
                            <div>{o.memName}</div>
                            <div>
                                <div>조</div>
                                <div>중</div>
                                <div>석</div>
                                <div>간</div>
                                {/* <div>{o.brfMeal}</div>
                                    <div>{o.lncMeal}</div>
                                    <div>{o.dnrMeal}</div>
                                    <div>{o.snkMeal}</div> */}
                            </div>
                            {Array.from({ length: size }, (_, index) => {
                                let day;

                                if (index.length == 1) {
                                    day = "0" + index;
                                } else {
                                    day = "" + index;
                                }
                                // let count = mealData.find((item) => (item.memSerial === o.memSerial) && (item.mealDate.split("-")[2] === day));
                                let count = mealData.find((item) => (item.memSerial === o.memSerial) && (parseInt(item.mealDate.split("-")[2]) === parseInt(day)));
                                if (count) {
                                    return (
                                        <div key={index + 1}>
                                            <div>{count.brfMeal}</div>
                                            <div>{count.lncMeal}</div>
                                            <div>{count.dnrMeal}</div>
                                            <div>{count.snkMeal}</div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            // className={color} 
                                            key={index + 1}></div>
                                    );
                                }
                            })}
                            <div></div>
                        </div>
                    )


                })}
            </div>
        </div>
    );

}

export default MealManagement;

