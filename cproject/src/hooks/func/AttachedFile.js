import React, { useRef, useState, useEffect } from 'react';
import './AttachedFile.css'

function AttachedFile({ data, setData, name, files }) {
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
    const dataTransfer = new DataTransfer();
    //파일 저장 함수
    function onLoadFile(event) {
        const file = event.target.files;

        for (var i = 0; i < file.length; i++) {
            dataTransfer.items.add(file[i])
        }
        selectFile.current.files = dataTransfer.files;
        console.log("dataTransfer =>", dataTransfer.files);
        console.log("input FIles =>", selectFile.current.files);

        data[files] = selectFile.current.files;

        let dataName = []
        for (let i = 0; i < selectFile.current.files.length; i++) {
            dataName.push(selectFile.current.files[i].name)
        }
        data[name] = dataName
        console.log(data);
        // const set = new Set([...data, file]);
        setData({...data});
    }

    function fileMake() {
        console.log(Array.isArray(data[name]) && data[name].length > 0);
        // console.log(data[files].constructor === Object);
        // console.log(Object.keys(data[files]).length > 0);
        if (Array.isArray(data[name]) && data[name].length > 0) {
            // setData(data);
            return (data[name].map((o, i) => {
                return (
                    <>
                        <div key={data[files][i].name}>
                            <input type="checkbox" id='' 
                                className='deleteCheck' />
                        </div>
                        <div>{data[files][i].name}</div>
                        <div>{data[files][i].size} byte</div>
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

                    <button type='button' onClick={() => selectFile.current.click()}>추가</button>
                    <button type='button' onClick={deleteFile}>삭제</button>
                    <button type='button' onClick={downloadFile}>다운로드</button>
                </div>
            </div>
        </div>

    );
}

export default AttachedFile;