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
    // 멤버 테이블 전체 중 멤버 한명 데이터
    const [memDataOne, setMemDataOne] = useState({});

    // 멤버 테이블 전체중..? 멤버리스트에서 선택한 행 id의 세부데이터
    // const [memDetail, setMemDetail] = useState();       
    //console.log(memDataOne);

    // member Education DB연결
    const [eduDataOne, setEduDataOne] = useState();
    // console.log(eduDataOne);
    // console.log(memDataOne);

    // main, sub 탭
    const [subCurrentTab, setSubCurrentTab] = useState(0);
    // 신규 버전 sub 탭
    const subMenuArr = [
        { name: '기본 인적 사항', content: '' },
        { name: '특이사항', content: '' }
    ]
    subMenuArr[0].content = <MemberDetail
        data={memDataOne} eduData={eduDataOne}
        setData={setMemDataOne} setEduDataOne={setEduDataOne} />;
    subMenuArr[1].content = <MemberDetailNote />;

    // Education Entity DB 접속 : memSelectOneEdu 매핑
    // Get 요청을 보낼 시 params 값을 전달해야한다.
    // useEffect(() => {
    //     if (memDataOne.memSerial) {
    //         console.log(memDataOne.memSerial); // 클릭시 들어옴
    //         // const memSerial = memDataOne.memSerial;

    //         axios
    //             .get('/api/mem/memSelectOneEdu',{
    //                 params:{
    //                     memSerial:memDataOne.memSerial
    //                 }
    //             })
    //             .then(response => {
    //                 console.log(response.data); // 데이터 전달 확인용
    //                 setEduDataOne(response.data);
    //             }).catch(function (err){
    //                 console.log("error => ",err);
    //             })
    //     }
    // }, [memDataOne.memSerial]);


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