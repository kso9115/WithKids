import './App.css';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Select from './pages/select/Select'
import UserHome from './pages/user/UserHome'
import UserMain from './pages/user/UserMain'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserNotice from './pages/notice/UserNotice'
import Schedule from './pages/schedule/Schedule'
// import Survety from './pages/survery/Survery'
import Userprogram from './pages/userprogram/Userprogram';
import NoneLogin from './pages/err/ErrNoneLogin';
import UserLogin from './pages/user/UserLogin';
import UserprogramDetails from './pages/userprogram/UserprogramDetails';
import UserprogramMain from './pages/userprogram/UserprogramMain';
import UserNoticeMain from './pages/notice/UserNoticeMain';
import UserCheck from './pages/user/UserCheck';
import UserNoticeDetails from './pages/notice/UserNoticeDetails';
import UserMyInfo from './pages/user/UserMyInfo';
import Survey from './pages/survey/Survey';
// import MealSaveP from './components/mealManagement/MealSaveP';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Select />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/usercheck" element={<UserCheck />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/user" element={<UserHome />}>
                        <Route path="" element={<UserMain />}></Route>
                        <Route path="notice" element={<UserNotice />}>
                            <Route path="" element={<UserNoticeMain />}></Route>
                            <Route path="dtails" element={<UserNoticeDetails />}></Route>
                        </Route>
                        {/* <Route path="programDtail" element={<UserprogramDetails />}></Route> */}
                        <Route path="schedule" element={<Schedule />}></Route>
                        
                        <Route path="program" element={<Userprogram />}>
                            <Route path="" element={<UserprogramMain />}></Route>
                            <Route path="dtails" element={<UserprogramDetails />}></Route>
                        </Route>
                        <Route path="userlogin" element={<UserLogin />}></Route>
                        <Route path="myInfo" element={<UserMyInfo />}></Route>
                    </Route>
                    <Route path="/survey" element={<Survey />}></Route>
                    <Route path="/errNoneLogin" element={<NoneLogin />}></Route>
                    {/* <Route path="/mealSaveP" element={<MealSaveP />}></Route> */}


                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;