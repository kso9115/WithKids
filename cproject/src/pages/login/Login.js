import './login.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Session from 'react-session-api';
import imgBackground from '../../assets/images/1920_x_950_px.png';
import { apiCall } from '../../server/apiService';
import poolImg from '../../assets/images/pool_1.png';
import centerImg from '../../assets/images/pool_1000_x_200_px_1.png';


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
            document.getElementById("padLock").focus();
            // $('.password').focus();
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
                    } else { alert(`** Login 시스템 오류, err=${err}`); }
                    setStaffId('');
                    setPassword('');
                });
        } else {
            alert("id와 password는 모두 입력해 주셔야합니다.");
        }
    };

    return (
        
        <div className="imgBackground">
            {/* <div><img src={imgBackground} alt="배경"></img></div> */}
            <div className='withkids'><img src={poolImg} alt="아이들의 행복을 위한 놀이터"></img></div>
            {/* <div className='homehover'><a href='/user'>HomePage</a></div> */}
            <div className='staffloginBox'>
                <div>
                    <div><a href='/user'><img src={centerImg} alt='withkids아동관리센터'></img></a></div>
                    <div>
                        <i className="xi-profile-o xi-2x"></i>
                        <div><input type="text" id="stfId" name="stfId" value={staffId} onChange={handleSerialChange} placeholder='ID를 입력해주세요' onKeyDown={handlerIdEnter} /></div>
                    </div>
                    <div>
                        <i className="xi-lock-o xi-2x"></i>
                        <div><input type="password" id="padLock" name="padLock" value={password} onChange={handlePwChange} placeholder='PW를 입력해주세요'  onKeyDown={handlerPwEnter} autoFocus/></div>
                    </div>
                </div>
                <div className='loginBtn'>
                    <input className='custom-btn2' id="enterlogin" type="submit" value="log in" onClick={onSubmitHandler} />
                </div>
            </div>
        </div>
    );
}

export default Login;