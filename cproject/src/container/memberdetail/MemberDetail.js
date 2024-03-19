import './MemberDetail.css'

function MemberDetail() {

    return (
        <div>
            <b>기본인적사항</b>
            <div className='gridBox'>
                <div><span>*</span>대상자번호</div>
                <div><input type='text' readOnly></input></div>

                <div><span>*</span>대상자명</div>
                <div><input type='text' readOnly></input></div>

                <div>개인정보활용동의</div>
                <div>
                    <div>
                        <input type='radio' name='agreeP' value='Y' defaultChecked></input>
                        <label for='agreeP'>Yes&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input type='radio' name='agreeP' value='N'></input>
                        <label for='agreeP'>No</label>
                    </div>
                </div>

                <div><span>*</span>주민등록번호</div>
                <div>
                    <input type='text' readOnly></input>&nbsp;
                    <label for='resident'></label>
                    <input type='button' value='중복'></input>
                </div>

                <div>실명확인여부</div>
                <div>
                    <div>
                        <input type='radio' name='agreeN' value='Y' defaultChecked></input>
                        <label for='agreeN'>Yes&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input type='radio' name='agreeN' value='N'></input>
                        <label for='agreeN'>No</label>
                    </div>
                </div>

                <div><span>*</span>생년월일</div>
                <div><input type='date'></input></div>

                <div><span>*</span>성별</div>
                <div>
                    <select name="gender">
                        <option value="none">전체</option>
                        <option value='1'>여성</option>
                        <option value='2'>남성</option>
                    </select>
                </div>

                <div><sapn>*</sapn>연령(만나이)</div>
                <div><input type='text'></input> 세</div>

                <div>담당자</div>
                <div><input type='text'></input></div>
                
                <div><sapn>*</sapn>전화번호</div>
                <div><input type='tel'></input></div>
                
                <div>휴대전화번호</div>
                <div><input type='tel'></input></div>
                
                <div>긴급연락처</div>
                <div><input type='tel'></input></div>
                
                <div>이메일</div>
                <div>
                    <input type='email'></input>
                    &nbsp;@&nbsp;
                    <select>
                        <option value='naver'>naver.com</option>
                        <option value='daum'>daum.net</option>
                        <option value='gmail'>gmail.com</option>
                    </select>
                </div>
            </div>

            <b>계좌번호</b>
            <div className='gridBox2'>
                <div>은행명</div>
                <div><input type='text'></input></div>
                
                <div>계좌번호</div>
                <div><input type='text'></input></div>
                
                <div>예금주</div>
                <div><input type='text'></input></div>
            </div>

            <p>학력</p>
            <div className='gridBox3'>
                <div>학력구분</div>
                <div><input type='text'></input></div>
                
                <div>학교명</div>
                <div><input type='text'></input></div>
                
                <div>학년(반)</div>
                <div><input type='text'></input></div>
                
                <div>담임명</div>
                <div><input type='text'></input></div>
                
                <div>담임연락처</div>
                <div><input type='tel'></input></div>
            </div>

            <b>비고</b>
            <div className='gridBox3'>
                <div>특이사항</div>
                <div><textarea></textarea></div>

            </div>



        </div>
    )

}

export default MemberDetail;