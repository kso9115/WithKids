import { useEffect, useState } from 'react';
import Slide from '../../components/slide/Slide'
import './userMain.css'
import { apiCall } from '../../server/apiService';


function UserMain() {
    const [prgData, setPrgData] = useState([]); //프로그램 테이블 전체 보관
    useEffect(() => {
        apiCall('/prg/prgSlide', 'GET')
            .then((response) => {
                setPrgData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    console.log(prgData);
    return (
        <div id="viewport" style={{
            maxWidth: '100%',
            maxHeight: '80%',
            // background: 'url(img/visual_slider_bg05.jpg)'
            background: 'url(img/mainBack3.png)'
        }}>
            <img id="viewport_img" src="img/pool4.png" style={{
                width: "600px"
            }} alt=""></img>
            <div id='viewport_box'>
                <p><img src="img/visual_info_time03.png" alt=''></img> 운영시간<span>월~금 10:00 ~ 18:00 토,일요일 휴무</span></p>
                <p><img src="img/visual_info_call03.png" alt=''></img> 전화번호<span>TEL 031-000-0000</span></p>
            </div>
            <div id='viewport_slide'>
                <Slide data={prgData} width={"1500px"} height={"500px"} ></Slide>
            </div>
        </div>
    );

}
export default UserMain;