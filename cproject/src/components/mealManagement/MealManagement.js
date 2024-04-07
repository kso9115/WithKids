import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react'
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, addDays, addMonths } from 'date-fns';
import axios from 'axios';
import './mealManagement.css'
import { apiCall } from '../../server/apiService';

function MealManagement() {

    // mealMng DB 전체 list
    const [memData, setMemData] = useState([]); // 이름과 serial 번호 받기 
    const [mealData, setMealData] = useState([]); // mealList 받아오기 

    // mealMng 테이블 list useState
    // const [memMealDataOne, setMemMealDataOne] = useState({});

    const [currentMonth, setCurrentMonth] = useState(new Date()); // 내가 보려고 선택한 달
    const [selectedDate, setSelectedDate] = useState(new Date()); // 현재 2024년의 몇월 달 (현재기준 4월)

    // currentMonth 
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    // 체크 박스 만들기 => 값을 읽어오기 
    const mealCatagoryList = [
        { name: '조식', value:'brf_meal'},
        { name: '중식', value: 'lnc_meal' },
        { name: '석식', value: 'dnr_meal' },
        { name: '간식', value: 'snk_meal' },
    ]
    const [checkedMealList, setCheckedMealList] = useState({
        brf_meal: true,
        lnc_meal: true,
        dnr_meal: true,
        snk_meal: true
    }); // 체크된 항목 List를 담아두는 useState
    // const [checked, setChecked] = useState(true); // 체크 여부 판단
    
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
        // console.log("1111");
        const mealList = () => 
        console.log(format(currentMonth,"yyyy-MM"));
        // axios.
        //     get("/api/meal/mealListYM", {
        //         params: {
        //             yearMonth : format(currentMonth,"yyyy-MM")
        //         }
        //     })
        apiCall('/meal/mealListYM','GET',{
            yearMonth : format(currentMonth,"yyyy-MM")
        },null)
            .then((response) => {
                console.log("mealList에 대한 요청");
                console.log(response.data);
                setMealData(response.data);
            })
            .catch((err) => {
                console.log("mealList에 대한 요청 에러 => " + err);
            });
            console.log(mealData);
            // 변경 전
            // axios 
            //     .get("/api/meal/mealList")
            //     .then((response) => {
            //         console.log("mealList에 대한 요청");
            //         setMealData(response.data);
            //     }).catch((err) => {
            //         console.log("mealList에 대한 요청 에러 => " + err);
            //     });
        const memList = () =>
            // axios
            //     .get("/api/mem/admissionList")
            apiCall('/mem/admissionList','GET',null,null)
                .then((res) => {
                    // console.log(res.data); // 데이터 전달 확인용
                    setMemData(res.data);
                    // setMemListUpdate(!memListUpdate);  // 렌더링이 두번 일어나도 어쩔수없지..리스트 바뀌는거 감지하면 바로 리스트 업데이트 진행해주는거
                }).catch((err) => {
                    console.log(err);
                })

        memList()
        mealList();  // mealList매핑을 위해..
    }, [format(currentMonth,"yyyy-MM")]); // 리스트 중 한명이라도 출결석 변경 시 렌더링..전체를 할 필요가 있나?
    // console.log(mealData);
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



    const  onCheckedItem = useCallback(
        (checked, item) => {
            checkedMealList[item] = checked;
            setCheckedMealList({...checkedMealList});
            // if(checked) { 
            //     checkedMealList.set.add(item);
            //     checkedMealList.arr = "," + Array.from(checkedMealList.set).join(',');
            //     setCheckedMealList({...checkedMealList});
            //     setChecked(!checked);
            // } else if(!checked) {
            //     checkedMealList.set.delete(item);
            //     if(checkedMealList.set.size === 0 ) checkedMealList.arr = "";
            //     else checkedMealList.arr = "," + Array.from(checkedMealList.set).join(',');
            //     setCheckedMealList({...checkedMealList});
            //     setChecked(!checked);
            // }
        },[checkedMealList]
    );
    console.log(checkedMealList); // 내부에 있는 것과 외부에 있는 것의 차이 : onCheckedItem 읽고 난 후 , set 되기 때문에, 내부에 있으면 미변경
    
    // 체크 박스에 대한 search하기
    // const axiosCall=()=> {
    //     apiCall("/meal/searchList", 'GET', {
  
    //     }, null)
    //     .then((response) => {
    //         console.log("searchList 대한 요청");
    //         setMealData(response.data);
    //     })
    //     .catch((err) => {
    //         console.log("mealList에 대한 요청 에러 => " + err);
    //     });
    // }

    return (
        <div className="mealBox">
            <div className='mealCheckbox'>
                <h3>급식 구분 조회</h3>
                {
                    mealCatagoryList.map((item)=>{
                        return(
                            <label key={item.name} >
                                <input 
                                    type='checkbox' 
                                    defaultChecked='checked'
                                    id={item.value}
                                    onChange={(e)=>{
                                        onCheckedItem(e.target.checked, e.target.id);
                                    }}
                                />
                                <label htmlFor={item.name}>
                                    {/* <span></span> */}
                                    {item.name}
                                </label>&nbsp;&nbsp;
                            </label>
                        );
                    })
                }
                {/* <div>
                    <div><input type="checkbox" /> 조식</div> &nbsp;&nbsp;
                    <div><input type="checkbox" /> 중식</div> &nbsp;&nbsp;
                    <div><input type="checkbox" /> 석식</div> &nbsp;&nbsp;
                    <div><input type="checkbox" /> 간식</div> &nbsp;&nbsp;
                </div> */}
            </div>
            <div>
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>&nbsp;
                {format(currentMonth, 'yyyy')}년&nbsp;
                {format(currentMonth, 'MM')}월
                &nbsp;<Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
                &nbsp;&nbsp;<div style={{ display: thisMonth }}>이번달</div> 
            </div>
            {/* <div> </div> */}
            <div className='mealListBox'>
                <div className='meal_mng_list' style={{
                    display: 'grid',
                    gridTemplateColumns: "10% 5% 5%" + rows + " 20% "
                }}>
                    <div>아동식별번호</div>
                    <div>이름</div>
                    <div>구분</div>

                    {Array.from({ length: size }, (_, index) => {
                        if ((index + 1) % 7 === (count - 1) % 7) {
                            color = "colorBlue"
                        } else if ((index + 1) % 7 === (count) % 7) {
                            color = "colorRed"
                        } else {
                            color = ""
                        }
                        return (
                            <div className={color} key={index + 1}> {index + 1} </div>
                        );
                    })}

                    <div>합계</div>
                </div>

                {memData.map((o, i) => {
                    return (
                        <div className='meal_mng_list' style={{
                            display: 'grid',
                            gridTemplateColumns: "10% 5% 5% " + rows + "10%" }}>

                            <div>{o.memSerial}</div>
                            <div>{o.memName}</div>
                            <div>
                                {checkedMealList.brf_meal ? <div>조식</div> : null}
                                {checkedMealList.lnc_meal ? <div>중식</div> : null}
                                {checkedMealList.dnr_meal ? <div>석식</div> : null}
                                {checkedMealList.snk_meal ? <div>간식</div> : null}
                                {/* <div>{o.brfMeal}</div>
                                    <div>{o.lncMeal}</div>
                                    <div>{o.dnrMeal}</div>
                                    <div>{o.snkMeal}</div> */}
                            </div>
                            {Array.from({ length: size }, (_, index) => {
                                let day;

                                if (index.length == 1) {
                                    day = "0" + (index+1);
                                } else {
                                    day = "" + (index+1);
                                }
                                // let count = mealData.find((item) => (item.memSerial === o.memSerial) && (item.mealDate.split("-")[2] === day));
                                let count = mealData.find((item) => (item.memSerial === o.memSerial) && (parseInt(item.mealDate.split("-")[2]) === parseInt(day)));
                                if (count) {
                                    return (
                                        <div key={index + 1}>
                                            {checkedMealList.brf_meal ? <div>{count.brfMeal === 0 ? "X" : "O" }</div> : null}
                                            {checkedMealList.lnc_meal ? <div>{count.lncMeal === 0 ? "X" : "O" }</div> : null}
                                            {checkedMealList.dnr_meal ? <div>{count.dnrMeal === 0 ? "X" : "O" }</div> : null}
                                            {checkedMealList.snk_meal ? <div>{count.snkMeal === 0 ? "X" : "O" }</div> : null}
                                   
                                        </div>
                                    );
                                } 
                                else {
                                    return (
                                        <div
                                            // className={color} 
                                            key={index + 1}></div>
                                    );
                                }
                            })}
                            <div> 
                                {checkedMealList.brf_meal ? <div>조식</div> : null}
                                {checkedMealList.lnc_meal ? <div>중식</div> : null}
                                {checkedMealList.dnr_meal ? <div>석식</div> : null}
                                {checkedMealList.snk_meal ? <div>간식</div> : null}
                            </div>
                        </div>
                    )


                })}
            </div>
        </div>
    );

}

export default MealManagement;

