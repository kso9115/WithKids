import React, { useRef, useState, useEffect } from 'react';
import './AttachedFile.css'

function AttachedFile({ data, setData }) {
    const selectFile = useRef();
    // 파일을 저장
    const [isActive, setActive] = useState(false);
    console.log(data);
    // useEffect(() => {
    //     setFiles({
    //         ...data
    //     });
    // }, [data])
    //파일 드래그 시의 css 제어를 위해
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

    //파일 저장 함수
    function onLoadFile(event) {
        const file = event.target.files;
        const set = new Set([...data, file]);
        console.log([...set]);
        setData([...set]);
    }

    function fileMake() {
        if (data.length > 0) {
            return (data.map((o, i) => {
                return (
                    <>
                        <div key={i}>
                            <input type="checkbox" id='' value={o[0].name}
                                className='deleteCheck' />
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

        const file = event.dataTransfer.files;
        const set = new Set([...data, file]);
        console.log([...set]);
        setData([...set]);
        setActive(false);

    };

    function deleteFile(event) {
        const deleteCheck = document.querySelectorAll('.deleteCheck');
        console.log(deleteCheck);
        const file = [];
        deleteCheck.forEach((e, i) => {
            console.log(e.checked + " " + i);
            if (!e.checked) file.push(data[i])
            else deleteCheck[i].checked = false;
        })
        setData(file);
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