import './userFooter.css'
import logo from '../../assets/images/Community Child Center.png'

function UserFooter() {

    return (
        <footer id="footer">
            <div className="footer_inner">
                {/* <div class="footer_left">
                        <ul class="footer_menu">
                            <li class="pinclr"><a href="/home/indvdlinfo/indvdlinfo_2.jsp">개인정보처리방침</a></li>
                            <li><a href="/home/indvdlinfo/indvdlinfo_1.jsp">이용약관</a></li>
                            <li><a href="/home/indvdlinfo/indvdlinfo_3.jsp">이메일무단수집거부</a></li>
                        </ul>
                    </div>
                    <div class="footer_right">

                        <ul class="addr">
                            <li><span>모전 지역 아동 센터</span>
                                <p>[17055] 경기도 용인시 처인구 명지로40번길 8 삼가프라자 5층<br></br> TEL 031-337-4012, 4013</p>
                            </li>
                        </ul>

                    </div> */}
                <div style={{
                    height: '150px'
                }}></div>
                <p className="footer_logo">
                    <img src={logo} alt=""></img>
                    <cite>COPYRIGHT(C) YONGIN CITY. ALL RIGHTS RESERVED.</cite>
                </p>
            </div>
        </footer>
    );
}
export default UserFooter;