import './programPlan.css'
import { useState } from 'react';
import ListComponent from '../../hooks/ListComponent';
import SearchBox from '../../hooks/searchbox/SearchBox';
import { prg_pln } from '../../hooks/searchbox/searchData';
import ProgramPlanDetails from './ProgramPlanDetails';
import ProgramApplication from './ProgramApplication';
import Container from '../container/Container';
import { apiCall } from '../../server/apiService';

const prgPlnList = {
    name: 'prgPln',
    list: '프로그램계획 목록',
    title: ['일자', '프로그램', '제목', '담당자'],
    menu: ['prgDate', 'prgNm', 'title', 'prgMngr']
}

function ProgramPlan() {
    const [prgDataOne, setPrgDataOne] = useState({}); //프로그램 테이블 전체중에 트리에서 선택한 행 보관
    const [listUpdate, setListUpdate] = useState(true);//변화 감지

    const [subCurrentTab, setSubCurrentTab] = useState(0);

    const subMenuArr = [
        { name: '프로그램계획 정보', content: '' },
        { name: '프로그램신청 정보', content: '' }
    ];
    subMenuArr[0].content = <ProgramPlanDetails data={prgDataOne} setData={setPrgDataOne} listUpdate={listUpdate} setListUpdate={setListUpdate} />;
    subMenuArr[1].content = <ProgramApplication data={prgDataOne} setData={setPrgDataOne} listUpdate={listUpdate} setListUpdate={setListUpdate} />;

    function searchBoxClick(sbVal) {
        const param = { ...sbVal, prgDate: sbVal.prgDate + "~" + sbVal.prgDate2 };
        delete param.prgDate2;
        console.log(param)
        setListUpdate(param);
    }

    function setPrgDataOneCg(listData) {
        if (Array.isArray(listData) && listData.length === 0) {
            setPrgDataOne([]);
        } else {
            apiCall('/prgPln/prgPlnOne', 'POST', {
                rec: "프로그램계획",
                prgId: listData.prgId,
                prgDnm: listData.prgDnm,
            })
                .then((response) => {
                    setPrgDataOne(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
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
                    <b>{prgPlnList.list}</b>
                    <ListComponent name={prgPlnList} setData={setPrgDataOneCg} listUpdate={listUpdate}></ListComponent>
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
                    <Container menuArr={subMenuArr} currentTab={subCurrentTab} setCurrentTab={setSubCurrentTab} mainSub={"sub"}></Container>
                </div>
            </div>
        </div>
    );
}

export default ProgramPlan;