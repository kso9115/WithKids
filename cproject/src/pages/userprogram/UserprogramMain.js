import React, { useEffect, useState } from 'react';
import './userprogram.css';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { apiCall } from '../../server/apiService';


function UserprogramMain() {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        apiCall('/prgPln/prgPlnList', 'GET')
            .then((response) => {
                setListData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    console.log(listData);
    return (
        <>
            <div className='userPrgSearch'>
                <div>
                    <div>제목</div>
                    <input type="text" placeholder='검색어를 입력하세요.' />
                    <button>검색</button>
                    <button>초기화</button>
                </div>
            </div>
            <div className='userPrgImg'>
                <p></p>
                <div>
                    {listData.map((ele, index) => {
                        return (
                            <Link to="/user/program/dtails" state={ele} key={ele.prgId + 2}>
                                <div className='userPrgImgBox'>
                                    <img style={{ width: "270px", height: "270px", marginBottom: "10px" }}
                                        src={"/api/prg/prgSlideImg?prgId=" + ele.prgId} alt=""
                                    />
                                    <p>{ele.prgNm}</p>
                                    <p style={{ fontSize: "14px" }}>{ele.plnPrd}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default UserprogramMain;