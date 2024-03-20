import MemberList from "./MemberList";
import { useState } from "react";
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

    return (
        <div className='mem_mng'>
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