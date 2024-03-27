import './MemberDetail.css'
import { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
// import DaumPostcode from 'react-daum-postcode';

// import Postcode from './Postcode';
// import DaumPost from './DaumPost';

// data={memDataOne} eduData={eduDataOne}
//  setData={setMemDataOne} setEduDataOne={setEduDataOne}
// memListUpdate={memListUpdate} setMemListUpdate={setMemListUpdate}
function MemberDetail({ data, eduData, setData, setEduDataOne, memListUpdate, setMemListUpdate }) {
    

    // 우편번호
    // <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

    // 우편번호 팝업창 input 일단 꺼놓음
    const [enroll_company, setEnroll_company] = useState({
        address: '',
    });
    const [popup, setPopup] = useState(false);
    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }
    const handleComplete = (data) => {
        setPopup(!popup);
    }

    //=================================================

    // input 태그 입력 시 데이터
    // const formData = useRef({
    //     memSerial: 'formData.memSerial',
    // })

    // 입력된 값을 상태에 업데이트하는 함수를 정의
    // const handleChange = (e) => {
    //     const { name, value } = e.target.value;
    //     // useRef로 생성한 객체의 current 프로퍼티를 통해 직접 접근하여 값을 업데이트
    //     formData.current[name] = value;
    // };

    // 입력된 값들을 저장하는 함수를 정의
    // const handleSubmit = (e) => {
    //     e.preventDefault(); // 폼 기본 동작 방지
    //     console.log(formData.current); // 입력된 데이터들을 출력 : 가긴함..
    //     // 이후 이 값을 서버로 전송하거나 다른 처리
    // };

    //=================================================

    // Member Entity DB : 가져온 멤버 한명의 멤버 데이터를 사용하기 위해 useState에 저장
    const [memDataOneD, setMemDataOneD] = useState({});
    useEffect(() => {
        setMemDataOneD({
            ...data,
        })
    }, [data])
    // console.log(memDataOneD.memSerial);   // 입력해도 업데이트가 안된다....ㅠㅠ그럼 따로 저장을?

    // text,radio 타입 input 태그 ,select 태그 value 값 제어
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

    // Edu Entity DB :  가져온 멤버 한명의 학력 데이터를 사용하기 위해 useState에 저장
    const [eduDataOneD, setEduMemOneD] = useState({});
    useEffect(() => {
        setEduMemOneD({
            ...eduData
            // 기본적으로 memSerial이랑 memName을 가지게 해주면댄다...!! 
            // 아래에서 함수 내 인자로 전달할 필요가 없음
            , memSerial: data.memSerial
            , memName: data.memName
        })
    }, [eduData])
    console.log("데이터가안들어온다고왜냐고");
    console.log(eduData);

    // text,radio 타입 input 태그 ,select 태그 value 값 제어
    const eduDataChange = useCallback((event) => {
        eduDataOneD[event.target.name] = event.target.value;
        setEduMemOneD({ ...eduDataOneD });
    }, [eduDataOneD]);

    //=================================================

    // INSERT UPDATE 기능 요청 : 선택한 DB 추가,업데이트
    function saveData(data, endpoint) {
        if (!data) {
            console.error('데이터가 유효하지 않습니다.');
            return;
        }

        axios.post(endpoint, data)
            .then((response) => {
                console.log("넘어오는 데이터 확인");
                console.log(response.data);

                // 멤버리스트 상태값 변화 감지 후 리스트 재업데이트
                alert("데이터 추가 성공");  // 요청을 두번 보내버려서 alert창이 두번뜨고있음
                
                // 변화 감지 후 리스트 리렌더링
                // setMemListUpdate(!memListUpdate);
            })
            .catch((err) => {
                alert("요청 실패");
                console.error(err);
            });
    }

    function saveMemData() {
        saveData(memDataOneD, '/api/mem/memInesert');
    }

    function saveEduData() {
        if (memDataOneD.memSerial) {
            console.log("11들어오나?");
            saveData(eduDataOneD, '/api/mem/memEduInesert');
        }
    }

    // 입력 데이터 수정 콘솔 확인용
    // console.log(memDataOneD);
    // console.log(eduDataOneD);


    // 2. DELETE 기능 요청 : 선택한 DB 삭제
    function deleteMemByMemserial() {
        if (memDataOneD.memSerial && window.confirm("해당 아동을 삭제하시겠습니까?")) {
            axios
                .post('/api/mem/memDelete', null, { params: { memSerial: memDataOneD.memSerial } })
                // .post('/api/mem/memDelete', { memSerial: memDataOneD.memSerial })
                // .then((response) => {    // 자꾸 홈으로 다시 가서 일단 수정
                .then(function (response) {
                    setData({});    // 부모로부터 전달받은 setMemDataOne 실행하여 빈객체 삽입

                    alert(response.data);

                    // 멤버리스트 상태값 변화 감지 후 리스트 재업데이트
                    // setMemListUpdate(!memListUpdate);

                    console.log(response.data);
                    // }).catch((err) => {  // 자꾸 홈으로 가서 일단 수정222
                }).catch(function (err) {
                    console.log(err);
                });
        } else {
            alert("아동 삭제 취소")
        }
    }

    function deleteEduByMemserial() {
        if (eduDataOneD.memSerial) {
            axios
                .post('/api/mem/eduDelete', null, { params: { memSerial: eduDataOneD.memSerial } })
                // .then((response) => {    // 자꾸 홈으로 다시 가서 일단 수정
                .then(function (response) {
                    setData({});    // 부모로부터 전달받은 setMemDataOne 실행하여 빈객체 삽입

                    alert(response.data);

                    // 멤버리스트 상태값 변화 감지 후 리스트 재업데이트
                    // setMemListUpdate(!memListUpdate);
                    console.log(response.data);
                    // }).catch((err) => {  // 자꾸 홈으로 가서 일단 수정222
                }).catch(function (err) {
                    console.log(err);
                });
        } else {
            alert("아동 학력 삭제 취소")
        }
    }

    // 3. 입력 데이터 전체 리셋 : 대신에 data값을 setData({}) 빈객체로 넣어준다.
    function resutData() {
        setMemDataOneD({})
        setEduDataOne({})
    }




    return (
        // <form onSubmit={handleSubmit}>
        // <form >
        <div>
            <b>기본인적사항</b>
            <div className='mem_gridBox'>
                <div><span>*</span>대상자번호</div>
                <div className='mem_serial'>
                    <input type='text' name='memSerial'
                        value={memDataOneD.memSerial || ""}
                        onChange={memDataChange} disabled={data.memSerial}>
                    </input>
                </div>

                <div><span>*</span>대상자명</div>
                <div className='mem_name'>
                    <input type='text' name='memName'
                        value={memDataOneD.memName || ""}
                        onChange={memDataChange} disabled={data.memSerial} >
                    </input>
                </div>

                <div>개인정보활용동의</div>
                <div>
                    <div>
                        {/* checked가안먹는다.. */}
                        <input type='radio' name='memAgreeP' value='Y'
                            checked={memDataOneD.memAgreeP === 'Y'}
                            onChange={memDataChange} >
                        </input>
                        <label htmlFor='agreeP'>&nbsp;Y&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input type='radio' name='memAgreeP' value='N'
                            checked={memDataOneD.memAgreeP === 'N'}
                            onChange={memDataChange}>
                        </input>
                        <label htmlFor='agreeP'>&nbsp;N</label>
                    </div>
                </div>

                <div><span>*</span>주민등록번호</div>
                <div className='mem_responsible_person'>
                    <input type='text' name='memRegNum'
                        value={memDataOneD.memRegNum || ""}
                        onChange={memDataChange} disabled={data.memSerial}>
                    </input>
                    {/* &nbsp;
                    <label htmlFor='memRegNum'></label>
                    <input type='button' value='중복확인'></input> */}
                </div>

                <div>실명확인여부</div>
                <div>
                    <div>
                        <input type='radio' name='memAgreeN' value='Y'
                            checked={memDataOneD.memAgreeN === 'Y'} onChange={memDataChange}></input>
                        <label htmlFor='agreeN'>&nbsp;Y&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input type='radio' name='memAgreeN' value='N'
                            checked={memDataOneD.memAgreeN === 'N'}
                            onChange={memDataChange} ></input>
                        <label htmlFor='agreeN'>&nbsp;N</label>
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
                        value={memDataOneD.memResPerson || ""}
                        onChange={memDataChange}
                        disabled>
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
                    {/* <input type='text' name='memZipCode' value={memDataOneD.memZipCode} onChange={memDataChange}>
                        </input>&nbsp;
                        <input type='button' value='주소검색' onClick={<Postcode />}></input> */}
                    {/* <input className="user_enroll_text" placeholder="주소" type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} /> */}
                    {/* <button onClick={handleComplete}>우편번호 찾기</button> */}
                    {/* {popup && <Postcode company={enroll_company} setcompany={setEnroll_company}></Postcode>} */}

                    {/* 안됨 */}
                    {/* <DaumPost setAddressObj={setAddressObj} setLocationObj={setLocationObj} /> */}
                </div>


                <div>주소</div>
                <div className='mem_address1'>
                    <input type='text' name='memAddress1' placeholder='도로명 주소'
                        value={memDataOneD.memAddress1 || ""}
                        onChange={memDataChange} readOnly>
                    </input>
                </div>

                <div>상세주소</div>
                <div className='mem_address2'>
                    <input type='text' name='memAddress2' placeholder='상세주소'
                        value={memDataOneD.memAddress2 || ""}
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
                        <option value='하나'>하나</option>
                        <option value='우리'>우리</option>
                        <option value='신한'>신한</option>
                    </select>
                </div>

                <div>계좌번호</div>
                <div className='mem_account'>
                    <input type='text' name='memAccount' placeholder='하이픈(-) 포함하여 작성'
                        value={memDataOneD.memAccount || ""}
                        onChange={memDataChange}>
                    </input>
                </div>

                <div>예금주</div>
                <div className='mem_depositor'>
                    <input type='text' name='memDepositor'
                        value={memDataOneD.memDepositor || ""}
                        onChange={memDataChange}>
                    </input>
                </div>
            </div>



            <b>학력</b>
            <div className='mem_gridBox3'>
                <div>학력구분</div>
                <div>
                    <input type='text' name='eduBack'
                        value={eduDataOneD.eduBack || ""}
                        onChange={eduDataChange}>

                    </input>
                </div>

                <div>학교명</div>
                <div>
                    <input type='text' name='eduName'
                        value={eduDataOneD.eduName || ""}
                        onChange={eduDataChange}>
                    </input>
                </div>

                <div>학년(반)</div>
                <div>
                    <input type='text' name='eduGrade'
                        value={eduDataOneD.eduGrade || ""}
                        onChange={eduDataChange}>
                    </input>
                </div>

                <div>담임명</div>
                <div>
                    <input type='text' name='eduTeacher'
                        value={eduDataOneD.eduTeacher || ""}
                        onChange={eduDataChange}>
                    </input>
                </div>

                <div>담임연락처</div>
                <div>
                    <input type='tel' name='eduTeacherPhone'
                        value={eduDataOneD.eduTeacherPhone || ""}
                        onChange={eduDataChange}>
                    </input>
                </div>

                <div></div>
                <div></div>
            </div>



            <div className='buttonBox'>
                <div>
                    <button type="reset" onClick={() => setData({})}>입력취소11</button>
                    <button type="reset" onClick={resutData}>입력취소</button>
                    <button type="submit" value='삭제' onClick={() => { deleteMemByMemserial(); deleteEduByMemserial(); }}>삭제</button>
                    <button type="submit" value='신규등록' onClick={() => { saveMemData(); saveEduData(); }}>등록 및 수정</button>
                    {/* <button type="submit" value='업데이트' >업데이트</button> */}
                    <button type="submit" value='pw초기화' >PW초기화</button>
                </div>
            </div>
        </div >
        // </form >
    )

}

export default MemberDetail;