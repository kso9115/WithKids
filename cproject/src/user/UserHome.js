import './userHome.css'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import Slide from './slide/Slide'
function UserHome({children}) {

    return (
        <>
            <UserHeader></UserHeader>
            {children}
            <UserFooter></UserFooter>  
        </>
    );

}
export default UserHome;