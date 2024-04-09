import './login.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Session from 'react-session-api';
import leftBackground from '../../assets/images/leftBackground.png';
import faceId from '../../assets/images/free-icon-face-id-2415069.png';
import padLock from '../../assets/images/free-icon-padlock-2575570.png';
import { apiCall } from '../../server/apiService';
// import leftBackground from '../../images/leftBackground.png';
// import faceId from '../../images/free-icon-face-id-2415069.png';
// import padLock from '../../images/free-icon-padlock-2575570.png';

function Login({ setSessionName }) {
    const navigate = useNavigate();
    const [StaffLoginInfo,setStaffLoginInfo] = useState("");

    useEffect(() => {

        let staffId = "admin";
        staffId = "";

        if (staffId !== null && staffId.trim().length !== 0 && staffId !== undefined) {
            // console.log("aa");
            navigate("/home");
        }
    }, [navigate])


    // id 과 password useState
    const [staffId, setStaffId] = useState("");
    const [password, setPassword] = useState("");
    // const [disabled, setDisabled] = useState(false);

    // value가 바뀌도록 함 
    const handleSerialChange = (event) => setStaffId(event.target.value);
    const handlePwChange = (event) => setPassword(event.target.value);

    const handlerPwEnter = (e) => {
        if (e.keyCode === 13) {
            onSubmitHandler(e);
        }
    }
    const handlerIdEnter = (e) => {
        if (e.keyCode === 13) {
            document.getElementById("password").focus();
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // console.log("자 ~ 실행은 됐다~");
        if(staffId.trim().length>0 && password.trim().length>0){

            // axios.post("api/staff/staffLogin", {
            //     staffId: staffId,
            //     staffPsw : password
            //     })
            apiCall('/staff/staffLogin','POST',{
                staffId: staffId,
                staffPsw : password
            },null)
                .then(result => {
                    console.log(result.data);
                    sessionStorage.setItem("staffname", JSON.stringify(result));
                    // setSessionName(staffId);
    
                    alert("로그인 성공");
                    navigate('/home');
                })
                .catch(err => {
                    setStaffLoginInfo('');
                    if (err === 401) {
                        alert("이용이 중지된 관리자 입니다");
                    } else if (err === 403 ){
                        alert("id 또는 password 가 다릅니다, 다시하세요 ~~");
                    } else if (err === 404 ){
                        alert("아이디를 찾을 수 없습니다.");
                    } else { alert(`** onLoginSubmit 시스템 오류, err=${err}`); }
                    setStaffId('');
                    setPassword('');
                });
        } else {
            alert("id와 password는 모두 입력해 주셔야합니다.");
        }
    };

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
                            <div><img className="staffId" src={faceId} alt="staffId" />
                                <input type="text" id="staffId" name="staffId" value={staffId} onChange={handleSerialChange} placeholder='ID를 입력해주세요' onKeyDown={handlerIdEnter} />
                            </div>

                            <div><img className="padLock" src={padLock} alt="password"></img>
                                <input type="password" id="password" name="password" value={password} onChange={handlePwChange} placeholder='PW를 입력해주세요'  onKeyDown={handlerPwEnter} autoFocus/>
                            </div>
                        </div>

                        <div className='loginBtn'>
                            <input className='custom-btn' id="enterlogin" type="submit" value="로그인" onClick={onSubmitHandler} />&nbsp;&nbsp;&nbsp;
                            <input className='custom-btn' type="reset" value="취소" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;