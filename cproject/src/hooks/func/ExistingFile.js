import './AttachedFile.css'

function ExistingFile() {
    
    return (
        <div className={`existingFile`} >
            <div>
                <div>파일</div>
                <div>다운로드</div>
                <div>삭제</div>
            </div>

            <label
                // onDragEnter={handleDragStart}
                // onDragOver={handleDragOver}
                // onDragLeave={handleDragEnd}
                // onDrop={handleDrop}
            >
                <div>
                    {/* {fileMake()} */}
                    <div>파일이름</div>
                    <div><button>다운로드</button></div>
                    <div><button>삭제</button></div>
                    <div>파일이름</div>
                    <div><button>다운로드</button></div>
                    <div><button>삭제</button></div>
                    <div>파일이름</div>
                    <div><button>다운로드</button></div>
                    <div><button>삭제</button></div>
                    <div>파일이름</div>
                    <div><button>다운로드</button></div>
                    <div><button>삭제</button></div>
                    <div>파일이름</div>
                    <div><button>다운로드</button></div>
                    <div><button>삭제</button></div>
                </div>
                <input
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    // ref={selectFile}
                    // onChange={onLoadFile}
                    // files={data[files]}
                />
            </label>

            <div>
                <div></div>
                <div>
                    <button type='button'
                        // onClick={() => selectFile.current.click()}
                    >추가</button>
                    <button type='button'
                        // onClick={deleteFile}
                    >삭제</button>
                    <button type='button'
                        // onClick={downloadFile}
                    >다운로드</button>
                </div>
            </div>
        </div>
    )
}

export default ExistingFile;