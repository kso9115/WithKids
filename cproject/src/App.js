import './App.css';
import Home from './pages/home/Home.js'
import Login from './pages/login/Login.js'
import Select from './pages/select/Select.js'
import UserHome from './pages/user/UserHome'
import UserMain from './pages/user/UserMain'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notice from './pages/notice/Notice.js'
import Schedule from './pages/schedule/Schedule.js'
import Survety from './pages/survery/Survery.js'
import Userprogram from './pages/userprogram/Userprogram.js';
import NoneLogin from './pages/err/errNoneLogin.js';
import UserLogin from './pages/user/UserLogin.js';
import UserprogramDetails from './pages/userprogram/UserprogramDetails';
import UserprogramMain from './pages/userprogram/UserprogramMain.js';
import NoticeMain from './pages/notice/NoticeMain.js';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Select />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/user" element={<UserHome />}>
                        <Route path="" element={<UserMain />}></Route>
                        <Route path="notice" element={<Notice />}>
                            <Route path="" element={<NoticeMain />}></Route>
                        </Route>
                        {/* <Route path="programDtail" element={<UserprogramDetails />}></Route> */}
                        <Route path="schedule" element={<Schedule />}></Route>
                        <Route path="survety" element={<Survety />}></Route>
                        <Route path="program" element={<Userprogram />}>
                            <Route path="" element={<UserprogramMain />}></Route>
                            <Route path="dtails" element={<UserprogramDetails />}></Route>
                        </Route>
                        <Route path="userlogin" element={<UserLogin />}></Route>
                    </Route>

                    <Route path="/errNoneLogin" element={<NoneLogin />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;