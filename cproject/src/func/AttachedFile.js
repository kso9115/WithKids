import React, { useRef, useState } from 'react';
import './AttachedFile.css'

function AttachedFile() {
    const selectFile = useRef();
    const [files, setFiles] = useState([]);
    const [isActive, setActive] = useState(false);

    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

    function onLoadFile(event) {
        const file = event.target.files;
        const set = new Set([...files, file]);
        console.log([...set]);
        setFiles([...set]);
    }

    function fileMake() {
        if (files.length > 0) {
            return (files.map((o,i) => {
                return (
                    <>
                        <div key={i}>
                            <input type="checkbox" id=''  value={o[0].name}
                                className='deleteCheck'/>
                        </div>
                        <div>{o[0].name}</div>
                        <div>{o[0].size} byte</div>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            name='prg_file'
                            files={o}
                        />
                    </>
                );
            }))
        } else {
            return <p>드래그로 파일을 업로드 가능합니다.</p>;
        }
    }

    function handleDragOver(event) {
        event.preventDefault();  // 필수 1
    };

    function handleDrop(event) {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        const set = new Set([...files, file]);
        console.log([...set]);
        setFiles([...set]);
        setActive(false);

    };

    function deleteFile(event) {
        const deleteCheck = document.querySelectorAll('.deleteCheck');
        console.log(deleteCheck);
        const file = [];
        deleteCheck.forEach((e, i) => {
            console.log(e.checked + " " + i);
            if (!e.checked) file.push(files[i])
            else deleteCheck[i].checked = false;
        })
        setFiles(file);
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

    return (
        <div className={`attachedFile preview${isActive ? ' active' : ''}`}>
            <div>
                <div><input type="checkbox" /></div>
                <div>파일</div>
                <div>용량</div>
            </div>

            <label 
                onDragEnter={handleDragStart}
                onDragOver={handleDragOver}  
                onDragLeave={handleDragEnd}  
                onDrop={handleDrop}
            >
                <div>
                    {fileMake()}
                </div>
                <input
                    type="file"
                    style={{ display: "none" }}
                    ref={selectFile} 
                    onChange={onLoadFile}
                />
            </label>
                
            <div>
                <div></div>
                <div>
                    
                    <button type='button' onClick={() => selectFile.current.click()}>추가</button>
                    <button type='button' onClick={deleteFile}>삭제</button>
                    <button type='button' onClick={downloadFile}>다운로드</button>
                </div>
            </div>
        </div>
    );
}

export default AttachedFile;