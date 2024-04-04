import './noticeManagement.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCallback, useEffect, useState } from 'react';
import { notice_inp_ck } from '../../hooks/inputCheck/noticeInputCheck';
import { apiCall } from '../../server/apiService';

function NoticeDetails({ data, setData, listUpdate, setListUpdate }) {
    let text = data.content;
    const [noticeData, setNoticeData] = useState({});

    useEffect(() => {
        setNoticeData(data)
    }, [data]);

    const prgpChange = useCallback((event) => {
        noticeData[event.target.name] = event.target.value;
        setNoticeData({ ...noticeData });
    }, [noticeData]);

    function saveData(type, text) {

        if (notice_inp_ck(noticeData, type, text)) {
            noticeData.content = text;
            apiCall('/notice/noticeSave', 'POST', noticeData)
                .then((response) => {
                    setListUpdate(!listUpdate);
                    alert(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    alert("서버 통신 에러로 요청에 실패했습니다.");
                })
        }
    }

    function deleteData() {

    }

    return (
        <div style={{
            height: '100%'
        }}>
            <div className='notice_header'>
                <b>프로그램계획 정보</b>
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
                    value={noticeData.title || ""} onChange={prgpChange}
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
            </div>

        </div>
    );
}

export default NoticeDetails;