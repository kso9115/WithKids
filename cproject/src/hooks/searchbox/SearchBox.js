import React, { useState, useEffect, useCallback } from 'react'

function SearchBox({ data, searchBoxClick }) {
    const [sbVal, setSbVal] = useState({});

    function isTrue(element) {
        if (element.check === true) return true;
    }
    const initialization = useCallback(() => {
        const value = {};
        for (let i = 0; i < data.content.length; i++) {
            if (Array.isArray(data.content[i].state)) {
                for (let j = 0; j < data.content[i].state.length; j++) {
                    value[data.content[i].state[j]] = data.content[i].default[j]
                }
            } else {
                if (Array.isArray(data.content[i].default)) {
                    value[data.content[i].state] = data.content[i].default.find(isTrue) ?
                        data.content[i].default.find(isTrue).value : "";
                } else {
                    value[data.content[i].state] = data.content[i].default;
                }
            }
        }
        setSbVal(value);
    }, [data]);

    useEffect(() => {
        initialization();
    }, [data])
    // const 

    // input 입력시 useState 값 바꿔주는 함수
    function change(event, state) {
        sbVal[state] = event.target.value;
        setSbVal({ ...sbVal });
    } //change
    
    // 가져온 data 바탕으로 input/select 생성
    function inputBox(o) {
        switch (o.type) {
            case "text":
                return <input name={o.state} type="text" value={sbVal[o.state]} onChange={(event) => { change(event, o.state) }} />;
            case "date":
                if (Array.isArray(o.default)) {
                    return <>
                        <input name={o.state[0]} type="date" value={sbVal[o.state[0]]} onChange={(event) => { change(event, o.state[0]) }} />
                        ~<input name={o.state[1]} type="date" value={sbVal[o.state[1]]} onChange={(event) => { change(event, o.state[1]) }} />
                    </>
                } else {
                    return <input name={o.state} type="date" value={sbVal[o.state]} onChange={(event) => { change(event, o.state) }} />;
                }
            case "select":
                return <>
                    <select name={o.state} value={sbVal[o.state]} onChange={(event) => { change(event, o.state) }} >
                        <option name="" value="" key="">전체</option>
                        {
                            o.default.map((j, i) => {
                                return <option value={j.value} key={j.name}>{j.name}</option>
                            })
                        }
                    </select>
                </>;
            default:
                break;
        }
    } //inputBox

    return (
        <>
            <p style={{ marginBottom: '5px' }}>{data.name}</p>
            <form action={data.action} method={data.method}>
                <div className='searchBox'>
                    {
                        data.content.map((o, i) => {
                            return (
                                <div key={"search" + i}>{
                                    o.esntl ? <span style={{ color: "red" }}>*</span> : null
                                }{o.name}&nbsp;&nbsp;
                                    {inputBox(o, i)}
                                </div>
                            );
                        })
                    }
                    <div>
                        <button type="button" onClick={() => { searchBoxClick(true); initialization(); }}>리셋</button>&nbsp;
                        <button type="button" onClick={() => searchBoxClick(sbVal)}>조회</button>
                    </div>
                </div>
            </form>
        </>
    );
} //SearchBox

export default React.memo(SearchBox);