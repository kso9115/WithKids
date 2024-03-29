import './login.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Session from 'react-session-api';
import leftBackground from '../../assets/images/leftBackground.png';
import faceId from '../../assets/images/free-icon-face-id-2415069.png';
import padLock from '../../assets/images/free-icon-padlock-2575570.png';
// import leftBackground from '../../images/leftBackground.png';
// import faceId from '../../images/free-icon-face-id-2415069.png';
// import padLock from '../../images/free-icon-padlock-2575570.png';

function Login({ setSessionName }) {
    const navigate = useNavigate();
    useEffect(() => {

        let loginId = "admin";
        loginId = "";

        if (loginId !== null && loginId.trim().length !== 0 && loginId !== undefined) {
            console.log("aa");
            navigate("/home");
        }
    }, [navigate])


    // serial 과 password useState
    const [serial, setSerial] = useState("");
    const [password, setPassword] = useState("");
    // const [disabled, setDisabled] = useState(false);

    // value가 바뀌도록 함 
    const handleSerialChange = (event) => setSerial(event.target.value);
    const handlePwChange = (event) => setPassword(event.target.value);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log("자 ~ 실행은 됐다~");

        axios.post("api/mem/login", {
                memSerial: serial,
                memLoginPW : password
            })
            .then(result => {
                let idPwCk = false;
                result.data.forEach(element => {
                    if ((element.serial === serial) && (element.password === password)) {
                        idPwCk = true;
                        console.log(element.serial + " : " + element.password);
                    }
                });
                if (idPwCk) {
                    setSessionName(serial);
                    sessionStorage.setItem("sname", serial);
                    window.location.reload();
                } else {
                    alert("일치하는 계정이 없습니다.\n다시입력하세요")
                }
            })
            .catch(err => console.log(err))
    };

    // onsubmit 핸들러 : submit 했을 때, 요청
    
    

    return (
        <div className="loginBox">
            <div className='logLeftBox' style={{ width: '50%', heightht: '100%' }}>
                <div><img className="leftBackground" src={leftBackground} alt="배경"></img></div>

                <div>
                    <div className='hovering'><a href='/' style={{ color: 'var(--admin)', fontFamily: '', fontWeight: 'bold' }}>Log In</a></div>
                    <br />
                    <div className='hovering'><a href="/home" style={{ color: 'var(--admin)', fontFamily: '', fontWeight: 'bold' }}>Home</a></div>
                </div>

            </div>

            <div className='logRightBox' style={{ width: '50%' }}>
                <div className='logLogo'>
                    <img src='img/Community Child Center.png' alt="커뮤니티차일드센터"></img>
                    <h2 className="" style={{
                        fontSize: 60, fontWeight: 'bold', color: 'var(--admin)'
                    }}>L O G I N</h2>
                </div>
                <div>
                    <div className='loginTable'>
                        <div className='idpwbox'>
                            <div><img className="serial" src={faceId} alt="serial" />
                                <input type="text" id="serial" name="serial" value={serial} onChange={handleSerialChange} />
                            </div>

                            <div><img className="padLock" src={padLock} alt="password"></img>
                                <input type="password" id="password" name="password" value={password} onChange={handlePwChange}/>
                            </div>
                        </div>

                        <div className='loginBtn'>
                            <input className='custom-btn' type="submit" value="로그인" onClick={onSubmitHandler}/>&nbsp;&nbsp;&nbsp;
                            <input className='custom-btn' type="reset" value="취소" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;