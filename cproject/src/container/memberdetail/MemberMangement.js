import MemberList from "./MemberList";
import { useState } from "react";
import Container from "../Container";
import MemberDetail from "./MemberDetail";

import SearchBox from "../searchbox/SearchBox";
import { mem_mng } from "../searchbox/searchData"
import './MemberMangement.css'

function MemberMangement() {
    const [subCurrentTab, setSubCurrentTab] = useState(0);
    const [subMenuArr, setSubMenuArr] = useState([
        { name: '기본 인적 사항', content: <MemberDetail></MemberDetail> },
        { name: '특이사항', content: <div>특이사항세부 textarea사용해서 적기만..??</div> }
    ]);

    return (
        <div>
            <SearchBox data={mem_mng} />

            <div className='memberMainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    <MemberList />
                </div>

                <div style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgb(223, 222, 222)',
                    marginLeft: '5px',
                    marginRight: '5px'
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