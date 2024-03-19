// import noticeSrc from '../notice/notices.html'

// function createNotice() {
//     // return { __html: 'First &middot; Second' };
//     return { __html: '<iframe src={noticeSrc}</iframe>' };
// }
import './board_notice.css';

function Notice() {

    return (
        // <div dangerouslySetInnerHTML={createNotice()} />
        <div>

        
            <div id="container" class="sub"> 
        <div class="sub_top">
            <div class="top_title">
                <h5>공지사항</h5>
            </div>
        </div>
        <div class="content pd0">
            <form name="dataForm" id="dataForm" method="get" action="BD_selectBbsList.do" class="form-inline"></form> 
                <input type="hidden" name="q_bbsCode" id="q_bbsCode" value="1001"></input>
                <input type="hidden" name="q_bbscttSn" id="q_bbscttSn" value=""></input>
                <div class="Search"> </div> 
                    
                        <div class="con_inner"></div>
                            <div class="Search_table">
                                <table>
                                    <caption>공지사항 목록보기 검색창</caption>
                                   
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <div class="input_group">
                                                    <select title="구분" id="q_searchKey" name="q_searchKey"
                                                        class="searchKey">
                                                        <option value="1001" selected="selected">제목</option>
                                                        <option value="1002">내용</option>
                                                    </select>
                                                </div>
                                            </th>
                                            <td>
                                                <div class="input_group">
                                                    <input type="text" name="q_searchVal" class="keyword" title="검색어"
                                                    placeholder="검색어를 입력하세요." value="" ></input>
                                                   
                                                        
                                                    <span class="input_addon"><button type="submit"
                                                            class="btn_bbs_search">검색</button></span> </div>
                                                           
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    
                </div>
    
                <div class="con_inner">
                    <div class="board_list">
        
                        <fieldset>
                            <legend class="sr-only">페이지당 목록갯수 선택</legend>
                            <div class="pull-left">
                                <span class="list_total">전체<strong>153</strong>건</span>
                            </div>
    
                        </fieldset>
    
                        <input type="hidden" name="q_currPage" id="q_currPage" value="1"></input>
    
                        <input type="hidden" name="q_sortName" id="q_sortName" value=""></input>
    
                        <input type="hidden" name="q_sortOrder" id="q_sortOrder" value=""></input>
    
                        <table class="tb_list notice_list" summary=" 항목을 제공합니다."></table>
                            <caption class="hidden">HOME &gt; 커뮤니티 &gt; 공지사항 </caption>
                        </div>
                               
                           
                            <thead>
                                <tr>
                                    <th scope="col">번호</th>
                                    <th scope="col">제목</th>
                                    <th scope="col">등록일시</th>
                                    <th scope="col">조회수</th>
                                </tr>
                            </thead>
                            <tbody>
    
                                <tr>
                                    <td class="tb_num"></td>
                                    <td class="tb_tit">
                                        <span class="ico_nt">공지</span>
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240109172726430"
                                            onclick="opView('20240109172726430');return false;">용감한 아동(아동LAB e-book
                                            창간호)</a>
                                    </td>
                                    <td class="tb_date">2024-01-09</td>
                                    <td class="tb_hit">432</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num"></td>
                                    <td class="tb_tit">
                                        <span class="ico_nt">공지</span>
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20231201164020797"
                                            onclick="opView('20231201164020797');return false;">[용인청년LAB 기흥] 주말 운영 변경 안내</a>
    
                                    </td>
                                    <td class="tb_date">2023-12-01</td>
                                    <td class="tb_hit">595</td>
                                </tr>
    
    
                                <tr>
                                    <td class="tb_num">153</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240223171936269"
                                            onclick="opView('20240223171936269');return false;"> 2024년 1분기 청년 기본소득</a>
                                        <span class="ico_file"></span>
                                    </td>
                                    <td class="tb_date">2024-02-23</td>
                                    <td class="tb_hit">144</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">152</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240223162441994"
                                            onclick="opView('20240223162441994');return false;">2024년 소프트웨어 구입 비용 지원사업
                                            확대</a>
                                        <span class="ico_file"></span>
                                    </td>
                                    <td class="tb_date">2024-02-23</td>
                                    <td class="tb_hit">208</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">151</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240222112951406"
                                            onclick="opView('20240222112951406');return false;">용인 청년 LAB 2024년 3월 프로그램</a>
    
                                    </td>
                                    <td class="tb_date">2024-02-22</td>
                                    <td class="tb_hit">208</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">150</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240219111947871"
                                            onclick="opView('20240219111947871');return false;">2024년 「용인특례시 2030 청년봉사단」
                                            모집</a>
    
                                    </td>
                                    <td class="tb_date">2024-02-19</td>
                                    <td class="tb_hit">137</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">149</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240124143311254"
                                            onclick="opView('20240124143311254');return false;"> [공유물품] 용인 청년 LAB 처인 공유물품
                                            업데이트</a>
    
                                    </td>
                                    <td class="tb_date">2024-01-24</td>
                                    <td class="tb_hit">294</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">148</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240123160112875"
                                            onclick="opView('20240123160112875');return false;">용인청년 소프트웨어 구입 비용 지원사업 </a>
                                        <span class="ico_file"></span>
                                    </td>
                                    <td class="tb_date">2024-01-23</td>
                                    <td class="tb_hit">253</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">147</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240123152229195"
                                            onclick="opView('20240123152229195');return false;">용인청년 희망옷장(면접정장 무료대여서비스)
                                            안내</a>
    
                                    </td>
                                    <td class="tb_date">2024-01-23</td>
                                    <td class="tb_hit">123</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">146</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240116173315861"
                                            onclick="opView('20240116173315861');return false;">용인청년 전·월세보증금 대출이자 지원 신청자
                                            모집</a>
                                        <span class="ico_file"></span>
                                    </td>
                                    <td class="tb_date">2024-01-16</td>
                                    <td class="tb_hit">148</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">145</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240116170408733"
                                            onclick="opView('20240116170408733');return false;">2024년 용인 청년커뮤니티 지원 사업 공모</a>
                                        <span class="ico_file"></span>
                                    </td>
                                    <td class="tb_date">2024-01-16</td>
                                    <td class="tb_hit">335</td>
                                </tr>
    
                                <tr>
                                    <td class="tb_num">144</td>
                                    <td class="tb_tit">
                                        <span class="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                            href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20231207095233505"
                                            onclick="opView('20231207095233505');return false;">용인문화도시플랫폼 아카데미 기술X예술 특강 참여자
                                            모집</a>
    
                                    </td>
                                    <td class="tb_date">2023-12-07</td>
                                    <td class="tb_hit">266</td>
                                </tr>
    
    
                            </tbody>
                        
                       
    
    
                        <div class="paging" id="page-div">
    
    
                            <strong>1</strong>
    
    
                            <a href="#" onclick="opMovePage(2); return false;" title="2 페이지">2</a>
    
    
                            <a href="#" onclick="opMovePage(3); return false;" title="3 페이지">3</a>
    
    
                            <a href="#" onclick="opMovePage(4); return false;" title="4 페이지">4</a>
    
    
                            <a href="#" onclick="opMovePage(5); return false;" title="5 페이지">5</a>
    
    
                            <a href="#" onclick="opMovePage(6); return false;" title="6 페이지">6</a>
    
    
                            <a href="#" onclick="opMovePage(7); return false;" title="7 페이지">7</a>
    
    
                            <a href="#" onclick="opMovePage(8); return false;" title="8 페이지">8</a>
    
    
                            <a href="#" onclick="opMovePage(9); return false;" title="9 페이지">9</a>
    
    
                            <a href="#" onclick="opMovePage(10); return false;" title="10 페이지">10</a>
    
    
    
                            <a href="#next" class="direction next" onclick="opMovePage(11); return false;"
                                title="다음페이지그룹 가기"><i class="entypo-right-open"></i></a>
                                <br></br><br></br><hr></hr>
    
    
    
    
                        </div>
    
                        
                        
                    </div>
                
            
        <footer id="footer">
            
         <div class="footer_inner">
             <div class="footer_left">
                 <ul class="footer_menu">
                     <li class="pinclr"><a href="/home/indvdlinfo/indvdlinfo_2.jsp">개인정보처리방침</a></li>
                     <li><a href="/home/indvdlinfo/indvdlinfo_1.jsp">이용약관</a></li>
                     <li><a href="/home/indvdlinfo/indvdlinfo_3.jsp">이메일무단수집거부</a></li>
                 </ul>
             </div>
             <p class="footer_logo">
                 
                 <cite>COPYRIGHT(C) YONGIN CITY. ALL RIGHTS RESERVED.</cite>
             </p>	
         </div>
         
        </footer>
    </div> 
    );
    
};



export default Notice;