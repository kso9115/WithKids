import SearchBox from '../../hooks/searchbox/SearchBox';
import { stf_mng } from '../../hooks/searchbox/searchData'
import ListComponent from '../../hooks/ListComponent';
import Container2 from '../container/Container'
import './staffManagement.css'
import { useState } from 'react';
import StaffDetails from './StaffDetails';
import StaffAttendance from './StaffAttendance';

const staffList = {
    name: 'staff',
    list: '직원 목록',
    title: ['직위', '이름', '아이디', '휴대전화', '아동관리', '소통관리', '센터관리'],
    menu: ['staffPst', 'staffNm', 'staffId', 'staffPhnn', 'staffChlCr', 'staffCmnMng', 'staffCntMng']
}


function StaffManagement() {
     
    const [stfDataOne, setStfDataOne] = useState({}); //직원 테이블 전체중에 리스트에서 선택한 행 보관
    // const [stfDetail, setStfDetail] = useState([]); //직원 테이블 전체중에 트리에서 선택한 행의 직원 ID의 세부테이블 정보 보관
    const [listUpdate, setListUpdate] = useState(true); // 리스트 업데이트 용

    const [subCurrentTab, setSubCurrentTab] = useState(0);
    const subMenuArr = [
        { name: '직원 정보', content: '' },
        { name: '직원 근태', content: '' }
    ];
    subMenuArr[0].content = <StaffDetails data={stfDataOne} setData={setStfDataOne}
        listUpdate={listUpdate} setListUpdate={setListUpdate} />;
    subMenuArr[1].content = <StaffAttendance />;
    console.log(stfDataOne);
    return (
        <div className='staff_mng' >
            <SearchBox data={stf_mng} />
            <div className='staff_mng_mainBox'>
                <div style={{
                    width: '40%',
                    height: '100%',
                }}>
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
                    <Container2 subMenuArr={subMenuArr} currentTab={subCurrentTab} setCurrentTab={setSubCurrentTab} mainSub={'sub'} ></Container2>
                </div>
            </div>
        </div>
    );
}

export default StaffManagement;