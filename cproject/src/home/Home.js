import './home.css';
import Menu from '../menu/Menu'
import Container from '../container/Container'
import Main from '../container/main/Main'
// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../menu/Navbar';

function Home2() {
    const navigate = useNavigate();

    useEffect(() => {

        let loginId = "admin";

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
            <Menu menuArr={menuArr} setMenuArr={setMenuArr} setCurrentTab={setCurrentTab} ></Menu>
            <div>
                <div id='homeContainerMain'>
                    <Navbar />
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