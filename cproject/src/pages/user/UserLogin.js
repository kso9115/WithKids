import './userLogin.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


//이미지
import backgroundimg from '../../assets/images/1920_x_950_px_2.png';
// import faceSereial from "../../assets/images/free-icon-face-id-2415069.png";
// import facePW from "../../assets/images/free-icon-padlock-2575570.png";
import { apiCall } from '../../server/apiService';
import poolImg from '../../assets/images/pool_1.png';
import centerImg from '../../assets/images/pool_1000_x_200_px_1.png';


function UserLogin() {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);  // 로그인 상태 저장 변수
    const [userLoginInfo, setUserLoginInfo] = useState(""); // 회원 로그인 정보
    // serial 과 password useState
    const [serial, setSerial] = useState("");
    const [password, setPassword] = useState("");
    // const [disabled, setDisabled] = useState(false);

    // value가 바뀌도록 함 
    const handleSerialChange = (event) => setSerial(event.target.value);
    const handlePwChange = (event) => setPassword(event.target.value);

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 리프레시를 막아줌

        // console.log("serial 넘버 => " + serial);
        // console.log("password => " + password);

        if (serial.length > 0 && password.length > 0) {
            apiCall('/mem/login', 'POST', {
                memSerial: serial,
                memLoginPW: password
            })
                .then((response) => {
                    console.log(response.data);
                    sessionStorage.setItem("userLogin", JSON.stringify(response));
                    setIsUserLoggedIn(true);
                    setUserLoginInfo(response);
                    // sessionStorage.setItem("userSerial",JSON.stringify(res.serial));
                    alert("로그인 성공");
                    navigate("/user");
                    // window.location.reload();
                })
                .catch((error) => {
                    setUserLoginInfo('');
                    if (error === 401) {
                        alert("이용이 중단된 사용자 입니다. ");
                    } else if (error === 403) {
                        alert("id 또는 password 가 다릅니다, 다시하세요");

                    } else if (error === 404) {
                        alert("아이디를 찾을 수 없습니다.");

                    } else { alert(`** Login 시스템 오류, err=${error}`); }
                })
        } else {
            alert("serial 번호와 password를 모두 입력해 주셔야합니다");
        }
        setSerial('');
        setPassword('');
    }

    const handlerEnter = (e) => {
        if (e.keyCode === 13) {
            onSubmitHandler(e);
        }
    }
    const handlerIdEnter = (e) => {
        if (e.keyCode === 13) {
            document.getElementById("facePW").focus();
        }
    }

    return (
        <div className="loginBox">
            <div><img className="backgroundimg" src={backgroundimg} alt="배경"></img></div>
            {/* <div className='withkids'><img src={poolImg} alt="아이들의 행복을 위한 놀이터"></img></div> */}
            <div className='userloginBox'>
                <div>
                    <div><a href='/user'><img src={centerImg} alt='withkids아동관리센터'></img></a></div>
                    <div>
                        <i class="xi-profile-o xi-2x"></i>
                        <div><input type="text" id="faceSereial" name="faceSereial" value={serial} onChange={handleSerialChange} placeholder='ID를 입력해주세요' onKeyDown={handlerIdEnter} /></div>
                    </div>
                    <div>
                        <i class="xi-lock-o xi-2x"></i>
                        <div><input type="password" id="facePW" name="facePW" value={password} onChange={handlePwChange} placeholder='PW를 입력해주세요' onKeyDown={handlerEnter} autoFocus /></div>
                    </div>
                </div>
                <div className='userloginBtn'>
                    <input className='usercustom-btn2' id="enterlogin" type="submit" value="log in" onClick={onSubmitHandler} />
                </div>
            </div>
        </div>
    )

}

export default UserLogin;
{/* <div className='logRightBox' style={{ width: '50%' }}>
                <div className='logLogo'>
                    <img src='img/Community Child Center.png' alt="커뮤니티차일드센터"></img>
                    <h2 className="" style={{
                        fontSize: 60, fontWeight: 'bold', color: 'var(--admin)'
                    }}>L O G I N</h2>
                </div>
                <div>
                    <div className='loginTable'>
                        <div className='idpwbox'>
                            <div><img className="faceSereial" src={faceSereial} alt="faceSereial" />
                                <input type="text" id="faceSereial" name="faceSereial" value={serial} onChange={handleSerialChange} placeholder='ID를 입력해주세요' onKeyDown={handlerIdEnter} />
                            </div>

                            <div><img className="facePW" src={facePW} alt="facePW"></img>
                                <input type="text" id="facePW" name="facePW" value={password} onChange={handlePwChange} placeholder='PW를 입력해주세요' onKeyDown={handlerEnter} autoFocus/>
                            </div>
                        </div>

                        <div className='loginBtn'>
                            <input className='custom-btn' id="enterlogin" type="submit" value="로그인" onClick={onSubmitHandler} />&nbsp;&nbsp;&nbsp;
                            <input className='custom-btn' type="reset" value="취소" />
                        </div>
                    </div>
                </div>
            </div> */}