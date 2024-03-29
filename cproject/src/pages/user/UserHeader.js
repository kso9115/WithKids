import './userHeader.css'
import logo from '../../assets/images/Community Child Center.png'
import iconChat from '../../assets/images/iconChat.png'
// import Chatbot from './chatbot/Chatbot';
import { useRef , useState } from 'react';
import {Link} from 'reacr-router-dom';

function UserHeader() {
    
    const [modal, setModal] = useState(false);
    const icon = useRef();

    function iconClick() {
        
        if (document.getElementById("iconChat").classList == 'iconClick') {
            setModal(false)
            document.getElementById("iconChat").classList = '';
            document.getElementById("iconChat").innerHTML = '<img src="img/iconChat.png" alt="" />'
        } else {
            setModal(true)
            document.getElementById("iconChat").classList = 'iconClick';
            document.getElementById("iconChat").innerHTML = '<span>닫기</span>'
        }
        
        
    }
    function UserLogin(){

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
                <div id="userMenu">
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
                    <li><Link to="/userLogin">로그인</Link></li>
                </ul>
            </div>

            <div id="iconChat" className='' ref={icon} onClick={iconClick}>
                <img src={iconChat} alt="" />
            </div>

            
            {/* <Chatbot isModal={modal} setModal={setModal}></Chatbot> */}
        </header>
        
    );
}
export default UserHeader;