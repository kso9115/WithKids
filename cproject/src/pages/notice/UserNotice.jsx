import { Outlet } from "react-router-dom";
import './userNotice.css'

function Notice() {

    return (
        <>
            <div className='userNoticeHead'>
                <p>공지사항</p>
            </div>
            <div className='userNoticeContent'>
                <Outlet />
            </div>
        </>
    );

};



export default Notice;