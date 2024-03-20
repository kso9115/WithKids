import './survey.css';
import img2 from './vote_q.png';
import img3 from './v1.png';

function Survery() {
  
    // return { __html: '<iframe src="./ survety.html"</iframe>' };
    return (
        <div>
        <div class="top_title">
		<h5>설문조사</h5>
	</div>

	<div id="contain">

		<div class="contain">
			<div id="aside">
				<div class="community">

					

				</div>
			</div>
			<div id="design">
				<div id="program">
					<div class="visual_community">
						<div class="visual">
							<h1>COMMYNITY CHILD CENTER</h1>

						</div>
						<i class="img">
							<dt><img src={img3} alt=""></img></dt>
						</i>
					</div>
				</div>
				<div class="community">
					
					
					<form method="post" name="que_form"></form>	
                   			
						<input type="hidden" name="wd_reg_s_date" value="1710252741"></input>
						<input type="hidden" name="vtCode" value="1"></input>

						<div class="faq_list">
							<ul>
								<li class="faq">
									<dl class="faq_q">
										<dt><img src={img2} alt=""></img></dt>
										<dd>지역아동복지센터 만족도 설문</dd> 
									</dl>
								</li>
                                
							</ul>
						</div>


						

					
						<input type="hidden" name="item_code[]" value="2"></input>
						<input type="hidden" name="vote_type[2]" value="1"></input>

						<div class="polltit">
							<h3><i></i><strong>질문 1.</strong> 문1-1 귀하의 성별이 어떻게 되십니까?
							</h3>
						</div>
						
						<div class="pollitem">
							<div class="pollitem_wrap">
								<ul>
									<li>
										<div class="question">
											<strong>1</strong>
											<input type="radio" value="1" id="item20" name="answer[2][]" title="예"></input>
											<label for="item20">남자</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>2</strong>
											<input type="radio" value="2" id="item21" name="answer[2][]" title="아니오"></input>
											<label for="item21">여자</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
					
						<input type="hidden" name="item_code[]" value="3"></input>
						<input type="hidden" name="vote_type[3]" value="1"></input>

						<div class="polltit">
							<h3><i></i><strong>질문 2.</strong> 문1-2 귀하께서는 프로그램이 만족스러우셨습니까?</h3>
						</div>
					
						<div class="pollitem">
							<div class="pollitem_wrap">
								<ul>
									<li>
										<div class="question">
											<strong>1</strong>
											<input type="radio" value="1" id="item30" name="answer[3][]" title="예"></input>
											<label for="item30">그렇다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>2</strong>
											<input type="radio" value="2" id="item31" name="answer[3][]" title="아니오"></input>
											<label for="item31">보통이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>3</strong>
											<input type="radio" value="2" id="item31" name="answer[3][]" title="아니오"></input>
											<label for="item31">아니오</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
						
						<input type="hidden" name="item_code[]" value="4"></input>
						<input type="hidden" name="vote_type[4]" value="1"></input>

						<div class="polltit">
							<h3><i></i><strong>질문 3.</strong> 문1-3 최근 1년간 지역아동복지센터에서 진행하는 프로그램을
								이용해 보신 적이 있으십니까?</h3>
						</div>
						
						<div class="pollitem">
							<div class="pollitem_wrap">
								<ul>
									<li>
										<div class="question">
											<strong>1</strong>
											<input type="radio" value="1" id="item40" name="answer[4][]" title="예"></input>
											<label for="item40">예</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>2</strong>
											<input type="radio" value="2" id="item41" name="answer[4][]" title="아니오"></input>
											<label for="item41">아니오</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
						
						<input type="hidden" name="item_code[]" value="5"></input>
						<input type="hidden" name="vote_type[5]" value="1"></input>

						<div class="polltit">
							<h3><i></i><strong>질문 4.</strong> 문1-4 이 프로그램은 다시 한번 체험하고 싶은 흥미를 가지고 있습니까?</h3>
						</div>
						
						<div class="pollitem">
							<div class="pollitem_wrap">
								<ul>
									<li>
										<div class="question">
											<strong>1</strong>
											<input type="radio" value="1" id="item50" name="answer[5][]"></input>
											<label for="item50">전혀 그렇지 않다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>2</strong>
											<input type="radio" value="2" id="item51" name="answer[5][]"></input>
												
											<label for="item51">그렇지 않은 편이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>3</strong>
											<input type="radio" value="3" id="item52" name="answer[5][]" title="보통이다"></input>
											<label for="item52">보통이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>4</strong>
											<input type="radio" value="4" id="item53" name="answer[5][]" title="그런 편이다"></input>
											<label for="item53">그런 편이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>5</strong>
											<input type="radio" value="5" id="item54" name="answer[5][]" title="매우 그렇다"></input>
											<label for="item54">매우 그렇다</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
						
						<input type="hidden" name="item_code[]" value="6"></input>
						<input type="hidden" name="vote_type[6]" value="1"></input>

						<div class="polltit">
							<h3><i></i><strong>질문 5.</strong> 문1-5 프로그램 강사님은 친절하셨습니까?</h3>
						</div>
						
						<div class="pollitem">
							<div class="pollitem_wrap">
								<ul>
									<li>
										<div class="question">
											<strong>1</strong>
											<input type="radio" value="1" id="item60" name="answer[6][]"></input>
												
											<label for="item60">전혀 그렇지 않다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>2</strong>
											<input type="radio" value="2" id="item61" name="answer[6][]"></input>
												
											<label for="item61">그렇지 않은 편이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>3</strong>
											<input type="radio" value="3" id="item62" name="answer[6][]" title="보통이다"></input>
											<label for="item62">보통이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>4</strong>
											<input type="radio" value="4" id="item63" name="answer[6][]" title="그런 편이다"></input>
											<label for="item63">그런 편이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>5</strong>
											<input type="radio" value="5" id="item64" name="answer[6][]" title="매우 그렇다"></input>
											<label for="item64">매우 그렇다</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
						
						<input type="hidden" name="item_code[]" value="7"></input>
						<input type="hidden" name="vote_type[7]" value="1"></input>

						<div class="polltit">
							<h3><i></i><strong>질문 6.</strong> 문1-6 프로그램을 점수로 표현한다면 몇점입니까?
							</h3>
						</div>
						
						<div class="pollitem">
							<div class="pollitem_wrap">
								<ul>
									<li>
										<div class="question">
											<strong>1</strong>
											<input type="radio" value="1" id="item70" name="answer[7][]"></input>
												
											<label for="item70">1점</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>2</strong>
											<input type="radio" value="2" id="item71" name="answer[7][]"></input>
												
											<label for="item71">2점</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>3</strong>
											<input type="radio" value="3" id="item72" name="answer[7][]" title="보통이다"></input>
											<label for="item72">3점</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>4</strong>
											<input type="radio" value="4" id="item73" name="answer[7][]" title="그런 편이다"></input>
											<label for="item73">4점</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>5</strong>
											<input type="radio" value="5" id="item74" name="answer[7][]" title="매우 그렇다"></input>
											<label for="item74">5점</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
						
						
						<input type="hidden" name="item_code[]" value="8"></input>
						<input type="hidden" name="vote_type[8]" value="1"></input>

						<div class="polltit">
							<h3><i></i><strong>질문 7.</strong> 문1-7 이 프로그램을 다른 사람에게 추천하고 싶으십니까?</h3>
						</div>
						
						<div class="pollitem">
							<div class="pollitem_wrap">
								<ul>
									<li>
										<div class="question">
											<strong>1</strong>
											<input type="radio" value="1" id="item80" name="answer[8][]"></input>
												
											<label for="item80">전혀 그렇지 않다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>2</strong>
											<input type="radio" value="2" id="item81" name="answer[8][]"></input>
												
											<label for="item81">그렇지 않은 편이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>3</strong>
											<input type="radio" value="3" id="item82" name="answer[8][]" title="보통이다"></input>
											<label for="item82">보통이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>4</strong>
											<input type="radio" value="4" id="item83" name="answer[8][]" title="그런 편이다"></input>
											<label for="item83">그런 편이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>5</strong>
											<input type="radio" value="5" id="item84" name="answer[8][]" title="매우 그렇다"></input>
											<label for="item84">매우 그렇다</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
						
						<input type="hidden" name="item_code[]" value="9"></input>
						<input type="hidden" name="vote_type[9]" value="1"></input>

						<div class="polltit">
							<h3><i></i><strong>질문 8.</strong> 문1-8 이 프로그램 시설은 체험을 하기에 불편함이 없으십니까?</h3>
						</div>
						
						<div class="pollitem">
							<div class="pollitem_wrap">
								<ul>
									<li>
										<div class="question">
											<strong>1</strong>
											<input type="radio" value="1" id="item90" name="answer[9][]"></input>
												
											<label for="item90">전혀 그렇지 않다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>2</strong>
											<input type="radio" value="2" id="item91" name="answer[9][]"></input>
												
											<label for="item91">그렇지 않은 편이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>3</strong>
											<input type="radio" value="3" id="item92" name="answer[9][]" title="보통이다"></input>
											<label for="item92">보통이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>4</strong>
											<input type="radio" value="4" id="item93" name="answer[9][]" title="그런 편이다"></input>
											<label for="item93">그런 편이다</label>
										</div>
									</li>
									<li>
										<div class="question">
											<strong>5</strong>
											<input type="radio" value="5" id="item94" name="answer[9][]" title="매우 그렇다"></input>
											<label for="item94">매우 그렇다</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
						

						<form onsubmit="return false">
							<input type="text" size="50" value="설문 조사를 완료하시면 제출 버튼을 클릭해주세요"></input>
							<input class="button2" type="submit" value="제출" onclick="alert('설문 조사가 정상적으로 완료되었습니다')"></input>
						</form>
					
				</div>
			</div>
		</div>
	</div>
	</div>
    );

}
export default Survery;