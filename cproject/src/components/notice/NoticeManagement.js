import './noticeManagement.css'
import { useState } from 'react';
import ListComponent from '../../hooks/ListComponent';
import SearchBox from '../../hooks/searchbox/SearchBox';
import { notice_dt } from '../../hooks/searchbox/searchData';
import NoticeDetails from './NoticeDetails';
import { apiCall } from '../../server/apiService';

const noticeList = {
    name: 'notice',
    list: '공지사항 목록',
    title: ['번호', '제목', '작성일'],
    menu: ['seq', 'title', 'regdate']
}

function NoticeManagement() {
    const [listUpdate, setListUpdate] = useState(true); // 리스트 업데이트 용
    const [noticeDataOne, setNoticeDataOne] = useState({}); //직원 테이블 전체중에 리스트에서 선택한 행 보관

    function searchBoxClick(sbVal) {
        setListUpdate(sbVal);
    }

    function setNoticeDataOneCg(listData) {
        if (Array.isArray(listData) && listData.length === 0) {
            setNoticeDataOne([]);
        } else {
            apiCall('/notice/noticeOne', 'GET', {
                seq: listData.seq,
            })
                .then((response) => {
                    setNoticeDataOne(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div className='notice_mng' >
            <SearchBox data={notice_dt} searchBoxClick={searchBoxClick} />
            <div className='notice_mng_mainBox'>
                <div style={{
                    width: '30%',
                    height: '100%',
                }}>
                    <b>{noticeList.list}</b>
                    <ListComponent name={noticeList} setData={setNoticeDataOneCg} listUpdate={listUpdate} />
                </div>
                <div style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgb(223, 222, 222)',
                    marginLeft: '5px',
                    marginRight: '5px'
                }}></div>
                <div style={{
                    width: '70%',
                    height: '100%'
                }}>
                    <NoticeDetails data={noticeDataOne} setData={setNoticeDataOne}
                        listUpdate={listUpdate} setListUpdate={setListUpdate} />
                </div>
            </div>
        </div>
    );
}

export default NoticeManagement;