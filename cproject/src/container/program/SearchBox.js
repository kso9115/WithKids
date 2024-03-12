import { useState } from 'react'

// const data = new Map();

// data.set(

// )

function SearchBox({ data }) {
    const [sbVal, setSbVal] = useState(...[data.content.map((o) => { return o.default })]);
    console.log(sbVal);

    function change(n, i, e, d) {
        
        console.log(e.target.value + " " + d);
        
        let c = sbVal;
        // console.log(c);
        // if (d !== undefined) {
        //     c[i][d] = e.target.value;
        // } else {
        //     c[i] = e.target.value;
        // }
        // console.log(c);
        // setSbVal(c);
        if (d !== undefined) {
            c[i][d] = e.target.value;
            setSbVal({
                ...sbVal,
                c
            });
            
        } else {
            c[i] = e.target.value;
            setSbVal({
                ...sbVal,
                c
            });
        }
        // setSbVal({
        //     ...sbVal,

        // });
    }

    function inputBox(o, i) {
        switch (o.type) {
            case "text":
                return <input type="text" value={sbVal[i]} onChange={(e) => { change(o.default,i,e) }} />;
            case "date":
                if (o.count === 1) {
                    return <input type="date" value={sbVal[i]} onChange={(e) => { change(o.default, i, e) }} />;
                } else {
                    return <>
                        <input type="date" value={sbVal[i][0]} onChange={(e) => { change(o.default, i, e , 0) }} />
                        ~<input type="date" value={sbVal[i][1]} onChange={(e) => { change(o.default, i, e, 1) }} />
                    </>
                }
            case "select":
                return <>
                    <select>
                        <option value="" key="">전체</option>
                        {
                            o.default.map((j) => {
                                return <option value={j.value} key="">{j.name}</option>
                            })
                        }
                    </select>
                </>;
            default:
                break;
        }
    }

    return (
        <>
            <p>{data.name}</p>
            <form>
                <div className='searchBox'>
                    {
                        data.content.map((o, i) => {
                            return (
                                <div>{
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
}

export default SearchBox;