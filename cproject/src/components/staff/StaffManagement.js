import SearchBox from '../../hooks/searchbox/SearchBox';
import { stf_mng } from '../../hooks/searchbox/searchData'
import ListComponent from '../../hooks/ListComponent';
import Container from '../container/Container'
import './staffManagement.css'
import { useEffect, useRef, useState } from 'react';
import StaffDetails from './StaffDetails';
import StaffAttendance from './StaffAttendance';
import axios from 'axios';

const staffList = {
    name: 'staff',
    list: '직원 목록',
    title: ['직위', '이름', '아이디', '휴대전화', '아동관리', '소통관리', '센터관리'],
    menu: ['staffPst', 'staffNm', 'staffId', 'staffPhnn', 'staffChlCr', 'staffCmnMng', 'staffCntMng']
}

function StaffManagement() {

    const [stfDataOne, setStfDataOne] = useState({}); //직원 테이블 전체중에 리스트에서 선택한 행 보관
    const [listUpdate, setListUpdate] = useState(true); // 리스트 업데이트 용
    const staffPst = stf_mng.staffPstList; // 직위 정보를 호출
    const [subCurrentTab, setSubCurrentTab] = useState(0); // 탭창용
    const hide = useRef();
    const subMenuArr = [
        { name: '직원 정보', content: '' },
        { name: '직원 근태', content: '' }
    ];
    subMenuArr[0].content = <StaffDetails data={stfDataOne} setData={setStfDataOne} staffPst={staffPst}
        listUpdate={listUpdate} setListUpdate={setListUpdate} />;
    subMenuArr[1].content = <StaffAttendance />;

    function searchBoxClick(sbVal) {
        setListUpdate(sbVal);
    }
    const hidemouseOver = () => hide.current.className = "stfPrmsDtlsHide stfhide";
    const hidemouseOut = () => hide.current.className = "stfPrmsDtlsHide"
    return (
        <div className='staff_mng' >
            <SearchBox data={stf_mng} searchBoxClick={searchBoxClick} />
            <div className='staff_mng_mainBox'>
                <div style={{
                    width: '40%',
                    height: '100%',
                }}>
                    <div ref={hide} className='stfPrmsDtlsHide'>
                        <p>
                            [아동관리] 1Lv : 아동관리 전 메뉴 열람, 출석관리 급식관리 수정가능<br></br>
                            &emsp;&emsp;&emsp;&emsp;&emsp;2Lv : 1Lv + 아동관리 수정가능<br></br>
                            <br></br>
                            [소통관리] 1Lv : 아동과 채팅 가능<br></br>
                            <br></br>
                            [센터관리] 1Lv : 프로그램 관리 메뉴 열람<br></br>
                            &emsp;&emsp;&emsp;&emsp;&emsp;2Lv : 1Lv + 센터 운영 전 메뉴 수정가능
                        </p>
                    </div>
                    <b>{staffList.list}<span className='stfPrmsDtls'
                        onMouseOver={hidemouseOver}
                        onMouseOut={hidemouseOut}
                    >권한 상세정보</span></b>
                    <ListComponent name={staffList} setData={setStfDataOne} listUpdate={listUpdate} />
                </div>
                <div style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgb(223, 222, 222)',
                    marginLeft: '5px',
                    marginRight: '5px'
                }}></div>
                <div style={{
                    width: '60%',
                    height: '100%'
                }}>
                    <Container menuArr={subMenuArr} currentTab={subCurrentTab} setCurrentTab={setSubCurrentTab} mainSub={"sub"}></Container>
                </div>
            </div>
        </div>
    );
}

export default StaffManagement;