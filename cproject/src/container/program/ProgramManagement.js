import './programManagement.css';
import ProgramTree from './ProgramTree'
import ProgramDetails from './ProgramDetails'
import ProgramDetailsPrg from './ProgramDetailsPrg';
import Container from '../Container'
import { useState, useEffect } from 'react'
import SearchBox from '../searchbox/SearchBox';
import { prg_mng } from '../searchbox/searchData'

function ProgramManagement() {
    const [programId, setProgramId] = useState('');
    const [subMenuArr, setSubMenuArr] = useState([
        { name: '프로그램 상세정보', content: <ProgramDetails data={programId} setData={setProgramId}/>},
        { name: '세부 프로그램', content: <ProgramDetailsPrg data={programId} setData={setProgramId}/> }
    ]);
    const [subCurrentTab, setSubCurrentTab] = useState(0);
    console.log(programId);

    useEffect(() => {
        setSubMenuArr([
            { name: '프로그램 상세정보', content: <ProgramDetails data={programId} setData={setProgramId} /> },
            { name: '세부 프로그램', content: <ProgramDetailsPrg data={programId} setData={setProgramId} /> }
        ])
    }, [programId])
    
    return (
        <div className='pgr_mng' >
            <SearchBox data={prg_mng} />
            <div className='pgr_mng_mainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    <ProgramTree name={'프로그램 목록'} setData={setProgramId}></ProgramTree>
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
                    <Container menuArr={subMenuArr} setMenuArr={setSubMenuArr} currentTab={subCurrentTab} setCurrentTab={setSubCurrentTab} mainSub={'sub'} ></Container>
                </div>
            </div>
        </div>
    );
}

export default ProgramManagement;