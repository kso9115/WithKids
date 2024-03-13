import MemberList from "./MemberList";
import { useState } from "react";
import Container from "../Container";
import MemberDetail from "./MemberDetail";

import SearchBox from "../searchbox/SearchBox";
import { mem_mng } from "../searchbox/searchData"

function MemberMangement() {
    const [subMenuArr, setSubMenuArr] = useState([
        { name: '기본 인적 사항', content: <MemberDetail></MemberDetail> },
        { name: '특이사항', content: <div>특이사항세부 textarea사용해서 적기만..??</div> }
    ]);

    const [subCurrentTab, setSubCurrentTab] = useState(0);

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