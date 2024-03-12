import './programManagement.css';
import ProgramTree from './ProgramTree'
import ProgramDetails from './ProgramDetails'
import Container from '../Container'
import { useState } from 'react'
import SearchBox from './SearchBox';

const data = {
    name: '프로그램 정보 관리',
    content: [
        {
            name: '프로그램 기간',
            state: 'programDate',
            type: 'date',
            count: 2,
            esntl: true,
            default: ['2024-01-01', '2024-12-31']
        },
        {
            name: '프로그램명',
            state: 'programName',
            type: 'text',
            count: 1,
            esntl: false,
            default: ''
        },
        {
            name: '담당자',
            state: 'manager',
            type: 'text',
            count: 1,
            esntl: false,
            default: ''
        }
        ,
        {
            name: '프로그램 그룹',
            state: 'programGroup',
            type: 'select',
            count: 5,
            esntl: false,
            default: [{ name: '음악', value: '음악' }, { name: '공부', value: '공부' }, { name: '독서', value: '독서' }]
        }
    ]
}

function ProgramManagement() {
    const [subMenuArr, setSubMenuArr] = useState([
        { name: '프로그램 상세정보', content: <ProgramDetails></ProgramDetails> },
        { name: '세부 프로그램', content: <div>세부 프로그램</div> }
    ]);
    const [subCurrentTab, setSubCurrentTab] = useState(0);
    return (
        <div style={{
            color: "black",
            height: "100%"
        }}>
            <SearchBox data={data}></SearchBox>
            <p>프로그램 정보 관리</p>
            <form>
                <div className='searchBox'>
                    <div>
                        <span style={{color:"red"}}>*</span>프로그램 기간&nbsp;&nbsp;
                        <input type="date" value={'2024-01-01'}/>
                        ~
                        <input type="date" value={'2024-12-31'} />
                    </div>
                    <div>
                        프로그램명&nbsp;&nbsp;
                        <input type="text" />
                    </div>
                    <div>
                        담당자&nbsp;&nbsp;
                        <input type="text" />
                    </div>
                    <div>
                        프로그램 그룹&nbsp;&nbsp;
                        <select>
                            <option value="" key="">전체</option>
                        </select>
                    </div>
                    <div>
                        <button type="reset">리셋</button>&nbsp;
                        <button type="button">조회</button>
                    </div>
                </div>
            </form>
            <div className='mainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    <div style={{
                        marginBottom: '5px'
                    }}>
                        프로그램 목록
                    </div>
                    <ProgramTree></ProgramTree>
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
                    <Container menuArr={subMenuArr} setMenuArr={setSubMenuArr} currentTab={subCurrentTab} setCurrentTab={setSubCurrentTab} mainSub={'sub'}></Container>
                </div>
            </div>
        </div>
    );
}

export default ProgramManagement;