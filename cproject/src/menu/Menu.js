// import Login from '../container/login/Login'
import Calender from '../celender/Calender'
import ProgramManagement from '../container/program/ProgramManagement'
import MemberList from '../container/memberlist/MemberList'
import Admission from '../container/admission/AdmLvng_Manager'
import Attandance from '../container/attandance/Attandance'
import MealManagement from '../container/mealManagement/MealManagement'
    
function Menu({ sname, menuArr, setMenuArr, setCurrentTab, setSessionName }) {
    const map = new Map();
    map.set('MemberList', {name: '대상자 기본 정보', content: <MemberList/> });
    map.set('Admission', { name: '입소/퇴소 관리', content: <Admission/> });
    map.set('Attandance', { name: '출석관리', content: <Attandance /> });
    map.set('MealManagement', { name: '급식관리 ', content: <MealManagement /> });

    map.set('회원탈퇴', { name: 'Delete', content: null });
    map.set('캘린더', { name: 'Calender', content: <Calender></Calender> });
    map.set('ProgramManagement', { name: '프로그램정보관리', content: <ProgramManagement></ProgramManagement> });


    // function getTransTitle(e) {
    //     for (let i = 0; i < menuArr.length; i++) {
    //         if (map.get(e.target.textContent).name === menuArr[i].name) {
    //             return;
    //         };
    //     }

    //     setCurrentTab(menuArr.length);
    //     onCreate(map.get(e.target.textContent).name, map.get(e.target.textContent).content)
    // }

    function getTransTitle(menuName) {
        for (let i = 0; i < menuArr.length; i++) {
            if (map.get(menuName).name === menuArr[i].name) {
                return;
            };
        }

        setCurrentTab(menuArr.length);
        onCreate(map.get(menuName).name, map.get(menuName).content)
    }

    const onCreate = (menutitle, ActiveComponent) => {
        console.log(menutitle);
        const menu = {
            name: menutitle,
            content: ActiveComponent
        };
        setMenuArr(menuArr.concat(menu));  // concat함수를 이용해서 불변성을 지킴
    };

    return (

        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">



            {/* <!-- Sidebar - Brand --> */}
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">지역아동센터{/*<sup>모전</sup>*/}</div>
            </a>

            {/* <!-- Divider --> */}
            {/* <hr class="sidebar-divider my-0"></hr> */}

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider"></hr>

            {/* <!-- Heading --> */}
            <div class="sidebar-heading">
                아동 관리 메뉴
            </div>

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#attendance"
                    aria-expanded="true" aria-controls="attendance">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>출석</span>
                </a>
                <div id="attendance" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">출석:</h6>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Attandance')}>출석관리</span>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Calender')}>출석그래프</span>
                    </div>
                </div>
            </li>

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#management"
                    aria-expanded="true" aria-controls="management">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>아동 관리</span>
                </a>
                <div id="management" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">아동 관리:</h6>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('MemberList')}>대상자 기본 정보</span>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Admission')}>입소/퇴소 관리</span>
                    </div>
                </div>
            </li>

            {/* <!-- Nav Item - Charts --> */}
            <li class="nav-item">
                <div class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span style={{ cursor: 'pointer' }} onClick={() => getTransTitle('MealManagement')}>급식관리</span>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider"></hr>

            {/* <!-- Heading --> */}
            <div class="sidebar-heading">
                센터 운영메뉴
            </div>

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#bulletinboard"
                    aria-expanded="true" aria-controls="bulletinboard">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>관리용 게시판</span>
                </a>
                <div id="bulletinboard" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">관리용 게시판:</h6>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Login')}>회의록</span>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Login')}>일정 관리</span>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Login')}>프로그램 관리</span>
                    </div>
                </div>
            </li>

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#program"
                    aria-expanded="true" aria-controls="program">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>프로그램 관리</span>
                </a>
                <div id="program" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">프로그램 관리:</h6>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('ProgramManagement')}>프로그램정보관리</span>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Login')}>프로그램계획서작성</span>
                        <span class="collapse-item" style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Login')}>프로그램일지 작성</span>
                    </div>
                </div>
            </li>

            {/* <!-- Nav Item - Charts --> */}
            <li class="nav-item">
                <div class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span style={{ cursor: 'pointer' }} onClick={() => getTransTitle('Login')}>강사 업무 관리</span></div>
            </li>
            
            {/* <!-- Divider --> */}
            <hr class="sidebar-divider d-none d-md-block"></hr>

            {/* <!-- Sidebar Toggler (Sidebar) --> */}
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
            {/* <!-- End of Sidebar --> */}
        </ul>
    );
}

export default Menu;

