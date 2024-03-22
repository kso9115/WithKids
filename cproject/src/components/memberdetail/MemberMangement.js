import MemberList from "./MemberList";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../container/Container";
import MemberDetail from "./MemberDetail";
import MemberDetailNote from "./MemberDetailNote";

import SearchBox from "../../hooks/searchbox/SearchBox";
import { mem_mng } from "../../hooks/searchbox/searchData"
import './MemberMangement.css'

function MemberMangement() {
    // 신규 버전 sub탭에 전달할 데이터(상태값) : 초기값은 빈 객체
    const [memDataOne, setMemDataOne] = useState({});   // 멤버 테이블 전체 중 멤버 한명 데이터
    const [memDetail, setMemDetail] = useState();       // 멤버 테이블 전체중..? 멤버리스트에서 선택한 행 id의 세부데이터
    console.log(memDataOne);


    // main, sub 탭
    const [subCurrentTab, setSubCurrentTab] = useState(0);
    // 신규 버전 sub 탭
    const subMenuArr = [
        { name: '기본 인적 사항', content: '' },
        { name: '특이사항', content: '' }
    ]
    subMenuArr[0].content = <MemberDetail data={memDataOne} setData={setMemDataOne} />;
    subMenuArr[1].content = <MemberDetailNote/>;

    return (
        <div className='mem_mng'>
            <SearchBox data={mem_mng} />

            <div className='memberMainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    <MemberList 
                                setData={setMemDataOne}
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
                        menuArr={subMenuArr}
                        // setMenuArr={setSubMenuArr}   // setMenuArr 신규 버전 변경으로 삭제
                        currentTab={subCurrentTab}
                        setCurrentTab={setSubCurrentTab}
                        mainSub={'sub'}>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default MemberMangement;