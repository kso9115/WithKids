import React, { useRef, useState } from 'react';
import './AttachedFile.css'
import axios from 'axios';
import { apiCall } from '../../server/apiService';


function AttachedFile({ data, setData, name, files, prgTrue }) {
    const selectFile = useRef();
    // 파일을 저장
    const [isActive, setActive] = useState(false);

    //파일 드래그 시의 css 제어를 위해
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);
    const dataTransfer = new DataTransfer();

    function handleDragOver(event) {
        event.preventDefault();  // 필수 1
    };

    //드래그로 파일 저장 함수
    function handleDrop(event) {
        event.preventDefault();

        const file = event.dataTransfer.files;
        for (var i = 0; i < file.length; i++) {
            dataTransfer.items.add(file[i])
        }
        selectFile.current.files = dataTransfer.files;
        data[files] = selectFile.current.files;

        let dataName = []
        for (let i = 0; i < selectFile.current.files.length; i++) {
            dataName.push(selectFile.current.files[i].name)
        }
        data[name] = dataName

        setData({ ...data });
        setActive(false);
    };

    //버튼 클릭으로 파일 저장 함수
    function onLoadFile(event) {
        const file = event.target.files;

        for (var i = 0; i < file.length; i++) {
            dataTransfer.items.add(file[i])
        }
        selectFile.current.files = dataTransfer.files;
        data[files] = selectFile.current.files;

        setData({ ...data });
    }

    //
    function deleteFile() {
        deleteFilef();
        const deleteCheck = document.querySelectorAll('.deleteCheck');
        const liveName = [];
        deleteCheck.forEach((e, i) => {
            if (!e.checked) {
                liveName.push(data[name][i])
            } else e.checked = false;
        })
        data[name] = liveName;
        setData({ ...data });
    }
    function deleteFilef() {
        const deleteCheckf = document.querySelectorAll('.deleteCheckf');
        const liveTransfer = new DataTransfer();
        deleteCheckf.forEach((e, i) => {
            if (!e.checked) {
                liveTransfer.items.add(data[files][i])
            } else e.checked = false;
        })
        selectFile.current.files = liveTransfer.files;
        data[files] = selectFile.current.files;
        setData({ ...data });
    }
    // 기존파일 생성
    function fileMake() {
        if (Array.isArray(data[name]) && data[name].length > 0) {
            // setData(data);
            return (data[name].map((o, i) => {
                return (
                    <div key={data[name][i]}>
                        <div>
                            <input type="checkbox" id={data[name][i]}
                                className='deleteCheck allCheck' onChange={oneCheck} />
                        </div>
                        <div><label htmlFor={data[name][i]} >{data[name][i]}</label></div>
                        <div><button type='button' name={data[name][i]} onClick={downloadFile}>다운로드</button></div>
                    </div>
                );
            }))
        } else return null;
    }

    // 파일 추가시 생성
    function fileMake2() {
        if (!!data[files] && data[files].length) {
            return (Array.from({ length: data[files].length }, (_, i) => {
                return (
                    <div key={data[files][i].name}>
                        <div>
                            <input type="checkbox" id={data[files][i].name}
                                className='deleteCheckf allCheck' onChange={oneCheck} value={i} />
                        </div>
                        <div><label htmlFor={data[files][i].name} >{data[files][i].name}</label></div>
                        <div><button type='button' name={data[files][i].name} onClick={() => alert("방금 추가한 파일은 다운로드 할 수 없습니다.")}>다운로드</button></div>
                    </div>
                );
            }))
        } else return null;
    }

    // 아무것도 없을때 생성
    function fileMake3() {
        if ((Array.isArray(data[name]) && data[name].length === 0) && (!data[files] || data[files] == null)) {
            return (
                <>
                    {/* <p>프로그램을 선택해 세부프로그램명을 입력해야 업로드 가능합니다.<br />드래그로 파일을 업로드 가능합니다.</p> */}
                    <p>드래그로 파일을 업로드 가능합니다.</p>
                </>
            );
        } else return null;
    }

    function fullCheck(event) {
        const deleteCheck = document.querySelectorAll('.allCheck');
        deleteCheck.forEach((e, i) => {
            e.checked = event.target.checked
        })
    }

    function oneCheck() {
        const deleteCheck = document.querySelectorAll('.allCheck');
        let count = 0;
        deleteCheck.forEach(e => {
            if (e.checked === false) return document.getElementById('fullCheck').checked = false;
            else count++;
        })
        if (count === deleteCheck.length) return document.getElementById('fullCheck').checked = true;
    }

    function downloadFile(event) {
        if (window.confirm(`${event.target.name} 파일을 다운로드 하시겠습니까?`)) {
            prgTrue ?
                apiCall('/prg/filedownload', 'GET', {
                    prgId: data.prgId,
                    prgDnm: data.prgDnm,
                    fileName: event.target.name
                })
                    .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        // a 태그를 생성하고 다운로드 링크를 설정하여 다운로드를 유도
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', event.target.name); // 다운로드할 파일명을 설정
                        document.body.appendChild(link);
                        link.click();
                        // URL 객체의 사용이 끝나면 해제하여 메모리 누수를 방지
                        URL.revokeObjectURL(url);
                    })
                    .catch((error) => {
                        console.error('파일 다운로드 실패:', error);
                    })
                :
                apiCall('/notice/filedownload', 'GET', {
                    seq: data.seq,
                    fileName: event.target.name
                })
                    .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        // a 태그를 생성하고 다운로드 링크를 설정하여 다운로드를 유도
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', event.target.name); // 다운로드할 파일명을 설정
                        document.body.appendChild(link);
                        link.click();
                        // URL 객체의 사용이 끝나면 해제하여 메모리 누수를 방지
                        URL.revokeObjectURL(url);
                    })
                    .catch((error) => {
                        console.error('파일 다운로드 실패:', error);
                    })
        }
    }

    return (
        <div className={`attachedFile preview${isActive ? ' active' : ''}`}>
            <div>
                <div><input type="checkbox" id='fullCheck' onChange={(event) => fullCheck(event)} /></div>
                <div>파일</div>
                <div>다운로드</div>
            </div>

            <label
                onDragEnter={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragEnd}
                onDrop={handleDrop}
            >
                {fileMake()}
                {fileMake2()}
                {fileMake3()}
                <input
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    ref={selectFile}
                    onChange={onLoadFile}
                    files={data[files]}
                />
            </label>

            <div>
                <div></div>
                <div>
                    {prgTrue ? <button type='button' onClick={() => data && data.prgId && data.prgDnm ?
                        selectFile.current.click() : alert("프로그램을 선택해 세부프로그램명을 입력해야 업로드 가능합니다.")}>추가</button>
                        : <button type='button' onClick={() => selectFile.current.click()}>추가</button>}

                    <button type='button' onClick={deleteFile}>삭제</button>
                </div>
            </div>
        </div>

    );
}

export default AttachedFile;