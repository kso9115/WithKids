import './Member_admission.css';
import { useState, useEffect } from 'react';

function Member_addission(admMemOne){
    // AdmLvng_Manager에서 admMemOne={admMemOne}를 넘겨 받은 것을 다시, useState하여 이 부분만 랜더링 할 수 있게 함.
    const[admMemOneD,SetAdmMemOneD]=useState({});

    useEffect(() => {
        SetAdmMemOneD({
            ...admMemOne
        })
    }, [admMemOne])
    console.log(admMemOneD);




    
    return (
        <form action="" method="get">
            <div style={{color:'black',fontWeight:'bold'}}>입소/이용 정보</div>
            <div className="adgridBox admissionBox">
                <div><span style={{color:"red"}}>*</span>입소/이용일자</div>
                <div><input type="date" /></div>
                
                <div><span style={{color:"red"}}>*</span>입소/이용유형</div>
                <div><select name="admission_type">
                        <option value="secondHighest">차상위 계층</option>
                        <option value='bsLivingSecurity'>국민기초생활보장수급자</option>
                        <option value='SpecialCare'>돌봄특례 아동</option>
                        <option value='eduExpensesSup'>초중고 교육비지원대상자</option>
                        <option value='multiChildren'>일반아동,다자녀 가족</option>
                        <option value='eduBenefitTarget'>교육급여대상가정 아동</option>
                        <option value='singleParent'>한부모 가족 아동</option>
                    </select>
                </div>
                
                <div><span style={{color:"red"}}>*</span>입소/이용자격</div>
                <div>
                    <select name="admission_qualification">
                        <option value="free">무료</option>
                        <option value='pay'>유료</option>
                    </select>    
                </div>
                 
                <div><span></span>전입여부</div>
                <div><input type="checkbox" /></div>

                <div></div><div></div>
                <div></div><div></div>

                <div><span></span>이전시설명</div>
                <div><input type="text" /></div>
               
                <div><span></span>이전시설입소일자</div>
                <div><input type="date" /></div>

                <div><span></span>이전시설퇴소일자</div>
                <div><input type="date" /></div>
               
                <div><span style={{color:"red"}}>*</span>입소/이용사유</div>
                <div><select name="admission_rs">
                        <option value="dualIncome">맞벌이 부모</option>
                        <option value='multiculture'>다문화가정</option>
                        <option value='withsibling'>형제,자매가 재원중</option>
                        <option value='threeormore'>자녀가 3명이상</option>
                        <option value='unrelatedps'>무연고자</option>
                        <option value='grandParents'>조부모 돌봄</option>
                        <option value='singleParent'>한부모 가족 아동</option>
                    </select>
                </div>
                
                <div><span></span>입소/이용사유내용</div>
                <div><input type="text" /></div>

                <div></div><div></div>
                
                <div><span></span>입소/이용시작시간</div>
                <div><input type="time" /><span style={{fontSize:10}}>(예시:13:00)</span></div>
                
                <div><span style={{color:"red"}}>*</span>프로그램</div>
                <div><select name="program">
                        <option value="internal">내부 프로그램</option>
                        <option value='external'>신청형 프로그램</option>
                    </select></div>

                <div><span></span>담당자 성명</div>
                <div><input type="text" /></div>
                
            </div>
            <br></br>
            <div style={{color:'black',fontWeight:'bold'}}>입소/이용 상황 및 경위</div>
            <div className="adgridBox2">
                <div><span></span>입소/이용상황</div>
                <div><textarea></textarea></div>

                <div><span></span>입소/이용경위</div>
                <div><textarea></textarea></div>
            </div>   

            <div className='buttonBox'>
                <div>
                    <button type="reset">입력취소</button>
                    <button type="submit" value='삭제' formaction="/admission/delete">삭제</button>
                    <button type="submit" value='신규' formaction="/admission/insert">신규</button>
                    <button type="submit" value='저장' formaction="/admission/update">저장</button>
                </div>
            </div>
        </form>
          
    );
}
export default Member_addission;