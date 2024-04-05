import { useState } from 'react';

import { useEffect } from 'react';
import { apiCall } from '../../server/apiService';
import SearchBoxUser from '../../hooks/searchbox/SearchBoxUser';
import { Link } from 'react-router-dom';

function NoticeMain() {
    const [word, setWord] = useState(""); // 검색 단어 저장
    const [noticeCount, setNoticeCount] = useState(0); // 공지사항 전체 개수
    const [noticeData, setNoticeData] = useState([]); // 불러온 공지사항 저장
    const [selectPage, setSelectPage] = useState({
        rowPerPage: 10,
        currPage: 1,
        sno: 1,
        // eon: 5,
        displayPageNo: 5
    }); // 페이지 네이션 세팅

    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));
    
    useEffect(() => {
        apiCall(`/notice/noticeCount`, 'GET', {
            word: word
        })
            .then((response) => {
                setNoticeCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [word])

    useEffect(() => {
        apiCall(`/notice/selectPage`, 'GET', {
            rowPerPage: selectPage.rowPerPage,
            currPage: selectPage.currPage,
            word: word
        })
            .then((response) => {
                setNoticeData(response.data);

            })
            .catch((error) => {
                console.log(error);
            })
    }, [selectPage, word])

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

    function setWordChange(params) {
        setWord(params);
        selectPage.currPage = 1;
        selectPage.sno = 1;
        setSelectPage({ ...selectPage });
    }

    function loginCk(event) {
        if (!sessionData) {
            alert("로그인후에 이용해주세요.");
            event.preventDefault();
        }
    }

    return (
        <>
            <SearchBoxUser setWord={setWordChange} />
            <div className="userNotice">
                <p>전체<span> {noticeCount}</span>건</p>
                <div>
                    {noticeData.map((ele) => (
                        <div key={ele.seq}>
                            <div>{ele.emphasis === 1 ? "" : ele.seq}</div>
                            <div>{ele.emphasis === 1 ? <span>공지</span> : null}
                                <Link to="/user/notice/dtails" state={ele} onClick={loginCk}>{ele.title}</Link>
                            </div>
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

                <div>
                    {Array.from({ length: selectPage.displayPageNo }, (_, index) => (
                        <div style={{
                            display: Math.ceil(noticeCount / selectPage.rowPerPage) >= selectPage.sno + index ?
                                'flex' : 'none'
                        }} key={index} className={selectPage.currPage === selectPage.sno + index ? 'selectPage' : ''} onClick={currPageChange}>{selectPage.sno + index}</div>
                    )
                    )}
                </div>

                {Math.ceil(noticeCount / selectPage.rowPerPage) > selectPage.sno + selectPage.displayPageNo - 1 ?
                    <div onClick={() => snoChange(true)}></div> : <div className='hide'></div>
                }
            </div>
        </>
    );

};



export default NoticeMain;