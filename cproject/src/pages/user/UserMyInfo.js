import { useEffect, useRef, useState } from 'react';
import './userMyInfo.css'
import { apiCall } from '../../server/apiService';
import { API_BASE_URL } from '../../server/app-config';

//서브 컴포넌트 MemberInfo
function UserMemberInfo() {
    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));
    const [memData, setMemData] = useState({});
    console.log(memData);
    useEffect(() => {
        apiCall('/mem/memEduAll', 'POST', { memSerial: sessionData.data.id })
            .then((response) => {
                setMemData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return (
        <>
            <div className='userMemberBox'>
                <div className='userMemberImg'>
                    {/* 이미지 받아오기 위한 요청 진행 */}
                    <img src={API_BASE_URL+"/api/mem/memOneImg?memSerial="+memData.memSerial} alt="" />
                </div>
                <div className='userMemberInfo'>
                    <div>ID</div><div>{memData.memSerial || ""}</div>
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
            </div>
            <div className='userMemberMg'>해당 정보가 사실과 다를시에 센터 선생님들께 연락 부탁드립니다.</div>
        </>
    );
}
//서브 컴포넌트 ProgramInfo
function UserProgramInfo() {
    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));
    const [prgData, setPrgData] = useState([]);

    useEffect(() => {
        console.log("??");
        apiCall('/prgPln/memAplList', 'POST', { memSerial: sessionData.data.id })
            .then((response) => {
                setPrgData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    console.log(prgData);
    return (
        <div className='userProgramBox'>
            <div>
                <div>프로그램명</div>
                <div>신청일</div>
                <div>구분</div>
                <div>프로그램 요금</div>
                <div>취소</div>
            </div>
            {prgData.map((ele,i) => (
                <div>
                    <div>{ele.prgNm}</div>
                    <div>{ele.prgDate}</div>
                    <div>{ele.costClsfc}</div>
                    <div>{ele.paidAmount}</div>
                    <div>취소</div>
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