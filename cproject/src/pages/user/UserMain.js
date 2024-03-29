import Slide from '../../components/slide/Slide'
import './userMain.css'


function UserMain() {
    
    return (
        <div id="viewport" style={{
            maxWidth: '100%',
            maxHeight: '80%',
            background: 'url(img/visual_slider_bg05.jpg)'
        }}>
            <img id="viewport_img" src="img/pool.png" style={{
                width: "600px"
            }} alt=""></img>
            <div id='viewport_box'>
                <p><img src="img/visual_info_time02.png" alt=''></img> 운영시간<span>월~금 10:00 ~ 18:00 토,일요일 휴무</span></p>
                <p><img src="img/visual_info_call02.png" alt=''></img> 전화번호<span>TEL 031-000-0000</span></p>
            </div>
            <div id='viewport_slide'>
                <Slide width={"1500px"} height={"500px"} ></Slide>
            </div>
        </div>
    );

}
export default UserMain;