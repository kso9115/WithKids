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
    const [subCurrentTab, setSubCurrentTab] = useState(0);
    const [subMenuArr, setSubMenuArr] = useState([
        { name: '기본 인적 사항', content: <MemberDetail></MemberDetail> },
        { name: '특이사항', content: <MemberDetailNote></MemberDetailNote> }
    ]);




    
    const [memList, setMList] = useState();

    useEffect(() => {
        SpringData();

    }, [])

    async function SpringData() {
        await axios
            .get("/api/mem/memList")
            .then((response) => {
                console.log(response.data);
                setMList(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

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
                <MemberList memList={memList}/>
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
                        menuArr={subMenuArr} setMenuArr={setSubMenuArr}
                        currentTab={subCurrentTab} setCurrentTab={setSubCurrentTab} mainSub={'sub'}>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default MemberMangement;