import './programDetailsPrg.css'
import React, { useState, useCallback, useEffect } from 'react';
import AttachedFile from '../../hooks/func/AttachedFile';
import axios from 'axios';

function MakeDiv({ e, i, detailsChange }) {
    return (<><div>{i + 1}</div><div onClick={() => detailsChange(i)}>{e.title}</div><div>{e.content}</div></>);
}

function ProgramDetailsPrg({ data, subData, treeUpdate, setTreeUpdate }) {
    console.log("ProgramDetailsPrg");
    console.log(subData);
    const [prgDetailData, setPrgDetailData] = useState({});

    useEffect(() => {
        setPrgDetailData({
            prgBigCls: subData.prgBigCls,
            prgMidCls: subData.prgMidCls,
            prgSubCls: subData.prgSubCls,
            prgNm: subData.prgNm
        });
    }, [subData])

    // data를 바탕으로 div 생성
    function makeDiv() {
        if (Array.isArray(data) && data.length > 0) {
            // console.log(data);
            return data.map((e, i) => (<MakeDiv key={e.rec + e.prgDate + e.prgId} e={e} i={i} detailsChange={detailsChange}></MakeDiv>));
        } else {
            return <div className='notPrgDetail'>정보가 없습니다.</div>;
        }
    }

    //세부프로그램 목록에서 선택한 프로그램의 상세정보 전달
    function detailsChange(i) {
        // console.log(data[i]);
        setPrgDetailData({
            ...data[i],
            // prgId: subData.prgId,
            // prgBigCls: subData.prgBigCls,
            // prgMidCls: subData.prgMidCls,
            // prgSubCls: subData.prgSubCls,
            prgFile: data[i].prgFile !== null ? data[i].prgFile.split(' ') : []
        })
    }

    // text,radio타입 input태그와 select 태그의 value 값을 제어
    const prgdChange = useCallback((event) => {
        prgDetailData[event.target.name] = event.target.value;
        setPrgDetailData({ ...prgDetailData });
    }, [prgDetailData]);
    // console.log(prgDetailData);

    function deleteData() {
        if (prgDetailData.prgId && window.confirm("프로젝트를 삭제하시겠습니까?")) {
            console.log({
                prgId: prgDetailData.prgId,
                prgDate: prgDetailData.prgDate,
                rec: prgDetailData.rec
            });
            axios.post('/api/prg/prgDtdelete', null, {
                params: {
                    prgId: prgDetailData.prgId,
                    prgDate: prgDetailData.prgDate,
                    rec: prgDetailData.rec
                }
            })
                .then(function (response) {
                    // handle success
                    setPrgDetailData({
                        prgBigCls: subData.prgBigCls,
                        prgMidCls: subData.prgMidCls,
                        prgSubCls: subData.prgSubCls,
                        prgNm: subData.prgNm
                    });
                    setTreeUpdate(!treeUpdate);
                    alert(response.data);
                    console.log(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });

        } else alert("선택된 프로그램이 없습니다.");
    }
    return (
        <div style={{
            height: '100%'
        }}>
            <b>세부프로그램 목록</b>
            <div className='prg_dtlprg_grid'>
                {/* <div className='prg_dtlprg_gridBoxT'>
                        <div>번호</div><div>세부프로그램명</div><div>세부프로그램내용</div><div></div>
                    </div> */}
                <div className='prg_dtlprg_gridBox'>
                    <div>번호</div><div>세부프로그램명</div><div>세부프로그램내용</div>
                    {makeDiv()}
                </div>
            </div>

            <b>세부프로그램 상세정보</b>
            <div className='prg_dtlprg_gridBox2'>
                <div><span>*</span>대분류명</div>
                <div><input type="text" name='prgBigCls' value={prgDetailData.prgBigCls || ""}
                    onChange={prgdChange} disabled={true} /></div>

                <div><span>*</span>중분류명</div>
                <div><input type="text" name='prgMidCls' value={prgDetailData.prgMidCls || ""}
                    onChange={prgdChange} disabled={true} /></div>

                <div><span>*</span>소분류명</div>
                <div><input type="text" name='prgSubCls' value={prgDetailData.prgSubCls || ""}
                    onChange={prgdChange} disabled={true} /></div>

                <div><span>*</span>프로그램명</div>
                <div><input type="text" name='prgNm' value={prgDetailData.prgNm || ""}
                    onChange={prgdChange} disabled={true} /></div>
            </div>

            <div className='prg_dtlprg_gridBox3'>
                <div><span>*</span>세부프로그램명</div>
                <div><input type="text" name='prgDnm' value={prgDetailData.prgDnm || ""} onChange={prgdChange} /></div>

                <div>세부프로그램 내용</div>
                <div><textarea name='content' cols="140" rows="6" value={prgDetailData.content || ""} onChange={prgdChange}></textarea></div>

                <div>첨부파일</div>
                <div><AttachedFile setData={setPrgDetailData}></AttachedFile></div>
            </div>
            <div className='buttonBox'>
                <div>
                    <button type="button" onClick={() => setPrgDetailData({})}>입력취소</button>
                    <button type="button" value='삭제' onClick={deleteData}>삭제</button>
                    {/* <button type="button" value='신규' onClick={() => saveData("prgInsert")}>신규</button>
                    <button type="button" value='저장' onClick={() => saveData("prgUpdate")}>저장</button> */}
                </div>
            </div>
        </div>
    );
}

export default ProgramDetailsPrg;