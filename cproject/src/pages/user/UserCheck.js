import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { apiCall } from "../../server/apiService";
import './userCheck.css';
import UserGPS from "./UserGPS.js";


function UserCheck() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [userLocation, setUserLocation] = useState(null); // 위치정보 전달할 useState ㅠㅠ안하고싶엇는디
    // const [attOne, setAttOne] = useState({});

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

    // 사용자 위치 가져오기 및 출석체크 호출 : 마운트 시에만 호출하게끔
    useEffect(() => {
        getLocation();
    }, []);

    return (
        // 페이지 열릴 때 위치정보 바로 호출
        // <div onClick={getLocation()}>
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
                    fontWeight: "bolder"
                }}>{format(currentMonth, 'yyyy-MM-dd')}</div>

                <div style={{
                    display: 'flex',
                    gap: '50px',
                    justifyContent: 'center'
                }}>
                    <div>
                        <button
                            id="attButton"
                            className="btn attChange"
                            // 함수를 콜백으로 만들었으면 함수를 전달해야지
                            // 함수를 호출하고있으면 어떡하니 쯧쯧
                            // onClick={attChange()}
                            onClick={() => { attChange(); }}
                        // onClick={attChange}
                        >입실하기</button>
                    </div>
                    <hr></hr>
                    <div>
                        <button className="btn attChange">조식</button>&nbsp;
                        <button className="btn attChange">중식</button>&nbsp;
                        <button className="btn attChange">석식</button>&nbsp;
                        <button className="btn attChange">간식</button>
                    </div>

                    
                </div>

            </div>
        </div>
    )

}

export default UserCheck;