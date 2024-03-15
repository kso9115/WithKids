import './MemberDetail.css'

function MemberDetail() {

    return (
        <div>
            <b>기본인적사항</b>
            <div className='mem_gridBox'>
                <div><span>*</span>대상자번호</div>
                <div><input type='text' name='mem_serial' readOnly></input></div>

                <div><span>*</span>대상자명</div>
                <div><input type='text' name='mem_name'  readOnly></input></div>

                <div>개인정보활용동의</div>
                <div>
                    <div>
                        <input type='radio' name='mem_agreeP' value='Y' defaultChecked></input>
                        <label for='agreeP'>&nbsp;Y&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input type='radio' name='mem_agreeP' value='N'></input>
                        <label for='agreeP'>&nbsp;N</label>
                    </div>
                </div>

                <div><span>*</span>주민등록번호</div>
                <div className='mem_resident_registration_number'>
                    <input type='text' name='mem_resident_registration_number' readOnly></input>
                    &nbsp;-&nbsp;
                    <input type='text' name='mem_resident_registration_number' readOnly></input>&nbsp;
                    <label for='mem_resident_registration_number'></label>
                    <input type='button' value='중복'></input>
                </div>

                <div>실명확인여부</div>
                <div>
                    <div>
                        <input type='radio' name='mem_agreeN' value='Y' defaultChecked></input>
                        <label for='agreeN'>&nbsp;Y&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input type='radio' name='mem_agreeN' value='N'></input>
                        <label for='agreeN'>&nbsp;N</label>
                    </div>
                </div>

                <div><span>*</span>생년월일</div>
                <div><input type='date' name='mem_birthday'></input></div>

                <div><span>*</span>성별</div>
                <div>
                    <select name="mem_sex">
                        <option value="none">전체</option>
                        <option value='1'>여성</option>
                        <option value='2'>남성</option>
                    </select>
                </div>

                <div><sapn>*</sapn>연령(만나이)</div>
                <div><input type='text' name='mem_age'></input> 세</div>

                <div>담당자</div>
                <div><input type='text' name='mem_responsible_person'></input></div>
                
                <div><sapn>*</sapn>전화번호</div>
                <div><input type='tel' name='mem_tel'></input></div>
                
                <div>휴대전화번호</div>
                <div><input type='tel' name='mem_phone'></input></div>
                
                <div>우편번호</div>
                <div><input type='text' name='mem_zipcode'></input></div>
                
                <div>주소</div>
                <div>
                    <input type='text' name='mem_address1'></input>
                    <input type='button' value='주소검색'></input>
                </div>
                
                <div>이메일</div>
                <div>
                    <input type='email' name='mem_mail'></input>
                    &nbsp;@&nbsp;
                    <select>
                        <option value='naver'>naver.com</option>
                        <option value='daum'>daum.net</option>
                        <option value='gmail'>gmail.com</option>
                    </select>
                </div>
            </div>

            <b>계좌번호</b>
            <div className='mem_gridBox2'>
                <div>은행명</div>
                <div><input type='text' name='mem_bank'></input></div>
                
                <div>계좌번호</div>
                <div><input type='text' name='mem_account'></input></div>
                
                <div>예금주</div>
                <div><input type='text' name='mem_depositor'></input></div>
            </div>

            <b>학력</b>
            <div className='mem_gridBox3'>
                <div>학력구분</div>
                <div><input type='text' name='academic_Background'></input></div>
                
                <div>학교명</div>
                <div><input type='text' name='academic_name'></input></div>
                
                <div>학년(반)</div>
                <div><input type='text' name='academic_grade'></input></div>
                
                <div>담임명</div>
                <div><input type='text' name='academic_teacher'></input></div>
                
                <div>담임연락처</div>
                <div><input type='tel' name='academic_teacherPhone'></input></div>
            </div>
        </div>
    )

}

export default MemberDetail;