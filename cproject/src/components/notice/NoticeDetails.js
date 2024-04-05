import './noticeManagement.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCallback, useEffect, useState } from 'react';
import { notice_inp_ck } from '../../hooks/inputCheck/noticeInputCheck';
import { apiCall } from '../../server/apiService';
import { toStringByFormatting } from '../../hooks/formdate';
import AttachedFile from '../../hooks/func/AttachedFile';

function NoticeDetails({ data, setData, listUpdate, setListUpdate }) {
    const [noticeData, setNoticeData] = useState({});
    let text = noticeData.content;

    useEffect(() => {
        setNoticeData({
            ...data,
            file: data.file ? data.file.split('?') : [],
            filef: null
        })
    }, [data]);

    const noticeChange = useCallback((event) => {
        noticeData[event.target.name] = event.target.value;
        noticeData.content = text;
        setNoticeData({ ...noticeData });
    }, [noticeData, text]);

    const emphasisCheck = useCallback((event) => {
        noticeData[event.target.name] = (event.target.checked ? 1 : 0);
        noticeData.content = text;
        setNoticeData({ ...noticeData });
    }, [noticeData, text]);

    function saveData(type, text) {
        if (notice_inp_ck(noticeData, type, text)) {
            noticeData.content = text;
            let filef = "";
            if (noticeData.filef) {
                Array.from({ length: noticeData.filef.length }, (_, i) => {
                    return filef += noticeData.filef[i].name + "?";
                });
            }
            let params = {
                ...noticeData,
                file: (filef + noticeData.file.join('?')).replace(/\?\s*$/, ''),
                filef: null,
            };
            if (type === 'noticeInsert') {
                params.regdate = toStringByFormatting(new Date());
            }
            apiCall('/notice/noticeSave', 'POST', params)
                .then((response) => {
                    saveFile();
                    setData({})
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
        if (noticeData.filef && noticeData.filef.length> 0) {
            let formData = new FormData();
            for (let i = 0; i < noticeData.filef.length; i++) {
                formData.append("filef", noticeData.filef[i]);
            }
            formData.append("seq", noticeData.seq);
            apiCall('/notice/fileUpload', 'POST', formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    alert("서버 통신 에러로 에 실패했습니다.");
                })
        }
    }

    function deleteData() {

    }
    console.log(noticeData);
    return (
        <div style={{
            height: '100%'
        }}>
            <div className='notice_header'>
                <b>공지사항 작성</b>
                <div>
                    <button type="button" onClick={() => setData({})}>입력취소</button>
                    <button type="button" value='삭제' onClick={deleteData}>삭제</button>
                    <button type="button" value='신규'
                        onClick={() => saveData("noticeInsert", text)}
                    >신규</button>
                    <button type="button" value='저장'
                        onClick={() => saveData("noticeUpdate", text)}
                    >저장</button>
                </div>
            </div>
            <div className='notice_gridBox'>
                <div><span>*</span>제목</div>
                <div><input type="text" id='title' name='title'
                    value={noticeData.title || ""} onChange={noticeChange}
                /></div>

                <div>중요공지</div>
                <div><input type="checkbox" id='emphasis' name='emphasis'
                    checked={noticeData.emphasis === 1} onChange={emphasisCheck}
                /></div>

                <div><span>*</span>내용</div>
                <div className="notice_textBox">
                    <CKEditor
                        editor={ClassicEditor}
                        data={noticeData.content || ""}
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

                <div>첨부파일</div>
                <div><AttachedFile data={noticeData} setData={setNoticeData} name={'file'} files={'filef'}></AttachedFile></div>
            </div>

        </div>
    );
}

export default NoticeDetails;