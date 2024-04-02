import React from 'react';
import './userprogram.css';
import { Outlet } from 'react-router-dom';



function Userprogram() {

    return (
        <>
            <div className='userPrgHead'>
                <p>프로그램</p>
            </div>
            <div className='userPrgContent'>
                <Outlet />
            </div>
        </>
    );
}

export default Userprogram;