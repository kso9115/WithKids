import { format, set } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { apiCall } from "../../server/apiService";
import './userCheck.css';
import UserGPS from "./UserGPS.js";


function UserCheck() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    // const [attOne, setAttOne] = useState({});
    //

    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));

    // useEffect(() => {
    // },[]);
    const attChange = () => {

        const params = {
            memSerial: sessionData ? sessionData.data.id : null,
            memName: sessionData ? sessionData.data.username : null,
            attDate: format(currentMonth, 'yyyy-MM-dd'),
            attStatus: '출',
        }
    
        // console.log(params); // 데이터 줄력됨 => 그대로 요청이랑 전달하면댄당
    
        apiCall('/att/attInsert', 'POST', params)
            .then((response) => {
                console.log("오잉");
                // response : message
                // setAttOne()
                alert(`${params.attDate} ${params.memName}님 출석체크 완료하셨습니다.`)
            }).catch((err) => {
                console.log(err);
            })
    }
    console.log(sessionData);
    console.log(format(currentMonth, 'yyyy-MM-dd'));
    // const onbChange = ()=>{
    //     console.log("조식");
    //     apiCall('/meal/Insert', 'POST', {
    //         memSerial: sessionData ? sessionData.data.id : null,
    //         mealDate : format(currentMonth, 'yyyy-MM-dd'),
    //         memName: sessionData ? sessionData.data.username : null,
    //         staffNm : "장근정", 
    //         brfMeal : 1
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             alert(`${res.data.memSerial} ${res.data.memName}님 아침 식사를 신청하셨습니다.`);
    //         }).catch((err) => {
    //             console.log("에러 발생 => " +err);
    //         })
    // }

    // const onlChange = ()=>{
    //     console.log("중식");
        
    //     apiCall('/meal/Insert', 'POST', {
    //         memSerial: sessionData ? sessionData.data.id : null,
    //         mealDate : format(currentMonth, 'yyyy-MM-dd'),
    //         memName: sessionData ? sessionData.data.username : null,
    //         staffNm : "장근정", 
    //         lncMeal : 1
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             alert(`${res.data.memSerial} ${res.data.memName}님 점심 식사를 신청하셨습니다.`)
    //         }).catch((err) => {
    //             console.log("에러 발생 => " +err);
    //         })
    // }

    // const ondChange = ()=>{
    //     console.log("석식");
        
    //     apiCall('/meal/Insert', 'POST', {
    //         memSerial: sessionData ? sessionData.data.id : null,
    //         mealDate : format(currentMonth, 'yyyy-MM-dd'),
    //         memName: sessionData ? sessionData.data.username : null,
    //         staffNm : "장근정", 
    //         dnrMeal : 1
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             alert(`${res.data.memSerial} ${res.data.memName}님 저녁 식사를 신청하셨습니다.`)
    //         }).catch((err) => {
    //             console.log("에러 발생 => " +err);
    //         })
    // }
    // const onsChange = ()=>{
    //     console.log("간식");
        
    //     apiCall('/meal/Insert', 'POST', {
    //         memSerial: sessionData ? sessionData.data.id : null,
    //         mealDate : format(currentMonth, 'yyyy-MM-dd'),
    //         memName: sessionData ? sessionData.data.username : null,
    //         staffNm : "장근정", 
    //         snkMeal : 1
    //      })
    //         .then((res) => {
    //             console.log(res);
    //             alert(`${res.data.memSerial} ${res.data.memName}님 간식을 신청하셨습니다.`)
    //         }).catch((err) => {
    //             console.log("에러 발생 => " +err);
    //         })
    // }  
     
    //통합
    function insertMeal(mealType){
        const mealFieldMapping = {
            'breakfast': 'brfMeal',
            'lunch': 'lncMeal',
            'dinner': 'dnrMeal',
            'snack': 'snkMeal'
        };

        const mealField = mealFieldMapping[mealType];
        
        apiCall('/meal/Insert', 'POST', {
            memSerial: sessionData ? sessionData.data.id : null,
            mealDate: format(currentMonth, 'yyyy-MM-dd'),
            memName: sessionData ? sessionData.data.username : null,
            staffNm: "장근정",
            [mealField]: 1
        })
        .then((res) => {
            console.log(res);
            alert(`${res.data.memSerial} ${res.data.memName}님 ${mealType}을 신청하셨습니다.`)
        }).catch((err) => {
            console.log("에러 발생 => " +err);
        })
    };

    return (
        <div>
            <div style={{
                width: '100vw',
                height: '100vh',
                textAlign: 'center',
                paddingTop: '25%'
            }}>
                <img
                    style={{
                        marginBottom: '50px'
                    }}
                    src="img/Community Child Center.png" alt=""></img>

                <div style={{
                    marginBottom: '50px',
                    fontSize: 30,
                    fontWeight:"bolder"
                }}>{format(currentMonth, 'yyyy-MM-dd')}</div>

                <div style={{
                    display: 'flex',
                    gap: '50px',
                    justifyContent: 'center'
                }}>
                    <div>
                        <button className="btn attChange"
                        // 함수를 콜백으로 만들었으면 함수를 전달해야지
                        // 함수를 호출하고있으면 어떡하니 쯧쯧
                            onClick={attChange}
                        >입실하기</button>
                    </div>
                    <hr></hr>
                    <div>
                        <button className="btn attChange" onClick={()=>insertMeal('breakfast')}>조식</button>&nbsp;
                        <button className="btn attChange" onClick={()=>insertMeal('lunch')}>중식</button>&nbsp;
                        <button className="btn attChange" onClick={()=>insertMeal('dinner')}>석식</button>&nbsp;
                        <button className="btn attChange" onClick={()=>insertMeal('snack')}>간식</button>
                    </div>

                    <UserGPS/>
                </div>

            </div>
        </div>
    )

}

export default UserCheck;