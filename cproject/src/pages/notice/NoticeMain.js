import { useState } from 'react';
import './notice.css'
import { useEffect } from 'react';
import { apiCall } from '../../server/apiService';

function NoticeMain() {
    const [noticeCount, setNoticeCount] = useState(0);
    const [noticeData, setNoticeData] = useState([]);
    const [selectPage, setSelectPage] = useState({
        rowPerPage: 10,
        currPage: 1,
        sno: 1,
        eon: 5,
        displayPageNo: 5
    });

    useEffect(() => {
        apiCall(`/notice/noticeCount`, 'GET')
            .then((response) => {
                setNoticeCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        apiCall(`/notice/selectPage`, 'GET', {
            rowPerPage: selectPage.rowPerPage,
            currPage: selectPage.currPage
        })
            .then((response) => {
                setNoticeData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [selectPage])

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
                    <button type='button' onClick={() => setSelectPage({ ...selectPage })}>초기화</button>
                </div>
            </div>
            <div className="userNotice">
                <p>전체<span> {noticeCount}</span>건</p>
                <div>
                    {noticeData.map((ele) => (
                        <div key={ele.seq}>
                            <div>{ele.emphasis === 1 ? "" : ele.seq}</div>
                            <div>{(ele.emphasis === 1 ? "(중요) " : "") + ele.title}</div>
                            <div>{ele.regdate}</div>
                            <div>{ele.cnt}</div>
                        </div>
                    ))}
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
                            display: Math.ceil(noticeCount / selectPage.rowPerPage) >= selectPage.sno + index ?
                                'flex' : 'none'
                        }} key={index} className={selectPage.currPage === selectPage.sno + index ? 'selectPage' : ''} onClick={currPageChange}>{selectPage.sno + index}</div>
                    )
                    )}
                </div>

                {/* <div style={{
                    display: page - (page % selectPage.displayPageNo) >= selectPage.currPage ?
                        'block' : 'none'
                }} onClick={() => snoChange(true)}></div> */}
                {console.log(selectPage.eon)}
                {Math.ceil(noticeCount / selectPage.rowPerPage) >= selectPage.sno + selectPage.displayPageNo - 1 ?
                    <div onClick={() => snoChange(true)}></div> : <div className='hide'></div>
                }
            </div>
        </>
    );

};



export default NoticeMain;