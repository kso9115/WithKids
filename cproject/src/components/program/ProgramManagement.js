import './programManagement.css';
import ProgramTree from './ProgramTree'
import ProgramDetails from './ProgramDetails'
import ProgramDetailsPrg from './ProgramDetailsPrg';
import Container from '../container/Container'
import { useState, useEffect } from 'react'
import SearchBox from '../../hooks/searchbox/SearchBox';
import { prg_mng } from '../../hooks/searchbox/searchData'
import { apiCall } from "../../server/apiService"

function ProgramManagement() {
    const [prgDataOne, setPrgDataOne] = useState({}); //프로그램 테이블 전체중에 트리에서 선택한 행 보관
    const [prgDetail, setPrgDetail] = useState([]); //프로그램 테이블 전체중에 트리에서 선택한 행의 프로그램 ID의 세부테이블 정보 보관
    const [treeUpdate, setTreeUpdate] = useState(true);//변화 감지

    const [subCurrentTab, setSubCurrentTab] = useState(0);

    const subMenuArr = [
        { name: '프로그램 상세정보', content: '' },
        { name: '세부 프로그램', content: '' }
    ];
    subMenuArr[0].content = <ProgramDetails data={prgDataOne} setData={setPrgDataOne}
        treeUpdate={treeUpdate} setTreeUpdate={setTreeUpdate} />;
    subMenuArr[1].content = <ProgramDetailsPrg data={prgDataOne} setData={setPrgDataOne} subData={prgDetail}
        treeUpdate={treeUpdate} setTreeUpdate={setTreeUpdate} />;

    useEffect(() => {
        if (prgDataOne.constructor === Object
            && Object.keys(prgDataOne).length !== 0) {

            apiCall('/prg/prgDetails', 'GET', {
                prgId: prgDataOne.prgId,
                rec: '프로그램세부'
            }, null).then((response) => {
                setPrgDetail(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [prgDataOne]);
    function searchBoxClick(sbVal) {
        setTreeUpdate(sbVal);
    }
    return (
        <div className='pgr_mng' >
            <SearchBox data={prg_mng} searchBoxClick={searchBoxClick} />
            <div className='pgr_mng_mainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    <ProgramTree name={'프로그램 목록'} setData={setPrgDataOne} treeUpdate={treeUpdate}></ProgramTree>
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

export default ProgramManagement;