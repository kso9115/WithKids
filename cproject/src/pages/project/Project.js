// import './board.css';
import img1 from './img22.jpg';

function Project() {

    // return { __html: '<iframe src="./ project.html"</iframe>' };
    return (
        <>
        <div id="container" class="sub">
            <div class="sub_top">
                <div class="top_title">
                    <h5>프로그램 신청</h5>
                </div>
                <div class="sub_nav">
                    <ul>

                    </ul>
                </div>
            </div>

		<form name="dataForm" id="dataForm" method="post" action="BD_selectSchdulList.do">



			<input type="hidden" name="q_schdulSeCode" id="q_schdulSeCode" value=""></input>

			<input type="hidden" name="q_pagePerPage" id="q_pagePerPage" value="10"></input>

			<input type="hidden" name="q_pagingEndNum" id="q_pagingEndNum" value="9"></input>

			<input type="hidden" name="q_placeCode" id="q_placeCode" value=""></input>

			<input type="hidden" name="q_sortOrder" id="q_sortOrder" value=""></input>

			<input type="hidden" name="q_searchVal" id="q_searchVal" value=""></input>

			<input type="hidden" name="q_sortName" id="q_sortName" value=""></input>

			<input type="hidden" name="q_rowPerPage" id="q_rowPerPage" value="10"></input>

			<input type="hidden" name="q_pagingStartNum" id="q_pagingStartNum" value="0"></input>

			<input type="hidden" name="q_sn" id="q_sn" value="732"></input>

			<input type="hidden" name="q_currPage" id="q_currPage" value="1"></input>


		</form>
		<div class="content pd0">
			<div class="con_inner">
				<div class="program_view">
					<ul class="program_v_half">
						<li class="program_v_img">
                            {/*  "./img22.jpg" */}
							<img src={img1} alt=""></img>

						</li>
						<li class="program_v_con">
							<h4>[성남] 지역 아동 복지센터 신청 페이지</h4>
							<ul>

								<li><span>분야</span>
									<p class="label label03">프로그램</p>
								</li>

								<li><span>공간</span>
									<p>아동 LAB <b class="zoon zoon03"></b></p>
								</li>
								<li>
									<span>모집일자</span>
									<p>

										2024-02-22&nbsp;~&nbsp;
										2024-03-14
									</p>
								</li>
								<li>
									<span>모집인원</span>
									<p>30</p>
								</li>
								<li>
									<span>진행일자</span>
									<p>
										2024-03-14
									</p>
								</li>
								<li>
									<span>마감일자</span>
									<p>2024-04-22</p>
								</li>
							</ul>

							<div class="program_v_btn"><a href="https://forms.gle/iTFnqd5gcReFW1927"
									title="[수지] 청년 전세사기 예방법신청 사이트로 새창 열림" target="blank">신청하기</a></div>

						</li>
					</ul>
					<div class="program_v_list">
						<p class="tit_style02"></p>
						<p class="0"><span style={{ textAutospace : 'none'}}><span style={{fontFamily : '함초롬바탕'}}><span
										style={{fontFamily : 'bold'}}>프로그램명 : 축구교실</span></span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}><span style={{fontWeight :'bold'}}>
											</span></span></span></p><br></br><br></br>


						<p class="0"><p style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롬바탕'}}>강사명</span><span
									lang="EN-US" style={{letterSpacing : '0pt'}}>: </span><span style={{fontFamily : '함초롬바탕'}}>이동윤
									강사 </span> </p> </p>
                                    
						<p class="0"><span style={{textAutospace : 'none'}}>&nbsp; </span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롬바탕'}}><span
										style={{letterSpacing : '0pt'}}>▶</span></span><span
									style={{fontFamily : '함초롬바탕'}}>모집인원</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>:
									30</span><span style={{fontFamily : '함초롬바탕'}}>명</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롬바탕'}}>▶모집일정: 교육 시작 1주일
									전</span></span></p><br></br><br></br>

						<p class="0">▶모집일정: 교육 시작 1주일 전</p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롬바탕'}}><span
										style={{letterSpacing : '0pt'}}>▶</span></span><span
									style={{fontFamily : '함초롬바탕'}}>운영일자</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>:
									03. 21 (</span><span style={{fontFamily : '함초롬바탕'}}>목</span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>) 19:00~21:00</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롬바탕'}}><span
										style={{letterSpacing : '0pt'}}>▶</span></span><span
									style={{fontFamily : '함초롬바탕'}}>운영방법</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>:
								</span><span style={{fontFamily : '함초롬바탕'}}>대면</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롬바탕'}}><span
										style={{letterSpacing : '0pt'}}>▶</span></span><span
									style={{fontFamily : '함초롬바탕'}}>교육대상</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>:
									18</span><span style={{fontFamily : '함초롬바탕'}}>세 이상 </span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>~ 39</span><span style={{fontFamily : '함초롬바탕'}}>세
									이하</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>(</span><span style={{fontFamily : '함초롬바탕'}}>용인시 거주 청년 또는 용인
									관내 재학생</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>, </span><span
									style={{fontFamily : '함초롱바탕'}}>재직자 등 활동청년</span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>)</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롱바탕'}}><span
										style={{letterSpacing : '0pt'}}>▶</span></span><span
									style={{fontFamily : '함초롱바탕'}}>교육장소</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>:
								</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>
									<font face="함초롬바탕">경기 용인시 수지구 포은대로 499 아르피아타워 2~3층</font>
								</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롱바탕'}}><span
										style={{letterSpacing : '0pt'}}>▶</span></span><span
									style={{fontFamily : '함초롱바탕'}}>교육내용</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>:
								</span><span style={{fontFamily : '함초롱바탕'}}>최근 비번하게 일어나는 청년 전세사기 피해 사례를 소개하고 부동산 안심거래 지원교육을
									통해 청년들의 정서적</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>·</span><span
									style={{fontFamily : '함초롱바탕'}}>심리적 주거 안정에 기여</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span style={{fontFamily : '함초롱바탕'}}><span
										style={{letterSpacing : '0pt'}}>▶</span></span><span style={{fontFamily : '함초롱바탕'}}>기타
									문의사항</span><span lang="EN-US" style={{letterSpacing : '0pt'}}>:</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span lang="EN-US" style={{letterSpacing : '0pt'}}>1:1
								</span><span style={{fontFamily : '함초롱바탕'}}>채팅문의</span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>: https://pf.kakao.com/_tYvmb</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span lang="EN-US" style={{letterSpacing : '0pt'}}>1:1
								</span><span style={{fontFamily : '함초롱바탕'}}>전화문의</span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>: 070-4012-0808 (</span><span
									style={{fontFamily : '함초롱바탕'}}>담당자 장원준</span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>)</span></span></p><br></br><br></br>

						<p class="0"><span style={{textAutospace : 'none'}}><span
									style={{fontFamily : '함초롱바탕'}}>상담가능시간</span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>: </span><span style={{fontFamily : '함초롱바탕'}}>평일 </span><span
									lang="EN-US" style={{letterSpacing : '0pt'}}>09:00~18:00</span></span></p><br></br><br></br>
									
						<p class="0"><span style={{textAutospace : 'none'}}><span
									style={{fontFamily : '함초롱바탕'}}>프로그램신청</span><span lang="EN-US"
									style={{letterSpacing : '0pt'}}>: https://forms.gle/iTFnqd5gcReFW1927</span></span></p>
						<br></br><br></br>
						<div class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="11235"
							id="hwpEditorBoardContent">&nbsp;</div><br></br>
					</div>
					<div class="program_v_file">
						<dl>
							<dt>첨부파일</dt>
							<dd>

								<li>첨부파일이 없습니다.</li>

							</dd>
						</dl>
					</div>
					<ul class="view_nav" style={{padding: '36px 0 ! important'}}>
						<li class="list_btn"><a href="#none" onclick="opList();">목록</a></li>
					</ul>
				</div>

			</div>
		</div>

	</div>
        </>
    );

}

export default Project;