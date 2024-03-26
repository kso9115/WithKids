import MemberList from "./MemberList";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../container/Container";   // 메인&서브 분리하여 컴포넌트 재설정
import MemberDetail from "./MemberDetail";
import MemberDetailNote from "./MemberDetailNote";

import SearchBox from "../../hooks/searchbox/SearchBox";
import { mem_mng } from "../../hooks/searchbox/searchData"
import './MemberMangement.css'

function MemberMangement() {

    // Member DB 전체 중 멤버 한명 선택 데이터 : sub탭에 전달, 초기값은 빈 객체
    const [memDataOne, setMemDataOne] = useState({});

    // Education DB연결 : sub탭에 전달, 초기값은 빈 객체
    const [eduDataOne, setEduDataOne] = useState();

    // memberList 업데이트 변화 감지를 위한 상태값 : 자식으로 전달
    const [memListUpdate, serMemListUpdate] = useState(true);

    // main, sub 탭
    const [subCurrentTab, setSubCurrentTab] = useState(0);
    // 신규 버전 sub 탭
    const subMenuArr = [
        { name: '기본 인적 사항', content: '' },
        { name: '특이사항', content: '' }
    ]
    subMenuArr[0].content = <MemberDetail
        data={memDataOne} eduData={eduDataOne}
        setData={setMemDataOne} setEduDataOne={setEduDataOne}
        memListUpdate={memListUpdate} serMemListUpdate={serMemListUpdate} />;
    subMenuArr[1].content = <MemberDetailNote
        memListUpdate={memListUpdate} serMemListUpdate={serMemListUpdate} />;

    // Post 요청을 보낼 시 : 학력 데이터 요청전달 후 출력
    useEffect(() => {
        // 왜오류나는지..?모르것다
        // if (memDataOne.constructor === Object && Object.keys(memDataOne).length !== 0) {
        if (memDataOne.memSerial) {
            console.log(memDataOne.memSerial); // 클릭시 들어옴
            // const memSerial = memDataOne.memSerial;

            axios
                .post('/api/mem/memSelectOneEdu', { memSerial: memDataOne.memSerial })
                .then(response => {
                    console.log(response.data); // 데이터 전달 확인용

                    setEduDataOne(response.data);
                }).catch(function (err) {
                    console.log("error => ", err);
                })
        }
    }, [memDataOne.memSerial]);
    // 테이블이 두개니까 하나의 테이블에 memSerial이 들어가면 다른 테이블에 강제적으로 넣어주기
    // if (!response.data) setMemDataOne({ memSerial: memDataOne.memSerial });


    return (
        <div className='mem_mng'>
            <SearchBox data={mem_mng} />

            <div className='memberMainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    <MemberList
                        //리스트에도 memListUpdate얘를 전달해야하는거아닌가?
                        // memListUpdate={memListUpdate}

                        setData={setMemDataOne}
                        // memDataOne={memDataOne}
                        setEduDataOne={setEduDataOne}

                    />
                </div>

                <div style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgb(223, 222, 222)',
                    marginLeft: '10px',
                    marginRight: '10px'
                }}></div>

                <div style={{
                    width: '70%',
                    height: '100%'
                }}>
                    <Container
                        menuArr={subMenuArr}    //
                        // setMenuArr={setSubMenuArr}   // setMenuArr 신규 버전 변경으로 삭제
                        currentTab={subCurrentTab}
                        setCurrentTab={setSubCurrentTab}
                        mainSub={"sub"}>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default MemberMangement;