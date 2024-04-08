import "./programPlanDetails.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal"
import { prg_pln_inp_ck } from "../../hooks/inputCheck/programInputCheck";
import AttachedFile from "../../hooks/func/AttachedFile";

import { apiCall } from "../../server/apiService";

function MakeModal({ modal, setData, closeModal }) {
    const [program, setProgram] = useState([]);

    useEffect(() => {
        if (modal) {
            apiCall('/prg/prgList', 'GET')
                .then((response) => {
                    setProgram(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [modal])
    return (program.map((e) => {
        return (
            <div key={e.prgNm} onClick={() => { setData(e.prgId, e.prgNm); closeModal() }}>
                <div>{e.prgBigCls}</div>
                <div>{e.prgMidCls}</div>
                <div>{e.prgSubCls}</div>
                <div>{e.prgNm}</div>
            </div>
        )
    }))
}

function ProgramPlanDetails({ data, setData, listUpdate, setListUpdate }) {
    Modal.setAppElement('#root') //App.js
    const [plnData, setPlnData] = useState({});
    let text = plnData.content;
    useEffect(() => {
        setPlnData({
            ...data,
            plnPrd: data.plnPrd ? data.plnPrd.split("~")[0] : "",
            plnPrd2: data.plnPrd ? data.plnPrd.split("~")[1] : "",
            plnTm: data.plnTm ? data.plnTm.split("~")[0] : "",
            plnTm2: data.plnTm ? data.plnTm.split("~")[1] : "",
            rec: "프로그램계획",
            prgDnm: data.title || "",
            prgFile: data.prgFile ? data.prgFile.split('?') : [],
            prgFilef: null
        })
    }, [data])
    const [modal, setModal] = useState(false);
    const prgpChange = useCallback((event) => {
        plnData[event.target.name] = event.target.value;
        setPlnData({ ...plnData });
    }, [plnData]);

    const openModal = () => setModal(true);

    const closeModal = () => setModal(false);

    const programSelect = (id, name) => setPlnData({ ...plnData, prgNm: name, prgId: id });

    const modalStyle = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            width: "600px",
            height: "400px",
            margin: "auto",
            padding: "20px",
            zIndex: "999999",
        }
    }

    const deleteData = () => {
        console.log(data);
        if (data.rec) {
            if (window.confirm("프로젝트를 삭제하시겠습니까?")) {
                apiCall('/prgPln/prgPlnDelete', 'POST', {
                    prgId: data.prgId,
                    prgDnm: data.prgDnm,
                    rec: data.rec
                })
                    .then((response) => {
                        setData({});
                        setListUpdate(!listUpdate);
                        alert(response.data);
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else alert("취소되었습니다.");
        } else alert("선택된 프로그램계획이 없습니다.");
    }

    function saveData(type, text) {

        if (prg_pln_inp_ck(plnData, type)) {
            let prgFilef = "";
            if (plnData.prgFilef) {
                Array.from({ length: plnData.prgFilef.length }, (_, i) => {
                    return prgFilef += plnData.prgFilef[i].name + "?";
                });
            }
            let params = {
                ...plnData,
                plnPrd: plnData.plnPrd + "~" + plnData.plnPrd2,
                plnTm: !!plnData.plnTm ? plnData.plnTm + "~" + plnData.plnTm2 : null,
                type,
                content: text,
                prgFile: (prgFilef + plnData.prgFile.join('?')).replace(/\?\s*$/, ''),
                prgFilef: null,
                prgDnm: plnData.title
            };
            delete params.plnPrd2;
            delete params.plnTm2;
            console.log(params);
            apiCall('/prgPln/prgPlnSave', 'POST', params)
                .then((response) => {
                    console.log(response.data);
                    saveFile();
                    setListUpdate(!listUpdate);
                    alert(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    alert("서버 통신 에러로 요청에 실패했습니다.");
                })
        }
    }

    function saveFile() {
        if (plnData.prgFilef) {

            let formData = new FormData();
            for (let i = 0; i < plnData.prgFilef.length; i++) {
                formData.append("prgFilef", plnData.prgFilef[i]);
            }
            formData.append("prgId", plnData.prgId);
            formData.append("prgDnm", plnData.prgDnm);
            apiCall('/prg/fileUpload', 'POST', formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    alert("서버 통신 에러로 파일 저장에 실패했습니다.");
                })
        }
    }
    return (
        <div style={{
            height: '100%'
        }}>
            <Modal isOpen={modal} onRequestClose={closeModal} style={modalStyle}>
                <b>프로그램 선택</b>
                <div className="planModal">
                    <div style={{ backgroundColor: 'var(--admin)' }}>
                        <div>사업 대분류</div>
                        <div>사업 중분류</div>
                        <div>사업 소분류</div>
                        <div>프로그램명</div>
                    </div>
                    <MakeModal modal={modal} setData={programSelect} closeModal={closeModal} />
                </div>
                <button className="planModalClose" onClick={closeModal}>닫기</button>
            </Modal>
            <div className='prg_pln_dtl_header'>
                <b>프로그램계획 정보</b>
                <div>
                    <button type="button" onClick={() => setData({})}>입력취소</button>
                    <button type="button" value='삭제' onClick={deleteData}>삭제</button>
                    <button type="button" value='신규'
                        onClick={() => saveData("prgPlnInsert", text)}
                    >신규</button>
                    <button type="button" value='저장'
                        onClick={() => saveData("prgPlnUpdate", text)}
                    >저장</button>
                    <button type="button" value='test'
                        onClick={saveFile}
                    >test</button>
                </div>
            </div>
            <div className='prg_pln_dtl_gridBox'>

                <div><span>*</span>제목</div>
                <div><input type="text" id='title' name='title' value={plnData.title || ""} onChange={prgpChange} /></div>

                <div><span>*</span>일자</div>
                <div><input type="date" id='prgDate' name='prgDate' value={plnData.prgDate || ""} onChange={prgpChange} /></div>

                <div><span>*</span>담당자</div>
                <div><input type="text" id='prgMngr' name='prgMngr' value={plnData.prgMngr || ""} onChange={prgpChange} /></div>

                <div><span>*</span>프로그램</div>
                <div>
                    <button type="button" onClick={openModal}>+</button>
                    <input type="text" id='prgNm' name='prgNm' value={plnData.prgNm || ""} onChange={prgpChange} disabled />
                </div>

                <div><span>*</span>진행일자</div>
                <div><input type="date" id='plnDate' name='plnDate' value={plnData.plnDate || ""} onChange={prgpChange} /></div>

                <div><span>*</span>진행자</div>
                <div><input type="text" id='prgHst' name='prgHst' value={plnData.prgHst || ""} onChange={prgpChange} /></div>

                <div><span>*</span>계획횟수</div>
                <div><input type="number" id='plnCnt' name='plnCnt' value={plnData.plnCnt || ""} onChange={prgpChange} /></div>

                <div><span>*</span>계획인원</div>
                <div><input type="number" id='plnNmbPpl' name='plnNmbPpl' value={plnData.plnNmbPpl || ""} onChange={prgpChange} /></div>

                <div><span>*</span>계획기간</div>
                <div><input type="date" id='plnPrd' name='plnPrd' value={plnData.plnPrd || ""} onChange={prgpChange} />&nbsp;~&nbsp;
                    <input type="date" id='plnPrd2' name='plnPrd2' value={plnData.plnPrd2 || ""} onChange={prgpChange} /></div>

                <div>계획시간</div>
                <div><input type="time" id='plnTm' name='plnTm' value={plnData.plnTm || ""} onChange={prgpChange} />&nbsp;~&nbsp;
                    <input type="time" id='plnTm2' name='plnTm2' value={plnData.plnTm2 || ""} onChange={prgpChange} /></div>

            </div>

            <div className='prg_pln_dtl_fileBox'>
                <div>첨부파일</div>
                <div><AttachedFile data={plnData} setData={setPlnData} name={'prgFile'} files={'prgFilef'} prgTrue={true}></AttachedFile></div>
            </div>

            <div className="prg_pln_dtl_textBox">
                <CKEditor
                    editor={ClassicEditor}
                    data={plnData.content || ""}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        text = editor.getData();
                    }}
                    onBlur={(event, editor) => {
                        // console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                    }}
                >
                </CKEditor>
            </div>
        </div>

    );
}

export default React.memo(ProgramPlanDetails);