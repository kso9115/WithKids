import './programDetails.css'

function ProgramDetails() {


    return (
        <div style={{
            height: '-webkit-calc(100% - 30px)'
        }}>
            <b>프로그램 기본정보</b>
            <div className='gridBox'>
                <div><span>*</span>사업대분류</div>
                <div><input type="text" /></div>

                <div><span>*</span>사업중분류</div>
                <div><input type="text" /></div>

                <div><span>*</span>사업소분류</div>
                <div><input type="text" /></div>

                <div><span>*</span>프로그램 구분</div>
                <div className='radioBox'>
                    <div>
                        <input type="radio" id='interior' name='type' value='내부형프로그램' checked />
                        <label for='interior'>내부형프로그램</label>
                    </div>
                    <div>
                        <input type="radio" id='application' name='type' value='신청형프로그램' />
                        <label for='application'>신청형프로그램</label>
                    </div>
                </div>

                <div><span>*</span>프로그램명</div>
                <div><input type="text" /></div>

                <div>서비스분류</div>
                <div><input type="text" /></div>

                <div><span>*</span>프로그램 기간</div>
                <div><input type="date" /> ~ <input type="date" /></div>

                <div><span>*</span>담당자</div>
                <div><input type="text" /></div>

                <div><span>*</span>담당자 전화번호</div>
                <div><input type="tel" /></div>

                <div><span>*</span>담당자 이메일</div>
                <div><input type="email" /></div>

                <div><span>*</span>지원횟수</div>
                <div><input type="text" /></div>

                <div><span>*</span>사용여부</div>
                <div className='radioBox'>
                    <div><input type="radio" id='yes' name='select' value='Y' checked /><label for='yes'>Y</label></div>
                    <div><input type="radio" id='no' name='select' value='N' /><label for='no'>N</label></div>
                </div>

            </div>
            <b>예산, 비용, 인원 정보 </b>
            <div className='gridBox2'>
                <div>예산집행여부</div>
                <div className='radioBox'>
                    <div><input type="radio" id='execution' name='BudgetExecution' value='집행' checked /><label for='execution'>집행</label></div>
                    <div><input type="radio" id='nonexecution' name='BudgetExecution' value='미집행' /><label for='nonexecution'>미집행</label></div>
                </div>

                <div>예산금액</div>
                <div><input type="text" />(원)</div>

                <div>이용계약체결</div>
                <div className='radioBox'>
                    <div><input type="radio" id='Concluded' name='contractConcluded' value='체결' checked /><label for='Concluded'>체결</label></div>
                    <div><input type="radio" id='notConcluded' name='contractConcluded' value='미체결' /><label for='notConcluded'>미체결</label></div>
                </div>

                <div><span>*</span>비용구분</div>
                <div><input type="text" /></div>

                <div>프로그램요금</div>
                <div><input type="text" />(원)</div>

                <div></div>
                <div></div>

                <div><span>*</span>계획인원(정원)</div>
                <div><input type="text" />(명)</div>

                <div>대기자등록</div>
                <div className='radioBox'>
                    <div><input type="radio" id='possible' name='waiting' value='가능' checked /><label for='possible'>가능</label></div>
                    <div><input type="radio" id='impossible' name='waiting' value='불가능' /><label for='impossible'>불가능</label></div>
                </div>

                <div></div>
                <div></div>
            </div>
            <b>프로그램 대상기준(대상자 요건 및 자격)</b>
            <div className='gridBox3'>
                
                <div><span>*</span>가구유형</div>
                <div className='checkBox'>
                    <div>
                        <input type="checkbox" id='none' name='familyType ' />
                        <label for='none'>해당없음</label>
                    </div>
                    <div>
                        <input type="checkbox" id='singleParent' name='familyType' />
                        <label for='singleParent'>한부모</label>
                    </div>
                    <div>
                        <input type="checkbox" id='multicultural' name='familyType' />
                        <label for='multicultural'>다문화</label>
                    </div>
                    <div>
                        <input type="checkbox" id='grandson' name='familyType' />
                        <label for='grandson'>조손</label>
                    </div>
                    <div>
                        <input type="checkbox" id='defector' name='familyType' />
                        <label for='defector'>새터민</label>
                    </div>
                    <div>
                        <input type="checkbox" id='BnG_hoh' name='familyType' />
                        <label for='BnG_hoh'>소년소녀가장</label>
                    </div>
                    <div>
                        <input type="checkbox" id='etc' name='familyType' />
                        <label for='etc'>독거노인</label>
                    </div>
                </div>

                <div><span>*</span>소득구분</div>
                <div>
                    <div>
                        <input type="checkbox" id='general' name='incmClsfc' />
                        <label for='general'>일반</label>
                    </div>
                    <div>
                        <input type="checkbox" id='beneficiary ' name='incmClsfc' />
                        <label for='beneficiary'>수급자</label>
                    </div>
                    <div>
                        <input type="checkbox" id='nearPoverty' name='incmClsfc' />
                        <label for='nearPoverty'>차상위</label>
                    </div>
                    <div>
                        <input type="checkbox" id='none' name='incmClsfc' />
                        <label for='none'>저소득</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramDetails;