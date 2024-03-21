import SearchBox from '../../hooks/searchbox/SearchBox';
import { stf_mng } from '../../hooks/searchbox/searchData'
import ListComponent from '../../hooks/ListComponent';
import './staffManagement.css'
import { staffData } from './data'
import { useState } from 'react';

const staffList = {
    name: 'stf',
    list: '직원 목록',
    title: ['직위', '이름', '아이디', '휴대전화', '아동관리', '소통관리', '센터관리'],
    menu: ['staff_pst', 'staff_nm', 'staff_id', 'staff_phnn', 'staff_chl_cr', 'staff_cmn_mng', 'staff_cnt_mng']
}


function StaffManagement() {
    const [stfData, setStfData] = useState(staffData);
    const [stfDataOne, setStfDataOne] = useState({});
    
    return (
        <div className='stf_mng' >
            <SearchBox data={stf_mng} />
            <div className='stf_mng_mainBox'>
                <div style={{
                    width: '40%',
                    height: '100%',
                }}>
                    <ListComponent name={staffList} data={stfData} setData={setStfDataOne} />
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
                    
                </div>
            </div>
        </div>
    );
}

export default StaffManagement;