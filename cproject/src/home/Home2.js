import './home.css';
import Menu from '../menu/Menu'
import Menu2 from '../menu/Menu2'
import Container from '../container/Container'
import Main from '../container/main/Main'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home2() {
    const navigate = useNavigate();

    useEffect(() => {

        let loginId = "admin";
        // loginId = "";
        console.log('loginId === null : ' + loginId === null);
        console.log('loginId.trim().length === 0 : ' + loginId.trim().length === 0);
        console.log('loginId === undefined : ' + loginId === undefined);
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
        <div id="screen">
            <Menu2 menuArr={menuArr} setMenuArr={setMenuArr} setCurrentTab={setCurrentTab} ></Menu2>
            <div>
                <div id='homeContainerMain'>
                    <Container menuArr={menuArr} setMenuArr={setMenuArr} currentTab={currentTab} setCurrentTab={setCurrentTab} mainSub={'main'}></Container>
                </div>
                <footer id='homeFooter'>
                    <div>카톡으로 얘기하조?</div>
                </footer>
            </div>
        </div>
    );
}

export default Home2;