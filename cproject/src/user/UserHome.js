import './userHome.css'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import { Outlet } from 'react-router-dom'

function UserHome() {
    


    return (
        <>
            <UserHeader></UserHeader>
            <main style={{ minHeight: `840px`}}>
                <Outlet />
            </main>
            <UserFooter></UserFooter>  
        </>
    );

}
export default UserHome;