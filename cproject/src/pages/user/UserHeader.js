import './userHeader.css'
import logo from '../../assets/images/Community Child Center.png'
import iconChat from '../../assets/images/iconChat.png'
// import Chatbot from '../../components/chatbot/Chatbot';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserHeader() {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const icon = useRef();
    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));

    function iconClick() {
        if (document.getElementById("iconChat").classList === 'iconClick') {
            setModal(false)
            document.getElementById("iconChat").classList = '';
            document.getElementById("iconChat").innerHTML = '<img src="img/iconChat.png" alt="" />'
        } else {
            setModal(true)
            document.getElementById("iconChat").classList = 'iconClick';
            document.getElementById("iconChat").innerHTML = '<span>닫기</span>'
        }
    }
    function userLogout() {
        if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
            sessionStorage.removeItem('userLogin');
            navigate("/user");
            // window.location.reload();
        }
    }
    function userCheck(){
        if(window.confirm("출석체크 이동하시겠?")){
            navigate("/usercheck")
        }
    }
    // if (icon.current.className === 'iconClick') {

    // } else {

    // }
    return (
        <header className="dongle-regular">
            <a id="logo" href="/user">
                <img src={logo} alt=""></img>

            </a>

            <nav>
                <div id="userMenu">
                    <ul>
                        <li><Link to="#">센터 소개</Link></li>
                        <li><Link to="/user/notice">공지사항</Link></li>
                        <li><Link to="/user/program">프로그램</Link></li>
                        <li><Link to="#">프로그램 후기</Link></li>
                        <li><Link to="#">찾아오시는길</Link></li>
                    </ul>
                </div>
            </nav>

            <div id="login_group">
                <ul>
                    <li>{sessionData ? <div className='usercheck' onClick={userCheck}>출석 및 급식</div> :
                        <Link to="/user/usercheck">로그인</Link>}</li>
                    <li><Link to="/">선택창(Test)</Link></li>
                    {sessionData ? <li><Link to="/">내정보</Link></li> :
                        null}
                    <li>{sessionData ? <div className='userLogout' onClick={userLogout}>로그아웃</div> :
                        <Link to="/user/UserLogin">로그인</Link>}</li>
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