import { useEffect, useRef, useState } from 'react';
import './userMyInfo.css'
import { apiCall } from '../../server/apiService';
import { API_BASE_URL } from '../../server/app-config';
import Modal from "react-modal"
import { Link, useNavigate } from 'react-router-dom';
import { BiX } from 'react-icons/bi';

//서브 컴포넌트 MemberInfo
function UserMemberInfo() {
    Modal.setAppElement('#root') //App.js
    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));
    const navigate = useNavigate();
    const [memData, setMemData] = useState({});
    const [modal, setModal] = useState(false);
    const [password, setPassword] = useState(["", "", ""]);
    let password0 = "";
    let password1 = "";
    let password2 = "";
    let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    console.log(memData);
    useEffect(() => {
        apiCall('/mem/memEduAll', 'POST', { memSerial: sessionData.data.id })
            .then((response) => {
                console.log(response.data);
                setMemData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

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
    const openModal = () => setModal(true);

    const closeModal = () => setModal(false);

    const pwChange = (event, num) => {
        password[num] = event.target.value;
        setPassword({ ...password })
    }
    const pwChangeRequest = () => {
        if (password[0] === "") alert("기존 비밀번호를 입력해주세요.");
        else if (password[1] === "" || !reg.test(password[1])) alert("숫자,영문,특수기호 포함 8글자로 입력해주세요.")
        else if (password[2] === "" || password[1] !== password[2]) alert("변경 비밀번호와 비밀번호 확인이 서로 일치하지않습니다.")
        else {
            apiCall('/mem/changePswrd', 'POST', {
                memSerial: sessionData.data.id,
                memLoginPW: password[0],
                memEndF: password[2]
            })
                .then((response) => {
                    if ("성공" === response.data) {
                        alert("비밀번호 변경이 완료되었습니다.");
                        sessionStorage.removeItem('userLogin');
                        navigate("/user");
                    } else {
                        alert(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    if (password[1] !== "" && !reg.test(password[1])) password1 = "숫자,영문,특수기호 포함 8글자로 입력해주세요."
    if (password[2] !== "" && password[1] !== password[2]) password2 = "변경 비밀번호와 비밀번호 확인이 서로 일치하지않습니다."

    return (
        <>
            <div className='userMemberBox'>
                <div className='userMemberImg'>
                    {/* 이미지 받아오기 위한 요청 진행 */}
                    <img src={API_BASE_URL + "/api/mem/memOneImg?memSerial=" + memData.memSerial} alt="" />
                </div>
                <div className='userMemberInfo'>
                    <div>ID</div><div>{memData.memSerial || ""}</div>
                    <div>비밀번호</div><div><button type='button' onClick={openModal}>비밀번호 변경</button></div>
                    <div>이름</div><div>{memData.memName || ""}</div>
                    <div>생년월일</div><div>{memData.memBirth || ""}</div>
                    <div>성별</div><div>{memData.memSex || ""}</div>
                    <div>연령(만나이)</div><div>{memData.memAge || ""}</div>
                    <div>담당자</div><div>{memData.memResPerson || ""}</div>
                    <div>전화번호</div><div>{memData.memPhone || ""}</div>
                    <div>휴대전화번호</div><div>{memData.memTel || ""}</div>
                    <div>이메일</div><div>{memData.memMail || ""}</div>
                    <div>주소</div><div>{`(${memData.memZipCode})${memData.memAddress1} ${memData.memAddress2}` || ""}</div>
                    <div>계좌정보</div><div>{`${memData.memBank} ${memData.memAccount} (${memData.memDepositor})` || ""}</div>
                    <div>학급정보</div><div>{memData.education ? `${memData.education.eduName} ${memData.education.eduBack} ${memData.education.eduGrade} 
            , 담임: ${memData.education.eduTeacher}(${memData.education.eduTeacherPhone})` : ""}</div>
                </div>
                <Modal isOpen={modal} onRequestClose={closeModal} style={modalStyle}>
                    <div className="userMyInfoModalHeader">
                        <b>비밀번호 변경</b>

                        <BiX size="2em" onClick={closeModal} />
                        {/* <button className="navbarModalClose" onClick={closeModal}>X</button> */}
                    </div>

                    <div className="userMyInfoModalMain">
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
                    <div className="userMyInfoModalButton" onClick={pwChangeRequest}>비밀번호 변경</div>
                </Modal>
            </div>
            <div className='userMemberMg'>해당 정보가 사실과 다를시에 센터 선생님들께 연락 부탁드립니다.</div>
        </>
    );
}
//서브 컴포넌트 ProgramInfo
function UserProgramInfo() {
    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));
    const [prgData, setPrgData] = useState([]);
    const [rend, setRend] = useState(false);
    useEffect(() => {
        apiCall('/prgPln/memAplList', 'POST', { memSerial: sessionData.data.id })
            .then((response) => {
                setPrgData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [rend])

    function prgCnclt(ele) {
        console.log(sessionData.data.token);
        if (window.confirm("신청을 취소하시겠습니까?")) {
            apiCall('/user/prgCnclt', 'POST', ele, sessionData.data.token)
                .then((response) => {
                    alert(response.data);
                    setRend(!rend);
                })
                .catch((error) => {
                    console.error(error);
                })
        } else alert("취소하셨습니다.");
    }

    return (
        <div className='userProgramBox'>
            <div>
                <div>프로그램명</div>
                <div>신청일</div>
                <div>구분</div>
                <div>프로그램 요금</div>
                <div>취소</div>
                <div>후기</div>
                <div>결제정보</div>
            </div>
            {prgData.map((ele, i) => (
                <div key={ele.prgNm}>
                    <div>{ele.prgNm}</div>
                    <div>{ele.prgDate}</div>
                    <div>{ele.costClsfc}</div>
                    <div>{ele.paidAmount}</div>
                    <div>{ele.cnclt === 0 ? <p className='cnclt' onClick={() => prgCnclt(ele)}>취소</p> : "취소완료"}</div>
                    {/* <div><Link to="/survey">후기작성</Link></div> */}
                    <div><Link className='cnclt' to="https://docs.google.com/forms/d/e/1FAIpQLSc9cUTDM9g3RqnzCx9NlrbQUt1G--JxYx-lJQye0TCRFGzZSw/viewform?embedded=true" target="_blank">후기작성</Link></div>
                    <div>{ele.costClsfc === "유료" ?
                        <Link className='cnclt' to='https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20240423154314390044&noMethod=1' target="_blank">
                            결제정보
                        </Link> : ""}</div>
                </div>
            ))}
        </div>
    );
}

//메인 컴포넌트
function UserMyInfo() {
    const memberInfo = useRef();
    const programInfo = useRef();
    const [currentTab, setCurrentTab] = useState(0);
    function InfoProgramCg(event) {
        if (event.target.id === "memberInfoId") {
            memberInfo.current.className = "userMyInfoCk";
            programInfo.current.className = "";
            setCurrentTab(0);
        } else if (event.target.id === "programInfoId") {
            memberInfo.current.className = "";
            programInfo.current.className = "userMyInfoCk";
            setCurrentTab(1);
        }
    }

    function ComponentCg() {
        if (currentTab === 0) {
            return <UserMemberInfo />
        } else if (currentTab === 1) {
            return <UserProgramInfo />
        }
    }

    return (
        <>
            <div className='userMyInfoHead'>
                <p>내 정보</p>
            </div>
            <div className='userMyInfoContent'>
                <div>
                    <div id="memberInfoId" className="userMyInfoCk" ref={memberInfo} onClick={InfoProgramCg}>개인정보</div>
                    <div></div>
                    <div id="programInfoId" className="" ref={programInfo} onClick={InfoProgramCg}>프로그램 신청 현황</div>
                </div>
                {ComponentCg()}
            </div>
        </>
    );
}

export default UserMyInfo;