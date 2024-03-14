import { useState } from 'react'

function SearchBox({ data }) {
    
    const [sbVal, setSbVal] = useState(...[data.content.map((o) => { return o.default })]);

    // input 입력시 useState 값 바꿔주는 함수
    function change(i, e, d) {

        if (d !== undefined) {
            sbVal[i][d] = e.target.value;
            setSbVal({
                ...sbVal
            });
            
        } else {
            sbVal[i] = e.target.value;
            setSbVal({
                ...sbVal
            });
        }
    } //change

    // 가져온 data 바탕으로 input/select 생성
    function inputBox(o, i) {
        switch (o.type) {
            case "text":
                return <input name={o.state} type="text" value={sbVal[i]} onChange={(e) => { change(i,e) }} />;
            case "date":
                if (Array.isArray(o.default)) {
                    return <>
                        <input name={o.state[0]} type="date" value={sbVal[i][0]} onChange={(e) => { change(i, e, 0) }} />
                        ~<input name={o.state[1]} type="date" value={sbVal[i][1]} onChange={(e) => { change(i, e, 1) }} />
                    </>
                } else {
                    return <input name={o.state} type="date" value={sbVal[i]} onChange={(e) => { change(i, e) }} />;
                }
            case "select":
                return <>
                    <select>
                        <option name={o.state} value="" key="">전체</option>
                        {
                            o.default.map((j,i) => {
                                return <option value={j.value} key={i}>{j.name}</option>
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
            <p style={{ marginBottom:'5px'}}>{data.name}</p>
            <form action={data.action} method={data.method}>
                <div className='searchBox'>
                    {
                        data.content.map((o, i) => {
                            return (
                                <div key={"search"+i}>{
                                    o.esntl ? <span style={{ color: "red" }}>*</span> : null
                                }{o.name}&nbsp;&nbsp;
                                    {inputBox(o, i)}
                                </div>
                            );
                        })
                    }
                    <div>
                        <button type="reset">리셋</button>&nbsp;
                        <button type="button">조회</button>
                    </div>
                </div>

            </form>
        </>
    );
} //SearchBox

export default SearchBox;