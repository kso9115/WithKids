import './userHeader.css'
import logo from '../../assets/images/Community Child Center.png'
import iconChat from '../../assets/images/iconChat.png'
// import Chatbot from '../../components/chatbot/Chatbot';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chatbot from '../../components/chatbot/Chatbot';

function UserHeader() {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const icon = useRef();
    const hide = useRef();
    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));

    function iconClick() {
        console.log(document.getElementById("iconChat").classList.value);
        if (document.getElementById("iconChat").classList.value === 'iconClick') {
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
    function userCheck() {
        if (window.confirm("출석체크 화면으로 이동하시겠습니까?")) {
            navigate("/usercheck")
        }
    }
    const showUserMene = () => hide.current.className = "showUserMene";
    const hideUserMene = () => hide.current.className = "";
    // if (icon.current.className === 'iconClick') {

    // } else {

    // }
    return (
        <header className="dongle-regular">
            <a id="logo" href="/user" >
                <img src={logo} alt=""></img>
            </a>

            <img id='hideButton' src="/img/gnb_btn.png" alt='' onClick={showUserMene}></img>

            <nav>
                <div id="userMenu">
                    <ul>
                        <li><Link to="/user">센터 소개</Link></li>
                        <li><Link to="/user/notice">공지사항</Link></li>
                        <li><Link to="/user/program">프로그램</Link></li>
                        {/* <li><Link to="#">프로그램 후기</Link></li> */}
                        {/* <li><Link to="/user">찾아오시는길</Link></li> */}
                        <li><Link to="/login">관리자(임시)</Link></li>
                    </ul>
                </div>

                <div id="login_group" ref={hide}>
                    <ul>
                        {/* <li><Link to="/">선택창(Test)</Link></li> */}
                        {sessionData ? <>
                            <li><div className='usercheck' onClick={userCheck}>출석 및 급식</div></li>
                            <li><Link to="/user/myInfo">내정보</Link></li>
                        </> :
                            null}
                        <li>{sessionData ? <div className='userLogout' onClick={userLogout}>로그아웃</div> :
                            <Link to="/UserLogin">로그인</Link>}</li>
                        <li><img id='closeButton' src="/img/gnb_close.png" alt='' onClick={hideUserMene}></img></li>
                    </ul>
                </div>
            </nav>



            {/* <div id="iconChat" className='' ref={icon} onClick={iconClick}>
                <img src={iconChat} alt="" />
            </div>


            <Chatbot isModal={modal} setModal={setModal}></Chatbot> */}
        </header>
    );
}
export default UserHeader;