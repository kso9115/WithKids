import './MemberDetail.css'
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import SignUp from './SignUp';

function MemberDetail() {
    // <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

    return (
        <form method='get'>
            <div>
                <b>기본인적사항</b>
                <div className='mem_gridBox'>
                    <div><span>*</span>대상자번호</div>
                    <div className='mem_serial'><input type='text' name='mem_serial' readOnly></input></div>

                    <div><span>*</span>대상자명</div>
                    <div className='mem_name'><input type='text' name='mem_name' readOnly></input></div>

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

                    <div><span>*</span>연령(만나이)</div>
                    <div className='mem_age'><input type='text' name='mem_age'></input>&nbsp;세</div>

                    <div>담당자</div>
                    <div className='mem_responsible_person'><input type='text' name='mem_responsible_person'></input></div>

                    <div><span>*</span>전화번호</div>
                    <div className='mem_tel'>
                        <input type='tel' name='mem_tel' placeholder='하이픈(-) 포함하여 작성'></input>
                    </div>

                    <div>휴대전화번호</div>
                    <div className='mem_phone'>
                        <input type='tel' name='mem_phone' placeholder='하이픈(-) 포함하여 작성'></input>
                    </div>


                    <div>이메일</div>
                    <div className='mem_mail'>
                        <input type='email' name='mem_mail'></input>
                        &nbsp;@&nbsp;
                        <select>
                            <option value='naver'>naver.com</option>
                            <option value='daum'>daum.net</option>
                            <option value='gmail'>gmail.com</option>
                        </select>
                    </div>

                    <div>우편번호</div>
                    <div className='mem_zipcode'><input type='text' name='mem_zipcode'></input></div>

                    <div>주소</div>
                    <div className='mem_address1'>
                        <input type='text' name='mem_address1' placeholder='도로명 주소를 입력하세요' readOnly></input>&nbsp;&nbsp;
                        <input type='text' name='mem_address2' placeholder='상세주소'></input>&nbsp;&nbsp;
                        <input type='button' value='주소입력' onClick={<SignUp />}></input>
                    </div>
                </div>

                <b>계좌번호</b>
                <div className='mem_gridBox2'>
                    <div>은행명</div>
                    <div className='mem_bank'>
                        <select name='mem_bank'>
                            <option value='국민'>국민</option>
                            <option value='농협'>농협</option>
                            <option value='기업'>기업</option>
                            <option value='쉽게'>쉽게</option>
                            <option value='하는'>하는</option>
                            <option value='방법'>방법</option>
                            <option value='없을'>없을</option>
                            <option value='까요'>까요</option>
                        </select>
                    </div>

                    <div>계좌번호</div>
                    <div className='mem_account'><input type='text' name='mem_account' placeholder='하이픈(-) 포함하여 작성'></input></div>

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



                <div className='buttonBox'>
                    <div>
                        <button type="reset">입력취소</button>
                        <button type="submit" value='삭제' formaction="/member/delete">삭제</button>
                        <button type="submit" value='신규' formaction="/member/insert">신규</button>
                        <button type="submit" value='저장' formaction="/member/update">저장</button>
                    </div>
                </div>
            </div >
        </form >
    )

}

export default MemberDetail;