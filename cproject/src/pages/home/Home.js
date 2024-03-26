import './home.css';
import Menu from '../../components/menu/Menu'
import Container from '../../components/container/Container'
import Main from '../../components/main/Main'
// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/menu/Navbar';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     const param = {
    //         staffId: "master",
    //         staffPsw: "mysql"
    //     }
    //     axios.post(`/api/staff/staffLogin`, param)
    //         .then((response) => {
    //             console.log(response.data)
    //         }).catch((error) => {
    //             console.log(error);
    //         })
    // },[])
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
        <div id="screen" >
            <Menu menuArr={menuArr} setMenuArr={setMenuArr} setCurrentTab={setCurrentTab} ></Menu>
            <div>
                <div id='homeContainerMain'>
                    <Navbar />
                    <Container menuArr={menuArr} setMenuArr={setMenuArr} currentTab={currentTab} setCurrentTab={setCurrentTab}></Container>
                </div>
            </div>
        </div>

    );
}

export default Home;