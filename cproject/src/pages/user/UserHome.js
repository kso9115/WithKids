import './userHome.css'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';


function UserHome() {
    const [login, setLogin] = useState(false);

    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));

    if (login === false && sessionData) {
        setLogin(true);
    }
    return (
        <>
            <UserHeader login={login} setLogin={setLogin}></UserHeader>
            <main style={{ minHeight: `840px`}}>
                <Outlet />
            </main>
            <UserFooter></UserFooter>  
        </>
    );

}
export default UserHome;