import './userHome.css'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import { Outlet } from 'react-router-dom'
// import { useLocation } from 'react-router-dom';

function UserHome() {
    // const location = useLocation();
    // var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));


    return (
        <>
            <UserHeader></UserHeader>
            <main style={{
                minHeight: `840px`
                // , minWidth: `1200px`
            }}>
                <Outlet />
            </main>
            <UserFooter></UserFooter>  
        </>
    );

}
export default UserHome;