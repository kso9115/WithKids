import { useRef, useState } from 'react';
import './userMyInfo.css'
import { Component } from 'react';

//서브 컴포넌트 MemberInfo
function UserMemberInfo() {

    return (
        <div className='userMemberInfo'>
            <div>ID</div><div>ID</div>
            <div>이름</div><div>임의</div>
            <div>생년월일</div><div>임의</div>
            <div>성별</div><div>임의</div>
            <div>연령(만나이)</div><div>임의</div>
            <div>담당자</div><div>임의</div>
            <div>전화번호</div><div>임의</div>
            <div>휴대전화번호</div><div>임의</div>
            <div>이메일</div><div>임의</div>
            <div>주소</div><div>임의</div>
            <div>계좌정보</div><div>임의</div>
            <div>학급정보</div><div>임의</div>
        </div>
    );
}
//서브 컴포넌트 ProgramInfo
function UserProgramInfo() {
    return (
        <div></div>
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