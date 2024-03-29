import './home.css';
import Menu from '../../components/menu/Menu'
import Container from '../../components/container/Container'
import Main from '../../components/main/Main'
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/menu/Navbar';
import axios from 'axios';
import { apiCall } from "../../server/apiService"

function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 저장 변수
    const [loginInfo, setLoginInfo] = useState(""); // 회원 로그인 정보

    // if (!isLoggedIn) {
    //     const loginCheck = JSON.parse(sessionStorage.getItem("loginInfo"));
    //     //if (loginCheck.token !== null) {  -> token 적용이후 확인
    //     if (loginCheck !== null) {  // token 적용이전 확인
    //         alert(`** sessionStorage 로그인 확인 username=${loginCheck.username}`);
    //         setIsLoggedIn(true);
    //         setLoginInfo(loginCheck);
    //     }
    // }
    useEffect(() => {
        const param = {
            staffId: "master",
            staffPsw: "mysql"
        }
        apiCall(`/staff/staffLogin`, 'POST', param, null)
            .then((response) => {
                sessionStorage.setItem("loginInfo", JSON.stringify(response));
                setIsLoggedIn(true);
                setLoginInfo(response);
                console.log(response.data);
            }).catch((error) => {
                setLoginInfo('');
                if (error === 502) {
                    alert("id 또는 password 가 다릅니다, 다시하세요 ~~");
                } else { alert(`** onLoginSubmit 시스템 오류, err=${error}`); }
                console.log(error);
            })
    }, [])
    useEffect(() => {

        let loginId = "admin";
        // let loginId = null;

        if (loginId === null || loginId.trim().length === 0 || loginId === undefined) {
            console.log("aa");
            navigate("/errNoneLogin");
        } else {

        }
    }, [navigate])

    // const [sname, setSname] = useState(sessionStorage.getItem("sname"));
    const [currentTab, setCurrentTab] = useState(0);
    const [menuArr, setMenuArr] = useState([
        { name: '메인', content: <Main /> }
    ]);

    // const setSessionName = (name) => {
    //     setSname(name);
    // }

    return (
        <div id="screen" >
            <Menu menuArr={menuArr} setMenuArr={setMenuArr} setCurrentTab={setCurrentTab} ></Menu>
            <div>
                <div id='homeContainerMain'>
                    <Navbar />
                    <Container menuArr={menuArr} setMenuArr={setMenuArr} currentTab={currentTab} setCurrentTab={setCurrentTab} mainSub={"main"}></Container>
                </div>
            </div>
        </div>

    );
}

export default Home;