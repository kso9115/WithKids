import './programPlan.css'
import { useState } from 'react';
import ListComponent from '../../hooks/ListComponent';
import SearchBox from '../../hooks/searchbox/SearchBox';
import { prg_pln } from '../../hooks/searchbox/searchData';
import ProgramPlanDetails from './ProgramPlanDetails';

const prgPlnList = {
    name: 'prgPln',
    list: '프로그램계획 목록',
    title: ['일자', '프로그램', '제목', '담당자'],
    menu: ['prgDate', 'prgNm', 'title', 'prgMngr']
}

function ProgramPlan() {
    const [prgDataOne, setPrgDataOne] = useState({}); //프로그램 테이블 전체중에 트리에서 선택한 행 보관
    const [prgDetail, setPrgDetail] = useState([]); //프로그램 테이블 전체중에 트리에서 선택한 행의 프로그램 ID의 세부테이블 정보 보관
    const [listUpdate, setListUpdate] = useState(true);//변화 감지


    function searchBoxClick(sbVal) {
        setListUpdate(sbVal);
    }

    return (
        <div className='pgr_pln' >
            <SearchBox
                data={prg_pln}
                searchBoxClick={searchBoxClick}
            />
            <div className='pgr_pln_mainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    <ListComponent name={prgPlnList} setData={setPrgDataOne} listUpdate={listUpdate}></ListComponent>
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
                    <ProgramPlanDetails data={prgDataOne} setData={setPrgDataOne} />
                </div>
            </div>
        </div>
    );
}

export default ProgramPlan;