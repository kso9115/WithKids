import './programDetailsPrg.css'
import React, { useState, useCallback, useEffect } from 'react';
import AttachedFile from '../../hooks/func/AttachedFile';
import { prg_dtls_prg_inp_ck } from '../../hooks/inputCheck/programInputCheck'
import axios from 'axios';

// 서브 컴포넌트
function MakeDiv({ e, i, detailsChange }) {
    return (<><div>{i + 1}</div><div onClick={() => detailsChange(i)}>{e.prgDnm}</div><div>{e.content}</div></>);
}

// 메인 컴포넌트
function ProgramDetailsPrg({ data, setData, subData, treeUpdate, setTreeUpdate }) {
    console.log("ProgramDetailsPrg");

    const [prgDataOneD, setPrgDataOneD] = useState({}); // data 대,중,소 분류 프로그램명
    const [prgDetailData, setPrgDetailData] = useState({}); // subData
    // const formData = new FormData();
    const [files, setFiles] = useState([]);
    useEffect(() => {
        setPrgDataOneD({
            ...data
        });
        setPrgDetailData({
            rec: "프로그램세부",
            prgMngr: data.prgMngr,
            title: data.prgSubCls + " 세부",
            prgNm: data.prgNm,
            prgId: data.prgId
        })
    }, [data])
    useEffect(() => {
        setFiles([])
    }, [prgDetailData])
    console.log(prgDetailData);
    console.log(data);
    // data를 바탕으로 div 생성
    function makeDiv() {
        if (Array.isArray(subData) && subData.length > 0) {
            // console.log(subData);
            return subData.map((e, i) => (<MakeDiv key={e.rec + e.prgDate + e.prgId} e={e} i={i} detailsChange={detailsChange}></MakeDiv>));
        } else {
            return <div className='notPrgDetail'>정보가 없습니다.</div>;
        }
    }

    //세부프로그램 목록에서 선택한 프로그램의 상세정보 전달
    function detailsChange(i) {
        // console.log(data[i]);
        setPrgDetailData({
            ...subData[i],
            prgFile: subData[i].prgFile !== null ? subData[i].prgFile.split(' ') : []
        })
    }

    // text,radio타입 input태그와 select 태그의 value 값을 제어
    const prgdChange = useCallback((event) => {
        prgDetailData[event.target.name] = event.target.value;
        setPrgDetailData({ ...prgDetailData });
    }, [prgDetailData]);


    function deleteData() {
        if (prgDetailData.prgId && window.confirm("프로젝트를 삭제하시겠습니까?")) {
            // console.log({
            //     prgId: prgDetailData.prgId,
            //     prgDate: prgDetailData.prgDate,
            //     rec: prgDetailData.rec
            // });
            axios.post('/api/prg/prgDtdelete', null, {
                params: {
                    prgId: prgDetailData.prgId,
                    prgDnm: prgDetailData.prgDnm,
                    rec: prgDetailData.rec
                }
            })
                .then(function (response) {
                    // handle success
                    setPrgDetailData({});
                    setData(prgDataOneD);
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

    function saveData(type) {
        //유효성검사
        if (prg_dtls_prg_inp_ck(prgDetailData, type)) {
            let prgFile;
            let params;
            
            if (type === 'prgDtInsert') {
                const today = new Date();
                // 현재 날짜를 가져옵니다.
                const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                // 원하는 형식으로 날짜를 설정합니다.
                prgFile = "programDefault.png";

                if (files.length > 0) {
                    files.forEach((e, i) => {
                        prgFile += " " + e.name;
                        // formData.append(`files${i+1}`, files[i]);
                    });
                };
                params = {
                    ...prgDetailData,
                    prgFile,
                    prgDate: formattedDate
                };
            } else if (type === 'prgDtUpdate') {
                prgFile = "";
                if (files.length > 0) {
                    files.forEach((e, i) => {
                        if (i === 0) prgFile += e.name;
                        else prgFile += " " + e.name;
                    });
                };
                params = {
                    ...prgDetailData,
                    prgFile
                }
            } else return alert("잘못된 요청입니다.");

            axios.post(`/api/prg/${type}`, null, {
                params
            })
            // axios.post(`/api/prg/${type}`)
                .then(function (response) {
                    console.log(response.data);
                    setData(prgDataOneD);
                    setTreeUpdate(!treeUpdate);
                    // fileTransmit(files);
                    alert(response.data);
                }).catch(function (error) {
                    console.log(error);
                    alert("서버 통신 에러로 요청에 실패했습니다.");
                }).then(function () {
                    // 항상 실행
                });
        }
    }

    function fileTransmit(files) {
        console.log("???");
        axios.post('/api/prg/fileTransmit', null, {
            params: {
                prgId: prgDetailData.prgId,
                prgDnm: prgDetailData.prgDnm,
                prgFilef: files
            }
        })
            .then(function (response) {
                console.log(response.data);
                // alert(response.data);
            }).catch(function (error) {
                console.log(error);
                alert("첨부파일 전송에 실패했습니다.");
            }).then(function () {
                // 항상 실행
            });
    }

    return (
        <div style={{
            height: '100%'
        }}>
            <b>세부프로그램 목록</b>
            <div className='prg_dtlprg_grid'>
                <div className='prg_dtlprg_gridBox'>
                    <div>번호</div><div>세부프로그램명</div><div>세부프로그램내용</div>
                    {makeDiv()}
                </div>
            </div>

            <b>세부프로그램 상세정보</b>
            <div className='prg_dtlprg_gridBox2'>
                <div><span>*</span>대분류명</div>
                <div><input type="text" name='prgBigCls' value={prgDataOneD.prgBigCls || ""}
                    onChange={prgdChange} disabled={true} /></div>

                <div><span>*</span>중분류명</div>
                <div><input type="text" name='prgMidCls' value={prgDataOneD.prgMidCls || ""}
                    onChange={prgdChange} disabled={true} /></div>

                <div><span>*</span>소분류명</div>
                <div><input type="text" name='prgSubCls' value={prgDataOneD.prgSubCls || ""}
                    onChange={prgdChange} disabled={true} /></div>

                <div><span>*</span>프로그램명</div>
                <div><input type="text" name='prgNm' value={prgDataOneD.prgNm || ""}
                    onChange={prgdChange} disabled={true} /></div>
            </div>

            <div className='prg_dtlprg_gridBox3'>
                <div><span>*</span>세부프로그램명</div>
                <div><input type="text" name='prgDnm' value={prgDetailData.prgDnm || ""} onChange={prgdChange} /></div>

                <div>세부프로그램 내용</div>
                <div><textarea name='content' cols="140" rows="6" value={prgDetailData.content || ""} onChange={prgdChange}></textarea></div>

                <div>첨부파일</div>
                <div><AttachedFile data={files} setData={setFiles}></AttachedFile></div>
            </div>
            <div className='buttonBox'>
                <div>
                    <button type="button" onClick={() => setPrgDetailData({})}>입력취소</button>
                    <button type="button" value='삭제' onClick={deleteData}>삭제</button>
                    <button type="button" value='신규' onClick={() => saveData("prgDtInsert")}>신규</button>
                    <button type="button" value='저장' onClick={() => saveData("prgDtUpdate")}>저장</button>
                    <button type="button" value='삭제' onClick={() => fileTransmit(files)}>테스트</button>
                </div>
            </div>
        </div>
    );
}

export default ProgramDetailsPrg;