 import {useState, useEffect} from 'react';
 import { Icon } from '@iconify/react'
 import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, addDays, addMonths } from 'date-fns';
 import axios from 'axios';

function MealManagement() {

    // mealMng DB 전체 list
    const [mealData, setMealData] = useState();

    // mealMng 테이블 list useState
    const [memMealDataOne, setMemMealDataOne] = useState({});

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    let day = startDate;
    let count = 0;
    let color = "";

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
        const mealList = () =>
            axios
                .get("/api/meal/mealList")
                .then((response) => {
                    console.log("요청들어오냐?");
                    // console.log(response.data);
                    setMealData(response.data);
                }).catch((err) => {
                    console.log("에러요청?");
                    console.log(err);
                })
        mealList();  // mealList매핑을 위해..
    }, [memMealDataOne]); // 리스트 중 한명이라도 출결석 변경 시 렌더링..전체를 할 필요가 있나?
    console.log(mealData);
    console.log(memMealDataOne);

    const starD=[];

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
        <div className="">
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
                    gridTemplateColumns: "10% 5% 5%" + rows + " 10% "
                }}>
                    <div>전체그룹</div>
                    <div>이름</div>
                    <div>구분
                        <div>조</div>
                        <div>중</div>
                        <div>석</div>
                        <div>간</div>
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

                <div className='meal_mng_list' style={{
                    display: 'grid',
                    gridTemplateColumns: "10% 5% 5% " + rows + "10%",
                }}> 
                    {mealData && mealData.map((o, i) => (
                       
                            <div>
                                <div>{o.memName}</div>
                                <div>{o.memName}</div>
                                <div>{o.memName}</div>
                                <div>
                                    <div>{o.brfMeal}</div>
                                    <div>{o.lncMeal}</div>
                                    <div>{o.dnrMeal}</div>
                                    <div>{o.snkMeal}</div>
                                </div>
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
                                <div>끝 </div>  
                            </div> 
                        
                        ))}
                
                    
                </div>
            </div>
        </div>
    );

}

export default MealManagement;

