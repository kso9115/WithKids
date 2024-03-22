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
    // main, sub 탭
    const [subCurrentTab, setSubCurrentTab] = useState(0);
    // 기존 버전 sub 탭
    // const [subMenuArr, setSubMenuArr] = useState([
    //     { name: '기본 인적 사항', content: <MemberDetail></MemberDetail> },
    //     { name: '특이사항', content: <MemberDetailNote></MemberDetailNote> }
    // ]);

    // 신규 버전 sub탭에 전달할 데이터(상태값) : 초기값은 빈 객체
    const [memDataOne, setMemDataOne] = useState({});   // 멤버 테이블 전체 중 멤버 한명 데이터
            // 멤버 테이블 전체 데이터
    const [memDetail, setMemDetail] = useState();     // 멤버 테이블 전체중..? 멤버리스트에서 선택한 행 id의 세부데이터
    console.log(memDataOne);
    // 신규 버전 sub 탭
    const subMenuArr = [
        { name: '기본 인적 사항', content: '' },
        { name: '특이사항', content: '' }
    ]
    subMenuArr[0].content = <MemberDetail data={memDataOne} />;
    subMenuArr[1].content = <MemberDetailNote data={memDetail} subData={memDataOne} />;

    // 기존ver memList DB 당겨오기(서버연결)
    // const [memList, setMList] = useState(); // memData 였던..넘

    // useEffect(() => {
    //     SpringData();

    // }, [])

    // async function SpringData() {
    //     await axios
    //         .get("/api/mem/memList")
    //         .then((response) => {
    //             console.log(response.data);
    //             setMList(response.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    console.log("memDetail"+memDetail);

    // 신규ver 멤버 테이블 서버 연결 : memList DB 당겨오기


    // 신규ver 멤버 디데일 테이블 서버 연결 : 한 명의 DB 당겨오기
    // setMemDetail 함수로 받아온 데이터 memDetail에 담아주기
    // useEffect(() => {
    //     if (memDataOne.constructor === Object
    //         && Object.keys(memDataOne).length !== 0) {
    //         axios
    //         .get("/api/mem/memSelectOne", {
    //             params:{
    //                 memSerial: memDataOne.memSerial,
    //             }
    //         })
    //         .then((res)=>{
    //             console.log("res.data"+res.data);
    //             setMemDetail(res.data);
    //         }).catch((err)=>{
    //             console.log("멤버한명못가져왓당ㅠㅠ"+err);
    //         })
    //     }
    // },[memDataOne]);


    return (
        <div className='mem_mng'>

            <SearchBox data={mem_mng} />

            <div className='memberMainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    {/* {mList ? mList.map((datas) => (
                    <div key={datas.memSerial}>
                        <div>시리얼번호: {datas.memSerial}</div>
                        <div>이름: {datas.memName}</div>
                        <div>생일: {datas.memBirth}</div>
                        <div>성별: {datas.memSex}</div>
                    </div>
                )) : ''} */}
                    <MemberList 
                                // allData={memData} 
                                setData={setMemDataOne}
                                // memData={memData}
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