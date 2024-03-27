import React, { useRef, useState, useEffect } from 'react';
import './AttachedFile.css'
import axios from 'axios';
import { qs } from 'qs';

function FileMake(params) {

}

function AttachedFile({ data, setData, name, files }) {
    const selectFile = useRef();
    // 파일을 저장
    const [isActive, setActive] = useState(false);

    //파일 드래그 시의 css 제어를 위해
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);
    const dataTransfer = new DataTransfer();

    // if (Array.isArray(data[name]) && data[name].length > 0) {
    //     for (var i = 0; i < data[name].length; i++) {
    //         dataTransfer.items.add(data[files][i])
    //     }
    // }

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
    function deleteFile2(event) {
        const deleteCheck = document.querySelectorAll('.deleteCheck2');
        const liveTransfer = new DataTransfer();
        deleteCheck.forEach((e, i) => {
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
                                className='deleteCheck' onChange={oneCheck} />
                        </div>
                        <div><label htmlFor={data[name][i]} >{data[name][i]}</label></div>
                        <div><button type='button'>다운로드</button></div>
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
                                className='deleteCheck2' onChange={oneCheck} value={i} />
                        </div>
                        <div><label htmlFor={data[files][i].name} >{data[files][i].name}</label></div>
                        <div><button type='button'>다운로드</button></div>
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
        const deleteCheck = document.querySelectorAll('.deleteCheck');
        deleteCheck.forEach((e, i) => {
            e.checked = event.target.checked
        })
    }

    function oneCheck() {
        const deleteCheck = document.querySelectorAll('.deleteCheck');
        let count = 0;
        deleteCheck.forEach(e => {
            if (e.checked === false) return document.getElementById('fullCheck').checked = false;
            else count++;
        })
        if (count === deleteCheck.length) return document.getElementById('fullCheck').checked = true;
    }

    function downloadFile(event) {
        alert("다운로드 가능한 파일이 없습니다.")
        // const deleteCheck = document.querySelectorAll('.deleteCheck');
        // console.log(deleteCheck);
        // const file = [];
        // deleteCheck.forEach((e, i) => {
        //     console.log(e.checked + " " + i);
        //     if (!e.checked) file.push(files[i])
        //     else deleteCheck[i].checked = false;
        // })
        // setFiles(file);
    }

    console.log(data);
    return (
        <div className={`attachedFile preview${isActive ? ' active' : ''}`}>
            <div>
                <div><input type="checkbox" id='fullCheck' onChange={(event) => fullCheck(event)} /></div>
                <div>파일</div>
                <div>기존/신규</div>
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
                    <button type='button' onClick={() => data && data.prgId && data.prgDnm ?
                        selectFile.current.click() : alert("프로그램을 선택해 세부프로그램명을 입력해야 업로드 가능합니다.")}>추가</button>
                    <button type='button' onClick={deleteFile}>삭제</button>
                    <button type='button' onClick={downloadFile}>다운로드</button>
                </div>
            </div>
        </div>

    );
}

export default AttachedFile;