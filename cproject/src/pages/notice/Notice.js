    // import noticeSrc from '../notice/notices.html'

    // function createNotice() {
    //     // return { __html: 'First &middot; Second' };
    //     return { __html: '<iframe src={noticeSrc}</iframe>' };
    // }
    // import './board_notice.css';
        


    function Notice() {

        return (
            // <div dangerouslySetInnerHTML={createNotice()} />
            <div>

            
                <div id="container" className="sub"> 
            <div className="sub_top">
                <div className="top_title">
                    <h5>공지사항</h5>
                </div>
            </div>
            <div className="content pd0">
                <form name="dataForm" id="dataForm" method="get" action="BD_selectBbsList.do" className="form-inline"></form> 
                    <input type="hidden" name="q_bbsCode" id="q_bbsCode" value="1001"></input>
                    <input type="hidden" name="q_bbscttSn" id="q_bbscttSn" value=""></input>
                    <div className="Search"> </div> 
                        
                            <div className="con_inner"></div>
                                <div className="Search_table">
                                    <table>
                                        <caption>공지사항 목록보기 검색창</caption>
                                    
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <div className="input_group">
                                                        <select title="구분" id="q_searchKey" name="q_searchKey"
                                                            className="searchKey">
                                                            <option value="1001" selected="selected">제목</option>
                                                            <option value="1002">내용</option>
                                                        </select>
                                                    </div>
                                                </th>
                                                <td>
                                                    <div className="input_group">
                                                        <input type="text" name="q_searchVal" className="keyword" title="검색어"
                                                        placeholder="검색어를 입력하세요." ></input> 
                                                    
                                                            
                                                        <span className="input_addon"><button type="submit"
                                                                className="btn_bbs_search">검색</button></span></div>
                                                            
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        
                    </div>
        
                    <div className="con_inner">
                        
                        <div className="board_list">
            
                            <fieldset>
                                <legend className="sr-only">페이지당 목록갯수 선택</legend>
                                <div className="pull-left">
                                    <span className="list_total">전체<strong>153</strong>건</span>
                                </div>
        
                            </fieldset>
        
                            <input type="hidden" name="q_currPage" id="q_currPage" value="1"></input>
        
                            <input type="hidden" name="q_sortName" id="q_sortName" value=""></input>
        
                            <input type="hidden" name="q_sortOrder" id="q_sortOrder" value=""></input>
        
                            <table className="tb_list notice_list" summary=" 항목을 제공합니다."></table>
                                <caption className="hidden">HOME &gt; 커뮤니티 &gt; 공지사항 </caption>
                            </div>
                                <table className="tb_list notice_list">
                            
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
                                        <td className="tb_num"></td>
                                        <td  className="tb_tit">
                                            <span className="ico_nt">공지</span>
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001 &amp;q_bbscttSn=20240109172726430"
                                                onclick="opView('20240109172726430');return false;">용감한 아동(아동LAB e-book
                                                창간호)</a>
                                        </td>
                                        <td className="tb_date">2024-01-09</td>
                                        <td className="tb_hit">432</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num"></td>
                                        <td className="tb_tit">
                                            <span className="ico_nt">공지</span>
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20231201164020797"
                                                onclick="opView('20231201164020797');return false;">[용인아동LAB 기흥] 주말 운영 변경 안내</a>
        
                                        </td>
                                        <td className="tb_date">2023-12-01</td>
                                        <td className="tb_hit">595</td>
                                    </tr>
        
        
                                    <tr>
                                        <td className="tb_num">153</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240223171936269"
                                                onclick="opView('20240223171936269');return false;"> 2024년 1분기 프로그램 일정</a>
                                            <span className="ico_file"></span>
                                        </td>
                                        <td className="tb_date">2024-02-23</td>
                                        <td className="tb_hit">144</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">152</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240223162441994"
                                                onclick="opView('20240223162441994');return false;">2024년 프로그램 운영 비용 지원사업
                                                확대</a>
                                            <span className="ico_file"></span>
                                        </td>
                                        <td className="tb_date">2024-02-23</td>
                                        <td className="tb_hit">208</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">151</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240222112951406"
                                                onclick="opView('20240222112951406');return false;">용인 아동 LAB 2024년 3월 프로그램</a>
        
                                        </td>
                                        <td className="tb_date">2024-02-22</td>
                                        <td className="tb_hit">208</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">150</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240219111947871"
                                                onclick="opView('20240219111947871');return false;">2024년 「용인특례시 2030 봉사단」
                                                모집</a>
        
                                        </td>
                                        <td className="tb_date">2024-02-19</td>
                                        <td className="tb_hit">137</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">149</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240124143311254"
                                                onclick="opView('20240124143311254');return false;"> 용인 아동 LAB 처인 공유물품
                                                업데이트</a>
        
                                        </td>
                                        <td className="tb_date">2024-01-24</td>
                                        <td className="tb_hit">294</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">148</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240123160112875"
                                                onclick="opView('20240123160112875');return false;">2024년 3월 프로그램 선정방안 </a>
                                            <span className="ico_file"></span>
                                        </td>
                                        <td className="tb_date">2024-01-23</td>
                                        <td className="tb_hit">253</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">147</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240123152229195"
                                                onclick="opView('20240123152229195');return false;">용인아동 희망옷장(옷 무료대여서비스)
                                                안내</a>
        
                                        </td>
                                        <td className="tb_date">2024-01-23</td>
                                        <td className="tb_hit">123</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">146</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240116173315861"
                                                onclick="opView('20240116173315861');return false;">용인아동 학부모 대출이자 지원 신청자
                                                모집</a>
                                            <span className="ico_file"></span>
                                        </td>
                                        <td className="tb_date">2024-01-16</td>
                                        <td className="tb_hit">148</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">145</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20240116170408733"
                                                onclick="opView('20240116170408733');return false;">2024년 용인 아동커뮤니티 지원 사업 공모</a>
                                            <span className="ico_file"></span>
                                        </td>
                                        <td className="tb_date">2024-01-16</td>
                                        <td className="tb_hit">335</td>
                                    </tr>
        
                                    <tr>
                                        <td className="tb_num">144</td>
                                        <td className="tb_tit">
                                            <span className="bbsSjMargin" style={{paddingLeft:'0px'}}>&nbsp;</span><a
                                                href="BD_selectBbs.do?q_bbsCode=1001&amp;q_bbscttSn=20231207095233505"
                                                onclick="opView('20231207095233505');return false;">용인문화도시플랫폼 아카데미 기술X예술 특강 참여자
                                                모집</a>
        
                                        </td>
                                        <td className="tb_date">2023-12-07</td>
                                        <td className="tb_hit">266</td>
                                    </tr>
                                                    
        
                                </tbody>
                                </table>
                            
                            
                        
        
        
                            <div className="paging" id="page-div">
        
        
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
        
        
        
                                <a href="#next" className="direction next" onclick="opMovePage(11); return false;"
                                    title="다음페이지그룹 가기"><i className="entypo-right-open"></i></a>
                                    <br></br><br></br><hr></hr>
        
        
        
        
                            </div>
        
                            
                            
                        </div>
                    
        </div> 
        );
        
    };



    export default Notice;