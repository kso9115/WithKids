import './MemberDetail.css'
import { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';

import PostCode from './Postcode';
import { apiCall } from '../../server/apiService';
import { mem_dtls_inp_ck } from '../../hooks/inputCheck/memberInputCheck';

// data={memDataOne} eduData={eduDataOne}
// setData={setMemDataOne} setEduDataOne={setEduDataOne}
// memListUpdate={memListUpdate} setMemListUpdate={setMemListUpdate}
function MemberDetail({ data, eduData, setData, setEduDataOne, memListUpdate, setMemListUpdate }) {

    // 1. Member Entity DB : 가져온 멤버 한명의 멤버 데이터를 사용하기 위해 useState에 저장
    const [memDataOneD, setMemDataOneD] = useState({});

    const memImage = useRef();  // 이미지 등록

    useEffect(() => {
        // setMemDataOneD(data)     // data를 넣었을 때 어떤 값이 들어오든 바로 set진행?
        setMemDataOneD({
            ...data
        })
    }, [data])

    // Member => text,radio 타입 input 태그 ,select 태그 value 값 제어
    const memDataChange = useCallback((event) => {
        memDataOneD[event.target.name] = event.target.value;
        setMemDataOneD({ ...memDataOneD });
    }, [memDataOneD]);

    // 2. Edu Entity DB :  가져온 멤버 한명의 학력 데이터를 사용하기 위해 useState에 저장
    const [eduDataOneD, setEduMemOneD] = useState({});
    useEffect(() => {
        setEduMemOneD({
            ...eduData
            // 기본적으로 memSerial이랑 memName을 가지게 해주면댄다...!! 
            // 아래에서 함수 내 인자로 전달할 필요가 없음
            // , memSerial: data.memSerial
            // , memName: data.memName
        })
    }, [eduData])
    // console.log(data);

    // Edu => text,radio 타입 input 태그 ,select 태그 value 값 제어
    const eduDataChange = useCallback((event) => {
        eduDataOneD[event.target.name] = event.target.value;
        setEduMemOneD({
            ...eduDataOneD
        });
    }, [eduDataOneD]);
    console.log(eduDataOneD);

    //== CRUD ===============================================

    // INSERT UPDATE 기능 요청 : 선택한 DB 추가,업데이트
    function saveData(data, endpoint) {
        if (!data) {
            console.error('데이터가 유효하지 않습니다.');
            return;
        }
        // if (mem_dtls_inp_ck(memDataOneD)) {
        apiCall(endpoint, 'POST', data)
            .then((response) => {
                saveImg();
                console.log("넘어오는 데이터 확인");
                console.log(response.data);

                // 멤버리스트 상태값 변화 감지 후 리스트 재업데이트
                // 변화 감지 후 리스트 리렌더링
                setMemListUpdate(!memListUpdate);
            }).catch((err) => {
                // alert("요청 실패");
                console.error(err);
            });
        // }

        console.log(memDataOneD);
        console.log(eduDataOneD);   // memSerial , 이름 필요
    }

    const saveMemData = () => {
        // 요청 두번가기때문에..필수입력사항 입력할 때인 memDataOneD에서 유효성 검사 진행
        if (mem_dtls_inp_ck(memDataOneD)) {

            saveData(memDataOneD, '/mem/memInesert');
        }
    }

    const saveEduData = () => {
        if (memDataOneD.memSerial) {
            console.log("들어오낭" + memDataOneD.memSerial);
            saveData({
                ...eduDataOneD,
                // 데이터를 선택해서 입력하는경우도 있지만, 인풋에 값을 넣는 경우도 있으니까
                // 위의 data에서가 아닌 memDataOneD의 시리얼 값을 가져와줘야한다.
                memSerial: memDataOneD.memSerial,
                memName: memDataOneD.memName
            }, '/mem/memEduInesert');
        }
    }

    // 입력 데이터 수정 콘솔 확인용
    // console.log(memDataOneD);
    // console.log(eduDataOneD);

    function deleteDataByMemserial() {
        if (memDataOneD.memSerial && window.confirm("해당 아동을 삭제하시겠습니까?")) {
            // apiCall('/member/memDelete', 'POST', { params: { memSerial: memDataOneD.memSerial } })
            apiCall('/mem/memDelete', 'POST', { memSerial: memDataOneD.memSerial })
                .then((memResponse) => {
                    setData({});    // 부모로부터 전달받은 setMemDataOne 실행하여 빈객체 삽입
                    console.log(memResponse.data);

                    // 멤버리스트 상태값 변화 감지 후 리스트 재업데이트
                    setMemListUpdate(!memListUpdate);
                }).catch((err) => {
                    console.log(err);
                });

            apiCall('/mem/eduDelete', 'POST', { memSerial: memDataOneD.memSerial })
                .then((eduResponse) => {
                    // setData({});    // 부모로부터 전달받은 setMemDataOne 실행하여 빈객체 삽입
                    console.log(eduResponse.data);

                    // 멤버리스트 상태값 변화 감지 후 리스트 재업데이트
                    setMemListUpdate(!memListUpdate);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    // 비밀번호 초기화
    function resetPswrd() {
        if (window.confirm("정말로 초기화 하시겠습니까?(되돌릴 수 없습니다.)"))

            console.log(memDataOneD.memSerial);
        apiCall('/mem/resetPw', 'GET', { memSerial: memDataOneD.memSerial })
            .then((response) => {
                alert("초기화 성공")
                // console.log(response.data)   // return message하는중
            })
            .catch((error) => {
                alert("초기화 실패")
                console.log(error);
            })
    }

    // 이미지 등록
    function saveImg() {
        if (memImage.current.files[0]) {
            console.log(memImage.current.files[0]);
            // prgImage.current.files[0].name = "programImg.png"
            let formData = new FormData();
            formData.append("memImg", memImage.current.files[0]);
            formData.append("memSerial", memDataOneD.memSerial);

            apiCall('/mem/imgUpload', 'POST', formData, null)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    alert("서버 통신 에러로 요청에 실패했습니다.");
                })
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
                        <option value='여'>여성</option>
                        <option value='남'>남성</option>
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
                    <PostCode
                        // onAddressChange={handleAddressChange} onZipcodeChange={handleZipcodeChange} 
                        setMemDataOneD={setMemDataOneD} memDataOneD={memDataOneD} />
                    {/* 우편번호 zipcode 값 변화 시 입력 */}
                    <input type="text"
                        value={memDataOneD.memZipCode || ""}
                        onChange={memDataChange} readOnly />
                </div>


                <div>주소</div>
                <div className='mem_address1'>
                    {/* 도로명주소 address 값 변화 시 입력 */}
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

                <div>이미지</div>
                <div><input ref={memImage} type='file'></input></div>
                
                <div></div>
                <div></div>
                
                <div></div>
                <div></div>
                
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
                    <button type="reset" onClick={() => { setData({}); setEduDataOne({}) }}>입력취소</button>
                    <button type="submit" value='신규등록' onClick={() => { saveMemData(); saveEduData(); }}>등록 및 수정</button>
                    {/* <button type="reset" onClick={resutData}>입력취소</button> */}
                    {/* <button type="submit" value='삭제' onClick={() => { deleteMemByMemserial(); deleteEduByMemserial(); }}>삭제</button> */}
                    <button type="submit" value='삭제' onClick={() => { deleteDataByMemserial(); }}>삭제</button>
                    {/* <button type="submit" value='업데이트' >업데이트</button> */}
                    <button type="submit" value='pw초기화' onClick={() => resetPswrd()} >PW초기화</button>
                </div>
            </div>
        </div >
        // </form >
    )

}

export default MemberDetail;