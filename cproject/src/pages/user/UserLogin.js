import './userLogin.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//이미지
import faceSereial from "../../assets/images/free-icon-face-id-2415069.png";
import facePW from "../../assets/images/free-icon-padlock-2575570.png";

function UserLogin( ){
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

        console.log("serial 넘버 => " + serial);
        console.log("password => " + password);

        if (serial.length > 0 && password.length > 0) {
            axios
            .post("/api/mem/login", {
                memSerial: serial,
                memLoginPW: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data);
                sessionStorage.setItem("userLogin",JSON.stringify(res));
                setIsUserLoggedIn(true);
                setUserLoginInfo(res);
                // sessionStorage.setItem("userSerial",JSON.stringify(res.serial));
                alert("로그인 성공");
                navigate("/user");
            })
            .catch((err) => {
                setUserLoginInfo('');
                if (err === 502) {
                    alert("id 또는 password 가 다릅니다, 다시하세요 ~~");
                } else { alert(`** onLoginSubmit 시스템 오류, err=${err}`); }
            });
        } else { 
            alert("serial 번호와 password를 확인해 주세요");
        }
    }

    return(
            <div className='useLoginBox'>
                <div>
                    <div><img className="user_Serial" src={faceSereial} alt="serial" />
                        <input type="text" id="serial" name="serial" value={serial} onChange={handleSerialChange} />
                    </div>
                    <div><img className="user_Password" src={facePW} alt="password"></img>
                        <input type="password" id="password" name="password" value={password} onChange={handlePwChange}/>
                    </div>
                </div>
                <div>
                    <input className='userLogin-btn' type="submit" value="로그인" onClick={onSubmitHandler}/>&nbsp;&nbsp;&nbsp;
                    <input className='userLogin-btn' type="reset" value="취소" />
                </div>
            </div>
    )
}
export default UserLogin;