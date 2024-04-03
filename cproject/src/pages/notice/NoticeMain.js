import { useState } from 'react';
import './notice.css'
import { useEffect } from 'react';

function NoticeMain() {
    const page = 51;
    const [selectPage, setSelectPage] = useState({
        rowPerPage: 10,
        currPage: 1,
        sno: 1,
        eon: 5,
        displayPageNo: 5
    });
    useEffect(() => {

    }, [])

    function currPageChange(event) {

        selectPage.currPage = Number(event.target.textContent);
        setSelectPage({ ...selectPage });
    }

    function snoChange(date) {
        if (date) {
            selectPage.currPage = Number(selectPage.sno + selectPage.displayPageNo);
            selectPage.sno = selectPage.sno + selectPage.displayPageNo;
        } else {
            selectPage.currPage = Number(selectPage.sno - 1);
            selectPage.sno = selectPage.sno - selectPage.displayPageNo;
        }

        setSelectPage({ ...selectPage });
    }

    return (
        <>
            <div className='userNoticeSearch'>
                <div>
                    <div>제목</div>
                    <input type="text" placeholder='검색어를 입력하세요.' />
                    <button>검색</button>
                    <button>초기화</button>
                </div>
            </div>
            <div className="userNotice">
                <p>전체<span>20</span>건</p>
                <div>
                    <div>
                        <div>num</div>
                        <div>제목</div>
                        <div>작성일</div>
                        <div>조회수</div>
                    </div>
                    <div>
                        <div>159</div>
                        <div>길고 긴 제목이 뭐가 있을까 생각하다가 막친 제목</div>
                        <div>2024-04-03</div>
                        <div>159</div>
                    </div>
                </div>
            </div>
            <div className="userNoticePage">

                {selectPage.currPage > selectPage.displayPageNo ?
                    <div onClick={() => snoChange(false)}></div> : <div className='hide'></div>
                }

                {/* <div style={{
                    display: selectPage.currPage > selectPage.displayPageNo ?
                        'block' : 'none'
                }} onClick={() => snoChange(false)}></div> */}

                <div>
                    {Array.from({ length: selectPage.displayPageNo }, (_, index) => (
                        <div style={{
                            display: page >= selectPage.sno + index ?
                                'flex' : 'none'
                        }} key={index} className={selectPage.currPage === selectPage.sno + index ? 'selectPage' : ''} onClick={currPageChange}>{selectPage.sno + index}</div>
                    ))}
                </div>

                {/* <div style={{
                    display: page - (page % selectPage.displayPageNo) >= selectPage.currPage ?
                        'block' : 'none'
                }} onClick={() => snoChange(true)}></div> */}

                {page - (page % selectPage.displayPageNo) >= selectPage.currPage ?
                    <div onClick={() => snoChange(true)}></div> : <div className='hide'></div>
                }
            </div>
        </>
    );

};



export default NoticeMain;