import { format, set } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { apiCall } from "../../server/apiService";
import './userCheck.css';
import UserGPS from "./UserGPS.js";


function UserCheck() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [userLocation, setUserLocation] = useState(null); // 위치정보 전달할 useState ㅠㅠ안하고싶엇는디
    // const [attOne, setAttOne] = useState({});
    //

    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));

    // 위치 정보 가져오기
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    // 위치 정보 서버측에 출력 : ajax로하란다
    function showPosition(position) {
        // 이 위치 정보를 서버로 전송하여 출석체크를 처리하거나 다른 작업 수행
        console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
        // 위치 정보를 파라미터로 전달하여 출석체크 함수 호출 => 긍까 호출할때 담아서 실행한다는거고
        setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    // 인자로 위도 경도 담아서 전달 => 굳이 useState 써줄 필요 없게끔하려고 햇는데 인자로 전달하면 그냥 바로 호출해버려서..
    const attChange = () => {
        // 위치 받아오는지 화긴
        if (!userLocation) {
            alert("위치 정보를 가져오는 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        const params = {
            memSerial: sessionData ? sessionData.data.id : null,
            memName: sessionData ? sessionData.data.username : null,
            attDate: format(currentMonth, 'yyyy-MM-dd'),
            attStatus: '출',
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
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

    // console.log(sessionData);
    // console.log(format(currentMonth, 'yyyy-MM-dd'));     
    //통합

    function insertMeal(mealType) {
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
                if (res.data.memSerial != undefined && userLocation.latitude.equals("37.3") && userLocation.longitude.equals("127.1")) {
                    console.log(res);
                    alert(`${res.data.memSerial} ${res.data.memName}님 ${mealType}을 신청하셨습니다.`);
                } else {
                    alert("미출석 상태 이거나 센터가 아닙니다.");
                }
            }).catch((err) => {
                console.log("에러 발생 => " + err);
            })
    };

    // 사용자 위치 가져오기 및 출석체크 호출 : 마운트 시에만 호출하게끔
    useEffect(() => {
        getLocation();
    }, []);

    return (
        // 페이지 열릴 때 위치정보 바로 호출
        // <div onClick={getLocation()}>
        <div className="phonback" >
            <div><a href="/user">
                <img src="img/Community Child Center.png" alt=""></img></a>
                <div>{format(currentMonth, 'yyyy-MM-dd')}</div>
                <div>
                    <div>
                        <div><button className="btn attChange" onClick={() => { attChange(); }}><i className="xi-pen-o xi-3x mealicon">&nbsp;입실</i></button></div>
                        <div><button className="btn attChange" onClick={() => insertMeal('breakfast')}><i className="xi-restaurant xi-3x mealicon">&nbsp;조식</i></button></div>
                        <div><button className="btn attChange" onClick={() => insertMeal('lunch')}><i className="xi-restaurant xi-3x mealicon">&nbsp;중식</i></button></div>
                        <div><button className="btn attChange" onClick={() => insertMeal('dinner')}><i className="xi-restaurant xi-3x mealicon">&nbsp;석식</i></button></div>
                        <div><button className="btn attChange" onClick={() => insertMeal('snack')}><i className="xi-restaurant xi-3x mealicon">&nbsp;간식</i></button></div>                    
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserCheck;