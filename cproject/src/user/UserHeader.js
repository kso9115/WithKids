import './userHeader.css'

function UserHeader() {

    return (
        <header class="dongle-regular">
            <a id="logo" href="#">
                <img src="img/Community Child Center.png" alt=""></img>

            </a>

            <nav>
                <div id="menu">
                    <ul>
                        <li><a href="#">센터 소개</a></li>
                        <li><a href="#">공지사항</a></li>
                        <li><a href="#">프로그램</a></li>
                        <li><a href="#">프로그램 후기</a></li>
                        <li><a href="#">찾아오시는길</a></li>
                    </ul>
                </div>
            </nav>

            <div id="login_group">
                <ul>
                    <li><a href="#">로그인</a></li>
                </ul>
            </div>
        </header>
    );
}
export default UserHeader;