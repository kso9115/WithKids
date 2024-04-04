import './menu.css'
import Calender from '../celender/Calender'
import ProgramManagement from '../program/ProgramManagement'
import StaffManagement from '../staff/StaffManagement'
import MemberMangement from '../memberdetail/MemberMangement'
import Admission from '../admission/AdmLvng_Manager'
// import AttandanceMangement from '../attandance/AttandanceMangement'
import AttandanceMangement from '../attandance/AttandanceTest'
import MealManagement from '../mealManagement/MealManagement'
import PagesCollapse from './PagesCollapse'
import Charts from './Charts'
import React from 'react'
import ProgramPlan from '../program/ProgramPlan'
import NoticeManagement from '../notice/NoticeManagement'

function Menu({ menuArr, setMenuArr, setCurrentTab, setSessionName }) {
    const map = new Map();
    map.set('MemberMangement', { name: '대상자 기본 정보', content: <MemberMangement /> });
    map.set('Admission', { name: '입소/퇴소 관리', content: <Admission /> });
    map.set('AttandanceMangement', { name: '출석관리', content: <AttandanceMangement /> });
    map.set('MealManagement', { name: '급식관리 ', content: <MealManagement /> });
    map.set('회원탈퇴', { name: 'Delete', content: null });
    map.set('StaffManagement', { name: '직원관리', content: <StaffManagement /> });
    map.set('Calender', { name: '캘린더', content: <Calender></Calender> });
    map.set('ProgramManagement', { name: '프로그램정보관리', content: <ProgramManagement /> });
    map.set('ProgramPlan', { name: '프로그램계획서 작성', content: <ProgramPlan /> });
    map.set('NoticeManagement', { name: '공지사항 관리', content: <NoticeManagement /> });
    function getTransTitle(menuName) {

        // menuArr.filter((it)=>it.isDone)
        for (let i = 0; i < menuArr.length; i++) {
            if (map.get(menuName).name === menuArr[i].name) {
                return;
            };
        }

        setCurrentTab(menuArr.length);
        onCreate(map.get(menuName).name, map.get(menuName).content)
    }

    const onCreate = (menutitle, ActiveComponent) => {
        const menu = {
            name: menutitle,
            content: ActiveComponent
        };
        setMenuArr(menuArr.concat(menu));  // concat함수를 이용해서 불변성을 지킴
    };

    return (
        <>
            <ul id='menuContainer'>
                <div id='menuTitle'>모전 지역 아동 센터</div>
                <div className='menuHr' />
                <div className="menu-side-heading">
                    아동 관리 메뉴
                </div>
                <PagesCollapse getTransTitle={getTransTitle} name='출석'
                    menu={['출석관리', '출석그래프']}
                    conName={['AttandanceMangement', 'Calender']} img='img/출석.png' />
                <PagesCollapse getTransTitle={getTransTitle} name='아동관리'
                    menu={['대상자 기본 정보', '입소/퇴소 관리']}
                    conName={['MemberMangement', 'Admission']} img='img/사람.png' />
                <Charts getTransTitle={getTransTitle} name='급식관리'
                    conName={'MealManagement'} img='img/식사2.png' />

                <div className='menuHr' />
                <div className="menu-side-heading">
                    센터 운영 메뉴
                </div>
                <PagesCollapse getTransTitle={getTransTitle} name='관리용 게시판'
                    menu={['회의록', '일정관리', '공지사항 관리']}
                    conName={['캘린더', '캘린더', 'NoticeManagement']} img='img/관리.png' />
                <PagesCollapse getTransTitle={getTransTitle} name='프로그램 관리'
                    menu={['프로그램정보관리', '프로그램계획서작성', '프로그램일지 작성']}
                    conName={['ProgramManagement', 'ProgramPlan', '캘린더']} img='img/프로그램.png' />
                <Charts getTransTitle={getTransTitle} name='직원 관리'
                    conName={'StaffManagement'} img='img/직원.png' />
            </ul>
        </>
    );
}

export default React.memo(Menu);