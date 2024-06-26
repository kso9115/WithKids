import './programDetailsPrg.css'
import React, { useState, useCallback, useEffect, useRef } from 'react';
import AttachedFile from '../../hooks/func/AttachedFile';
import { prg_dtls_prg_inp_ck } from '../../hooks/inputCheck/programInputCheck'
import { apiCall } from "../../server/apiService"
import { toStringByFormatting } from '../../hooks/formdate';

// 서브 컴포넌트
function MakeDiv({ e, i, detailsChange }) {
    return (<><div>{i + 1}</div><div onClick={() => detailsChange(e.prgDnm)}>{e.prgDnm}</div><div>{e.content}</div></>);
}

// 메인 컴포넌트
function ProgramDetailsPrg({ data, setData, subData, treeUpdate, setTreeUpdate }) {
    const loginInfo = JSON.parse(sessionStorage.getItem("staffname"));
    const staffCntMng = loginInfo.data.staffCntMng !== 2;
    const [prgDataOneD, setPrgDataOneD] = useState({}); // data 대,중,소 분류 프로그램명
    const [prgDetailData, setPrgDetailData] = useState({}); // subData
    useEffect(() => {
        setPrgDataOneD({
            ...data
        });
        setPrgDetailData({
            rec: "프로그램세부",
            prgMngr: data.prgMngr,
            title: data.prgSubCls + " 세부",
            prgNm: data.prgNm,
            prgId: data.prgId,
            prgFile: [],
            prgFilef: null
        })
    }, [data])

    // data를 바탕으로 div 생성
    function makeDiv() {
        if (Array.isArray(subData) && subData.length > 0) {
            // console.log(subData);
            return subData.map((e, i) => (<MakeDiv key={e.rec + e.prgDnm + e.prgId} e={e} i={i} detailsChange={detailsChange}></MakeDiv>));
        } else {
            return <div className='notPrgDetail'>정보가 없습니다.</div>;
        }
    }

    //세부프로그램 목록에서 선택한 프로그램의 상세정보 전달
    function detailsChange(prgDnm) {

        apiCall('/prg/prgDetailsOne', 'POST', {
            rec: "프로그램세부",
            prgId: data.prgId,
            prgDnm,
        })
            .then((response) => {
                setPrgDetailData({
                    ...response.data,
                    prgFile: response.data.prgFile ? response.data.prgFile.split('?') : [],
                })
            })
            .catch((error) => {
                console.log(error);
            })

        // setPrgDetailData({
        //     ...subData[i],
        //     prgFile: subData[i].prgFile ? subData[i].prgFile.split('?') : [],
        // })
    }

    // text,radio타입 input태그와 select 태그의 value 값을 제어
    const prgdChange = useCallback((event) => {
        prgDetailData[event.target.name] = event.target.value;
        setPrgDetailData({ ...prgDetailData });
    }, [prgDetailData]);

    function deleteData() {
        if (prgDetailData.prgId && window.confirm("세부 프로그램을 삭제하시겠습니까?")) {
            apiCall('/jwtPrg/prg/prgDtdelete', 'POST', {
                prgId: prgDetailData.prgId,
                prgDnm: prgDetailData.prgDnm,
                rec: prgDetailData.rec
            }, loginInfo.data.token)
                .then((response) => {
                    setPrgDetailData({});
                    setData(prgDataOneD);
                    setTreeUpdate(!treeUpdate);
                    alert(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    if (error === 403) alert("권한이 없습니다. ");
                    else alert("서버 통신 에러로 요청에 실패했습니다.");
                })
        } else alert("선택된 세부 프로그램이 없습니다.");
    }

    function saveFile() {
        if (prgDetailData.prgFilef) {

            let formData = new FormData();
            for (let i = 0; i < prgDetailData.prgFilef.length; i++) {
                formData.append("prgFilef", prgDetailData.prgFilef[i]);
            }
            formData.append("prgId", prgDetailData.prgId);
            formData.append("prgDnm", prgDetailData.prgDnm);

            apiCall('/prg/fileUpload', 'POST', formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    alert("서버 통신 에러로 파일 업로드에 실패했습니다.");
                })
        }
    }

    function saveData(type) {
        //유효성검사
        if (prg_dtls_prg_inp_ck(prgDetailData, type)) {

            let prgFilef = "";
            if (prgDetailData.prgFilef) {
                Array.from({ length: prgDetailData.prgFilef.length }, (_, i) => {
                    return prgFilef += prgDetailData.prgFilef[i].name + "?";
                });
            }
            let params = {
                ...prgDetailData,
                prgFile: (prgFilef + prgDetailData.prgFile.join('?')).replace(/\?\s*$/, ''),
                prgFilef: null
            };

            if (type === 'prgDtInsert') {
                // 원하는 형식으로 날짜를 설정합니다.
                const formattedDate = toStringByFormatting(new Date());

                params = {
                    ...params,
                    prgDate: formattedDate,
                    type: 'prgDtInsert'
                };
            } else if (type === 'prgDtUpdate') {
                params = {
                    ...params,
                    type: 'prgDtUpdate'
                }
            } else return alert("잘못된 요청입니다.");
            apiCall('/jwtPrg/prg/prgDtSave', 'POST', params, loginInfo.data.token)
                .then((response) => {
                    saveFile();
                    console.log(response.data);
                    setData(prgDataOneD);
                    setTreeUpdate(!treeUpdate);
                    alert(response.data);
                })
                .catch((error) => {
                    if (error === 403) alert("권한이 없습니다. ");
                    else alert("서버 통신 에러로 요청에 실패했습니다.");
                })
        }
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
                <div><input type="text" name='prgDnm' value={prgDetailData.prgDnm || ""} onChange={prgdChange} disabled={staffCntMng} /></div>

                <div><span>*</span>세부프로그램 내용</div>
                <div><textarea name='content' cols="140" rows="6" value={prgDetailData.content || ""} onChange={prgdChange} disabled={staffCntMng}></textarea></div>

                <div>첨부파일</div>
                <div><AttachedFile data={prgDetailData} setData={setPrgDetailData} name={'prgFile'} files={'prgFilef'} prgTrue={true}></AttachedFile></div>
            </div>
            <div className='buttonBox'>
                {staffCntMng ? null :
                    <div>
                        <button type="button" onClick={() => setPrgDetailData({})}>입력취소</button>
                        <button type="button" value='삭제' onClick={deleteData}>삭제</button>
                        <button type="button" value='신규' onClick={() => saveData("prgDtInsert")}>신규</button>
                        <button type="button" value='저장' onClick={() => saveData("prgDtUpdate")}>저장</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProgramDetailsPrg;