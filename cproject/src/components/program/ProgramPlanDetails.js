import "./programPlanDetails.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "react-modal"
import axios from "axios";

function MakeModal({ modal, setData, closeModal }) {
    const [program, setProgram] = useState([]);

    useEffect(() => {
        const prgList = async () => {
            try {
                const response = await axios.get('/api/prg/prgList');
                setProgram(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        if (modal) {
            prgList();
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
    let text = "";

    const [modal, setModal] = useState(false);
    const prgpChange = useCallback((event) => {
        data[event.target.name] = event.target.value;
        setData({ ...data });
    }, [data]);

    const openModal = () => setModal(true);

    const closeModal = () => setModal(false);

    const programSelet = (id, name) => setData({ ...data, prgNm: name, prgId: id });

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
                axios.post('/api/prgPln/prgPlnDelete', {
                    prgId: data.prgId,
                    prgDnm: data.prgDnm,
                    rec: data.rec
                })
                    .then((response) => {
                        // handle success
                        setData({});
                        setListUpdate(!listUpdate);
                        alert(response.data);
                        console.log(response.data);
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                    })
                    .then(() => {
                        // always executed
                    });
            } else alert("취소되었습니다.");
        } else alert("선택된 프로그램계획이 없습니다.");
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
                    <MakeModal modal={modal} setData={programSelet} closeModal={closeModal} />
                </div>
                <button className="planModalClose" onClick={closeModal}>닫기</button>
            </Modal>
            <div className='prg_pln_dtl_header'>
                <b>프로그램계획 정보</b>
                <div>
                    <button type="button" onClick={() => setData({})}>입력취소</button>
                    <button type="button" value='삭제' onClick={deleteData}>삭제</button>
                    <button type="button" value='신규'
                    // onClick={() => saveData("prgInsert")}
                    >신규</button>
                    <button type="button" value='저장'
                    // onClick={() => saveData("prgUpdate")}
                    >저장</button>
                </div>
            </div>
            <div className='prg_pln_dtl_gridBox'>

                <div><span>*</span>제목</div>
                <div><input type="text" id='title' name='title' value={data.title || ""} onChange={prgpChange} /></div>

                <div><span>*</span>일자</div>
                <div><input type="date" id='prgDate' name='prgDate' value={data.prgDate || ""} onChange={prgpChange} /></div>

                <div><span>*</span>담당자</div>
                <div><input type="text" id='prgMngr' name='prgMngr' value={data.prgMngr || ""} onChange={prgpChange} /></div>

                <div><span>*</span>프로그램</div>
                <div>
                    <button type="button" onClick={openModal}>+</button>
                    <input type="text" id='prgNm' name='prgNm' value={data.prgNm || ""} onChange={prgpChange} disabled />
                </div>

                <div><span>*</span>진행자</div>
                <div><input type="text" id='prgHst' name='prgHst' value={data.prgHst || ""} onChange={prgpChange} /></div>

                <div><span>*</span>계획횟수</div>
                <div><input type="number" id='plnCnt' name='plnCnt' value={data.plnCnt || ""} onChange={prgpChange} /></div>

                <div><span>*</span>계획인원</div>
                <div><input type="number" id='plnNmbPpl' name='plnNmbPpl' value={data.plnNmbPpl || ""} onChange={prgpChange} /></div>

                <div><span>*</span>계획기간</div>
                <div><input type="date" id='plnPrd' name='plnPrd' value={data.plnPrd ? data.plnPrd.split("~")[0] : ""} onChange={prgpChange} />&nbsp;~&nbsp;
                    <input type="date" id='plnPrd2' name='plnPrd2' value={data.plnPrd ? data.plnPrd.split("~")[1] : ""} onChange={prgpChange} /></div>

                <div>계획시간</div>
                <div><input type="time" id='plnTm' name='plnTm' value={data.plnTm ? data.plnTm.split("~")[0] : ""} onChange={prgpChange} />&nbsp;~&nbsp;
                    <input type="time" id='plnTm2' name='plnTm2' value={data.plnTm ? data.plnTm.split("~")[1] : ""} onChange={prgpChange} /></div>
            </div>
            <div className="prg_pln_dtl_textBox">
                <CKEditor
                    editor={ClassicEditor}
                    data={data.content || ""}
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