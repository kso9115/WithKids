import './home.css';
import Menu from '../../components/menu/Menu'
import Container from '../../components/container/Container'
import Main from '../../components/main/Main'
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/menu/Navbar';
import { apiCall } from "../../server/apiService"

function Home() {
    const navigate = useNavigate(); // 로그인 상태 저장 변수
    const loginInfo = JSON.parse(sessionStorage.getItem("staffname")); // 회원 로그인 정보

    // useEffect(() => {
    //     window.addEventListener('beforeunload', (event) => {  // 표준에 따라 기본 동작 방지  
    //         event.preventDefault();  // Chrome에서는 returnValue 설정이 필요함  
    //         event.returnValue = '';
    //     });
    // });
    useEffect(() => {
        // window.addEventListener('beforeunload', (event) => {  // 표준에 따라 기본 동작 방지  
        //     event.preventDefault();  // Chrome에서는 returnValue 설정이 필요함  
        //     event.returnValue = '';
        // });

        if (loginInfo === null || loginInfo.data.token.trim().length === 0 || loginInfo.data.token === undefined) {
            navigate("/errNoneLogin");
        }
    }, [navigate, loginInfo])

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
            <Menu menuArr={menuArr} setMenuArr={setMenuArr} setCurrentTab={setCurrentTab}></Menu>
            <div>
                <div id='homeContainerMain'>
                    <Navbar loginInfo={loginInfo} />
                    <Container menuArr={menuArr} setMenuArr={setMenuArr} currentTab={currentTab} setCurrentTab={setCurrentTab} mainSub={"main"}></Container>
                </div>
            </div>
        </div>

    );
}

export default Home;