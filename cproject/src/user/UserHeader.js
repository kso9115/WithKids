import './userHeader.css'
import logo from '../images/Community Child Center.png'
import iconChat from '../images/iconChat.png'

import { useRef } from 'react';

function UserHeader() {
    
    const icon = useRef();

    function iconClick() {
        
        if (document.getElementById("iconChat").classList == 'iconClick') {
            console.log(document.getElementById("iconChat").classList);
            document.getElementById("iconChat").classList = '';
            document.getElementById("iconChat").innerHTML = '<img src="img/iconChat.png" alt="" />'
        } else {
            console.log(document.getElementById("iconChat").classList);
            document.getElementById("iconChat").classList = 'iconClick';
            document.getElementById("iconChat").innerHTML = '<span>닫기</span>'
        }
        
        
    }
    // if (icon.current.className === 'iconClick') {
        
    // } else {
  
    // }

    return (
        <header class="dongle-regular">
            <a id="logo" href="/user">
                <img src={logo} alt=""></img>

            </a>

            <nav>
                <div id="menu">
                    <ul>
                        <li><a href="#">센터 소개</a></li>
                        <li><a href="/user/notice">공지사항</a></li>
                        <li><a href="#">프로그램</a></li>
                        <li><a href="#">프로그램 후기</a></li>
                        <li><a href="#">찾아오시는길</a></li>
                    </ul>
                </div>
            </nav>

            <div id="login_group">
                <ul>
                    <li><a href="/">선택창(Test)</a></li>
                    <li><a href="#">로그인</a></li>
                </ul>
            </div>

            <div id="iconChat" className='' ref={icon} onClick={iconClick}>
                <img src={iconChat} alt="" />
            </div>
        </header>
    );
}
export default UserHeader;