import './menu.css'
import Calender from '../celender/Calender'
import ProgramManagement from '../container/program/ProgramManagement'
import MemberMangement from '../container/memberdetail/MemberMangement'
import Admission from '../container/admission/AdmLvng_Manager'
import Attandance from '../container/attandance/Attandance'
import MealManagement from '../container/mealManagement/MealManagement'
import PagesCollapse from './PagesCollapse'
import Charts from './Charts'

function Menu2({ menuArr, setMenuArr, setCurrentTab, setSessionName }) {
    const map = new Map();
    map.set('MemberMangement', { name: '대상자 기본 정보', content: <MemberMangement /> });
    map.set('Admission', { name: '입소/퇴소 관리', content: <Admission /> });
    map.set('Attandance', { name: '출석관리', content: <Attandance /> });
    map.set('MealManagement', { name: '급식관리 ', content: <MealManagement /> });
    map.set('회원탈퇴', { name: 'Delete', content: null });
    map.set('회원탈퇴', { name: 'Delete', content: null });
    map.set('캘린더', { name: 'Calender', content: <Calender></Calender> });
    map.set('ProgramManagement', { name: '프로그램정보관리', content: <ProgramManagement></ProgramManagement> });

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
        <>
            <ul id='menuContainer'>
                <div id='menuTitle'>모전 지역 아동 센터</div>
                <div className='menuHr' />
                <div className="menu-side-heading">
                    아동 관리 메뉴
                </div>
                <PagesCollapse getTransTitle={getTransTitle} name='출석'
                    menu={['출석관리', '출석그래프']} conName={['Attandance', 'Calender']} />
                <PagesCollapse getTransTitle={getTransTitle} name='아동관리'
                    menu={['대상자 기본 정보', '입소/퇴소 관리']} conName={['MemberMangement', 'Admission']} />
                <Charts getTransTitle={getTransTitle} name='급식관리'
                    conName={'MealManagement'} />

                <div className='menuHr' />
                <div className="menu-side-heading">
                    센터 운영 메뉴
                </div>
                <PagesCollapse getTransTitle={getTransTitle} name='관리용 게시판'
                    menu={['회의록', '일정관리','프로그램관리']}
                    conName={['캘린더', '캘린더','캘린더']} />
                <PagesCollapse getTransTitle={getTransTitle} name='프로그램 관리'
                    menu={['프로그램정보관리', '프로그램계획서작성', '프로그램일지 작성']}
                    conName={['Attandance', '캘린더', '캘린더']} />
            </ul>
        </>
    );
}

export default Menu2;