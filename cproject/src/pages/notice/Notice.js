import { Outlet } from "react-router-dom";

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