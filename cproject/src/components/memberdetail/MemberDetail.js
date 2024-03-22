import './MemberDetail.css'
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import SignUp from './SignUp';

// 다음 우편 라이브러리
// <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

function MemberDetail({ data, setData }) {

    // 가져온 멤버 한명의 데이터를 사용하기 위해 useState에 저장
    const [memDataOneD, setMemDataOneD] = useState({});
    useEffect(() => {
        setMemDataOneD({
            ...data
        })
    }, [data])
    console.log(memDataOneD);

    // text,radio 타입 input 태그 ,select 태그 value 제어
    const memDataChange = useCallback((event) => {
        memDataOneD[event.target.name] = event.target.value;
        setMemDataOneD({ ...memDataOneD });
    }, [memDataOneD]);

    // 동일한 함수 테스트
    // const memDataChange = useCallback((event) => {
    //     setMemDataOneD(data => ({
    //         ...data,
    //         [event.target.name]: event.target.value
    //     }));
    // }, []);

    //

    // Delete : 선택한 DB 삭제
    function deleteByMemserial(){
        if(memDataOneD.memSerial && window.confirm("해당 아동을 삭제하시겠습니까?")){
            axios
            .post('/api/mem/memDelete', null, {params: { memSerial: memDataOneD.memSerial }})
            .then((response)=>{
                setData({});    // 부모로부터 전달받은 setMemDataOne 실행하여 빈객체 삽입
                alert(response.data);
                console.log(response.data);
            }).catch((err)=>{
                console.log(err);
            });
        } else{
            alert("아동 삭제 취소")
        }
    }




    return (
        <form method='post'>
            <div>
                <b>기본인적사항</b>
                <div className='mem_gridBox'>
                    <div><span>*</span>대상자번호</div>
                    <div className='mem_serial'>
                        <input type='text' name='memSerial'
                            value={memDataOneD.memSerial}
                            onChange={memDataChange} disabled={memDataOneD.memSerial || ""}>
                        </input>
                    </div>

                    <div><span>*</span>대상자명</div>
                    <div className='mem_name'>
                        <input type='text' name='memName'
                            onChange={memDataChange} value={memDataOneD.memName || ""} readOnly>
                        </input>
                    </div>

                    <div>개인정보활용동의</div>
                    <div>
                        <div>
                            {/* checked가안먹는다.. */}
                            <input type='radio' name='memAgreeP' value='Y'
                                checked={memDataOneD.memAgreeP === 'Y'}
                                onChange={memDataChange} defaultChecked>
                            </input>
                            <label for='agreeP'>&nbsp;Y&nbsp;&nbsp;</label>
                        </div>
                        <div>
                            <input type='radio' name='memAgreeP' value='N'
                                checked={memDataOneD.memAgreeP === 'Y'}
                                onChange={memDataChange}>
                            </input>
                            <label for='agreeP'>&nbsp;N</label>
                        </div>
                    </div>

                    <div><span>*</span>주민등록번호</div>
                    <div className='mem_responsible_person'>
                        <input type='text' name='memRegNum'
                            value={memDataOneD.memRegNum}
                            onChange={memDataChange} disabled={memDataOneD.memSerial}>
                        </input>
                        &nbsp;
                        <label for='memRegNum'></label>
                        <input type='button' value='중복확인'></input>
                    </div>

                    <div>실명확인여부</div>
                    <div>
                        <div>
                            <input type='radio' name='memAgreeN' value='Y'
                                checked={memDataOneD.memAgreeN === 'Y'} onChange={memDataChange} defaultChecked></input>
                            <label for='agreeN'>&nbsp;Y&nbsp;&nbsp;</label>
                        </div>
                        <div>
                            <input type='radio' name='memAgreeN' value='N'
                                checked={memDataOneD.memAgreeN === 'N'} onChange={memDataChange} ></input>
                            <label for='agreeN'>&nbsp;N</label>
                        </div>
                    </div>

                    <div><span>*</span>생년월일</div>
                    <div>
                        <input type='date' name='memBirth'
                            value={memDataOneD.memBirth || ""}
                            onChange={memDataChange}>
                        </input>
                    </div>

                    <div><span>*</span>성별</div>
                    <div>
                        <select name="memSex"
                            value={memDataOneD.memSex || ""}
                            onChange={memDataChange}>
                            <option value="none">전체</option>
                            <option value='1'>여성</option>
                            <option value='2'>남성</option>
                        </select>
                    </div>

                    <div><span>*</span>연령(만나이)</div>
                    <div className='mem_age'>
                        <input type='text' name='memAge'
                            value={memDataOneD.memAge || ""} onChange={memDataChange}>
                        </input>
                    </div>

                    <div>담당자</div>
                    <div className='mem_responsible_person'>
                        <input type='text' name='memResPerson'
                            onChange={memDataChange} value={memDataOneD.memResPerson || ""}>
                        </input>
                    </div>

                    <div><span>*</span>전화번호</div>
                    <div className='mem_tel'>
                        <input type='tel' name='memTel' placeholder='하이픈(-) 포함하여 작성'
                            value={memDataOneD.memTel || ""}
                            onChange={memDataChange}>
                        </input>
                    </div>

                    <div>휴대전화번호</div>
                    <div className='mem_phone'>
                        <input type='tel' name='memPhone' placeholder='하이픈(-) 포함하여 작성'
                            value={memDataOneD.memPhone || ""}
                            onChange={memDataChange}>

                        </input>
                    </div>


                    <div>이메일</div>
                    <div className='mem_mail'>
                        <input type='email' name='memMail'
                            value={memDataOneD.memMail || ""}
                            onChange={memDataChange}>

                        </input>
                    </div>

                    <div>우편번호</div>
                    <div className='mem_zipcode'>
                        <input type='text' name='memZipCode' value={memDataOneD.memZipCode} onChange={memDataChange}>
                        </input>&nbsp;
                        <input type='button' value='주소검색' onClick={<SignUp />}></input>
                    </div>


                    <div>주소</div>
                    <div className='mem_address1'>
                        <input type='text' name='memAddress1' placeholder='도로명 주소'
                            value={memDataOneD.memAddress1}
                            onChange={memDataChange} readOnly>
                        </input>
                    </div>

                    <div>상세주소</div>
                    <div className='mem_address2'>
                        <input type='text' name='memAddress2' placeholder='상세주소'
                            value={memDataOneD.memAddress2}
                            onChange={memDataChange}>
                        </input>
                    </div>
                </div>

                <b>계좌번호</b>
                <div className='mem_gridBox2'>
                    <div>은행명</div>
                    <div className='mem_bank'>
                        <select name='mem_bank' onChange={memDataChange}>
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
                    <div className='mem_account'>
                        <input type='text' name='memAccount' placeholder='하이픈(-) 포함하여 작성'
                            value={memDataOneD.memAccount}
                            onChange={memDataChange}>
                        </input>
                    </div>

                    <div>예금주</div>
                    <div className='mem_depositor'>
                        <input type='text' name='memDepositor'
                            value={memDataOneD.memDepositor}
                            onChange={memDataChange}>
                        </input>
                    </div>
                </div>



                <b>학력</b>
                <div className='mem_gridBox3'>
                    <div>학력구분</div>
                    <div><input type='text' name='education_background'></input></div>

                    <div>학교명</div>
                    <div><input type='text' name='education_name' value='컬럼추가'></input></div>

                    <div>학년(반)</div>
                    <div><input type='text' name='education_grade' value='컬럼추가'></input></div>

                    <div>담임명</div>
                    <div><input type='text' name='education_teacher' value='컬럼추가'></input></div>

                    <div>담임연락처</div>
                    <div><input type='tel' name='education_teacherPhone' value='컬럼추가'></input></div>

                    <div></div>
                    <div></div>
                </div>



                <div className='buttonBox'>
                    <div>
                        <button type="reset" onClick={()=> setMemDataOneD({})}>입력취소</button>
                        <button type="submit" value='삭제' onClick={deleteByMemserial}>삭제</button>
                        <button type="submit" value='신규' >신규</button>
                        <button type="submit" value='저장' >저장</button>
                    </div>
                </div>
            </div >
        </form >
    )

}

export default MemberDetail;