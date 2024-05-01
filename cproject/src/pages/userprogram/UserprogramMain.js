import React, { useEffect, useState } from 'react';
import './userprogram.css';
import { Link } from 'react-router-dom';
import { apiCall } from '../../server/apiService';
import { API_BASE_URL } from '../../server/app-config';
import SearchBoxUser from '../../hooks/searchbox/SearchBoxUser';

function UserprogramMain() {
    const [listData, setListData] = useState([]);
    const [word, setWord] = useState("");
    useEffect(() => {
        apiCall('/prgPln/prgPlnListUser', 'GET', {
            word: word
        })
            .then((response) => {
                setListData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [word])

    function setWordChange(params) {
        setWord(params);
    }

    return (
        <>
            <SearchBoxUser setWord={setWordChange} />
            <div className='userPrgImg'>
                <p></p>
                <div>
                    {listData.map((ele, index) => {
                        return (
                            <Link to="/user/program/dtails" state={ele} key={ele.prgId + 2}>
                                <div className='userPrgImgBox'>
                                    <img style={{ width: "270px", height: "270px", marginBottom: "10px" }}
                                        src={API_BASE_URL + "/api/prg/prgSlideImg?prgId=" + ele.prgId} alt=""
                                    />
                                    <p>{ele.prgNm}</p>
                                    <p style={{ fontSize: "14px",paddingTop:'5px' }}>{ele.plnPrd}</p>
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