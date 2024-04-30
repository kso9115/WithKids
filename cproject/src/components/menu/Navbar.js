import './navbar.css'
import React from 'react'
import Modal from "react-modal"
import { useState } from 'react';
import { BiX } from "react-icons/bi";
import { apiCall } from '../../server/apiService';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ loginInfo }) { 
    Modal.setAppElement('#root') //App.js
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [password, setPassword] = useState(["", "", ""]);
    let password0 = "";
    let password1 = "";
    let password2 = "";
    let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/

    const openModal = () => setModal(true);

    const closeModal = () => {
        setModal(false);
        setPassword(["", "", ""]);
    };

    const modalStyle = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            width: "600px",
            height: "360px",
            margin: "auto",
            padding: "0px",
            zIndex: "999999",
        }
    }

    const pwChange = (event, num) => {
        password[num] = event.target.value;
        setPassword({ ...password })
    }

    const dropdownHide = (event) => {
        if (event.target.parentElement.nextSibling.className === 'dropdown_menu') {
            event.target.parentElement.nextSibling.className = 'dropdown_menu hide'
        } else {
            event.target.parentElement.nextSibling.className = 'dropdown_menu'
        }
    }

    const pwChangeRequest = () => {
        if (password[0] === "") alert("기존 비밀번호를 입력해주세요.");
        else if (password[1] === "" || !reg.test(password[1])) alert("숫자,영문,특수기호 포함 8글자로 입력해주세요.");
        else if (password[2] === "" || password[1] !== password[2]) alert("변경 비밀번호와 비밀번호 확인이 서로 일치하지않습니다.");
        else {
            apiCall('/staff/changePswrd', 'POST', {
                staffId: loginInfo.data.id,
                staffPsw: password[0],
                type: password[2],
            })
                .then((response) => {
                    if ("성공" === response.data) {
                        alert("비밀번호 변경이 완료되었습니다.");
                        sessionStorage.removeItem('staffname');
                        navigate("/login");
                    } else {
                        alert(response.data);
                    }
                    // console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    if (password[1] !== "" && !reg.test(password[1])) password1 = "숫자,영문,특수기호 포함 8글자로 입력해주세요."
    if (password[2] !== "" && password[1] !== password[2]) password2 = "변경 비밀번호와 비밀번호 확인이 서로 일치하지않습니다."

    function logout() {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            sessionStorage.removeItem('staffname');
            navigate("/login");
        };
    }

    function test() {

        // let myKey = '07e937ad482b12c5ba01d99a87bf2163';
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'CL_AUTH_KEY': myKey, // 필요한 경우 토큰 등의 인증 정보를 설정합니다.
        //     },
        // };
        // let to_list = ["01077649115", "01090881994", "01049199822"]

        // // let formData = new FormData();
        // // formData.append("from", "01049199822");
        // // formData.append("to_list", to_list);
        // // formData.append("text", "테스트 발송입니다.");

        // axios.post('https://sens.apigw.ntruss.com/sms/v2',
        //     {
        //         from: "01049199822",
        //         to_list: to_list,
        //         text: "테스트 발송입니다."
        //     }
        //     // formData
        //     , config)
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }
    return (
        <div id='navbar'>
            <ul className='navbar_nav'>
                {/* <li className='nav_item'>
                    <div className='nav_icon'>
                        <img src="img/메시지파랑.png" alt="" />
                        <span></span>
                    </div>
                    <div className='dropdown_list'></div>
                </li> */}

                <li className='nav_item'>
                    <div className='nav_icon'>
                        <img src="img/알람파랑.png" alt="" />
                        <span>1</span>
                    </div>
                    <div className='dropdown_list'></div>
                </li>

                <div></div>

                <li className='nav_item'>
                    <div className='nav_icon' >
                        <p onClick={dropdownHide} >{loginInfo ? loginInfo.data.username : ""} 님</p>
                    </div>
                    <div className='dropdown_menu hide'>
                        <ul>
                            <Modal isOpen={modal} onRequestClose={closeModal} style={modalStyle}>
                                <div className="navbarModalHeader">
                                    <b>비밀번호 변경</b>

                                    <BiX size="2em" onClick={closeModal} />
                                    {/* <button className="navbarModalClose" onClick={closeModal}>X</button> */}
                                </div>

                                <div className="navbarModalMain">
                                    <div>
                                        <label>기존 비밀번호</label>&nbsp;:&nbsp;&nbsp;<input type="password"
                                            placeholder='기존 비밀번호를 입력하세요.'
                                            value={password[0]} onChange={(event) => { pwChange(event, 0) }} />
                                        <p>{password0}</p>
                                    </div>

                                    <div>
                                        <label>변경 비밀번호</label>&nbsp;:&nbsp;&nbsp;<input type="password"
                                            placeholder='숫자,영문,특수기호 포함 8글자'
                                            value={password[1]} onChange={(event) => { pwChange(event, 1) }} />
                                        <p>{password1}</p>
                                    </div>

                                    <div>
                                        <label>비밀번호 확인</label>&nbsp;:&nbsp;&nbsp;<input type="password"
                                            placeholder='다시 한번 입력해주세요.'
                                            value={password[2]} onChange={(event) => { pwChange(event, 2) }} />
                                        <p>{password2}</p>
                                    </div>
                                </div>
                                <div className="navbarModalButton" onClick={pwChangeRequest}>비밀번호 변경</div>
                            </Modal>
                            <li onClick={openModal}>비밀번호 변경</li>
                            <li
                            //     onClick={() => alert("미구현 입니다.")}
                            // >Settings</li>
                            ><Link to='/user'>사용자페이지</Link></li>
                            <li onClick={() => alert("미구현 입니다.")}>문자 전송</li>
                            {/* <li>Logout</li> */}
                        </ul>
                        <div onClick={logout}><p>Logout</p></div>
                    </div>
                    {/* <div>
                        <ul>
                            <li><ChatManagement/></li>
                        </ul>
                    </div> */}
                </li>
            </ul>
        </div>
    );
}

export default React.memo(Navbar);