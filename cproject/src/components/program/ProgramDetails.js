import { useState, useEffect, useCallback } from 'react';
import './programDetails.css'
import { prg_dtls_inp_ck } from '../../hooks/inputCheck/programInputCheck'
import axios from "axios";

function ProgramDetails({ data }) {
    const [prgDataOneD, setPrgDataOneD] = useState(data);
    useEffect(() => {
        setPrgDataOneD({
            ...data,
            prgNmbApiSub: data.prgNmbApi ? data.prgNmbApi.substr(0, 1) : null,
            prgNmbApi: data.prgNmbApi ? data.prgNmbApi.substr(1) : null,
        })
    }, [data])
    // console.log(prgDataOneD);

    function CheckBoxTrue(array, str) {
        if (!!array && array.has(str)) return true;
        else return false;
    }

    const prgdChange = useCallback((event) => {
        prgDataOneD[event.target.name] = event.target.value;
        setPrgDataOneD({ ...prgDataOneD });
    }, [prgDataOneD]);

    const prgdCkChange = useCallback((event) => {
        const set = new Set(prgDataOneD[event.target.name]);
        if (event.target.checked) {
            set.add(event.target.id);
        } else {
            set.delete(event.target.id);
        }
        prgDataOneD[event.target.name] = set;
        setPrgDataOneD({ ...prgDataOneD });
    }, [prgDataOneD]);

    // function timeTest() {
    //     const date = new Date();
    //     const hours = String(date.getHours()).padStart(2, "0");
    //     const minutes = String(date.getMinutes()).padStart(2, "0");
    //     const seconds = String(date.getSeconds()).padStart(2, "0");

    //     console.log(hours + minutes + seconds);
    // }

    function resetData() {
        setPrgDataOneD({});
    }

    function deleteData(event) {

        // event.preventDefault();
    }

    function insertData(event) {
        const clsInc = [...prgDataOneD.clsInc].join(' ');
        const ffTyp = [...prgDataOneD.ffTyp].join(' ');
        if (prg_dtls_inp_ck(prgDataOneD)) {
            axios.post("/api/prg/prgInsert", null, {
                params: {
                    ...prgDataOneD,
                    clsInc,
                    ffTyp
                }
            })
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                    alert("신규 요청에 실패했습니다.")
                }).then(function () {
                    // 항상 실행
                });
        } else alert('취소하셨습니다.')

        // event.preventDefault();
    }

    function updateData(event) {

        // event.preventDefault();
    }

    return (
        <div style={{
            height: '100%'
        }}>
            {/* <form style={{
                height: '100%'
            }} method='get'> */}
            <b>프로그램 기본정보</b>
            <div className='prg_dtl_gridBox'>
                <div><span>*</span>사업 대분류</div>
                <div><input type="text" id='prgBigCls' name='prgBigCls' value={prgDataOneD.prgBigCls} onChange={prgdChange} /></div>

                <div><span>*</span>사업 중분류</div>
                <div><input type="text" id='prgMidCls' name='prgMidCls' value={prgDataOneD.prgMidCls} onChange={prgdChange} /></div>

                <div><span>*</span>사업 소분류</div>
                <div><input type="text" id='prgSubCls' name='prgSubCls' value={prgDataOneD.prgSubCls} onChange={prgdChange} /></div>

                <div><span>*</span>프로그램 구분</div>
                <div className='prg_dtl_radioBox'>
                    <div>
                        <input type="radio" id='prgCls' name='prgCls' value='내부형프로그램'
                            checked={prgDataOneD.prgCls === '내부형프로그램'} onChange={prgdChange} />
                        <label htmlFor='interior'>내부형프로그램</label>
                    </div>
                    <div>
                        <input type="radio" id='prgCls2' name='prgCls' value='신청형프로그램'
                            checked={prgDataOneD.prgCls === '신청형프로그램'} onChange={prgdChange} />
                        <label htmlFor='prgCls2'>신청형프로그램</label>
                    </div>
                </div>

                <div><span>*</span>프로그램명</div>
                <div><input type="text" id='prgNm' name='prgNm' value={prgDataOneD.prgNm} onChange={prgdChange} /></div>

                <div>서비스 분류</div>
                <div><input type="text" id='prgSvc' name='prgSvc' value={prgDataOneD.prgSvc} /></div>

                <div><span>*</span>프로그램 기간</div>
                <div><input id='prgStr' type="date" name='prgStr' value={prgDataOneD.prgStr} onChange={prgdChange} /> ~
                    <input id='prgEnd' type="date" name='prgEnd' value={prgDataOneD.prgEnd} onChange={prgdChange} /></div>

                <div><span>*</span>담당자</div>
                <div><input id='prgMngr' type="text" name='prgMngr' value={prgDataOneD.prgMngr} onChange={prgdChange} /></div>

                <div><span>*</span>담당자 전화번호</div>
                <div><input id='prgMngrPhnn' type="tel" name='prgMngrPhnn' value={prgDataOneD.prgMngrPhnn} onChange={prgdChange} /></div>

                <div><span>*</span>담당자 이메일</div>
                <div><input id='prgMngrEml' type="email" name='prgMngrEml' value={prgDataOneD.prgMngrEml} onChange={prgdChange} /></div>

                <div><span>*</span>지원횟수</div>
                <div>
                    <select id='prgNmbApiSub' name='prgNmbApiSub' value={prgDataOneD.prgNmbApiSub} onChange={prgdChange}>
                        <option value="주" key="주" >주</option>
                        <option value="월" key="월" >월</option>
                        <option value="년" key="년" >년</option>
                    </select>&nbsp;
                    <input id='prgNmbApi' type="text" name='prgNmbApi' value={prgDataOneD.prgNmbApi} onChange={prgdChange} />
                </div>

                <div><span>*</span>사용여부</div>
                <div className='prg_dtl_radioBox'>
                    <div>
                        <input id='prgUse' type="radio" name='prgUse' value='Y'
                            checked={prgDataOneD.prgUse === 1} onChange={prgdChange} />
                        <label htmlFor='yes'>Y</label>
                    </div>
                    <div>
                        <input id='prgUse2' type="radio" name='prgUse' value='N'
                            checked={prgDataOneD.prgUse === 0} onChange={prgdChange} />
                        <label htmlFor='prgUse2'>N</label>
                    </div>
                </div>

            </div>

            <b>예산, 비용, 인원 정보 </b>
            <div className='prg_dtl_gridBox2'>
                <div>예산집행여부</div>
                <div className='prg_dtl_radioBox'>
                    <div>
                        <input type="radio" id='bdgExc' name='bdgExc' value='집행'
                            checked={prgDataOneD.bdgExc === 1} onChange={prgdChange} />
                        <label htmlFor='bdgExc'>집행</label>
                    </div>
                    <div>
                        <input type="radio" id='bdgExc2' name='bdgExc' value='미집행'
                            checked={prgDataOneD.bdgExc === 0} onChange={prgdChange} />
                        <label htmlFor='bdgExc2'>미집행</label>
                    </div>
                </div>

                <div>예산금액</div>
                <div><input id='bdgAmt' type="text" name='bdgAmt' value={prgDataOneD.bdgAmt} onChange={prgdChange} />&nbsp;(원)</div>

                <div>이용계약체결</div>
                <div className='prg_dtl_radioBox'>
                    <div>
                        <input type="radio" id='sgnnCntr' name='sgnnCntr' value='체결'
                            checked={prgDataOneD.sgnnCntr === 1} onChange={prgdChange} />
                        <label htmlFor='sgnnCntr'>체결</label>
                    </div>
                    <div>
                        <input type="radio" id='sgnnCntr2' name='sgnnCntr' value='미체결'
                            checked={prgDataOneD.sgnnCntr === 0} onChange={prgdChange} />
                        <label htmlFor='sgnnCntr2'>미체결</label>
                    </div>
                </div>

                <div><span>*</span>비용구분</div>
                <div className='prg_dtl_selectBox'>
                    <select id='costClsfc' name='costClsfc' value={prgDataOneD.costClsfc} onChange={prgdChange}>
                        <option value={null} key="none" ></option>
                        <option value="무료" key="무료" >무료</option>
                        <option value="유료" key="유료" >유료</option>
                    </select>
                </div>

                <div>프로그램요금</div>
                <div><input id='prgFee' type="text" name='prgFee' value={prgDataOneD.prgFee} onChange={prgdChange} />&nbsp;(원)</div>

                <div></div>
                <div></div>

                <div><span>*</span>계획인원(정원)</div>
                <div><input id='plnNmbPpl' type="text" name='plnNmbPpl' value={prgDataOneD.plnNmbPpl} onChange={prgdChange} />&nbsp;(명)</div>

                <div>대기자등록</div>
                <div className='prg_dtl_radioBox'>
                    <div>
                        <input type="radio" id='wtlRgs' name='wtlRgs' value='가능'
                            checked={prgDataOneD.wtlRgs === 1} onChange={prgdChange} />
                        <label htmlFor='wtlRgs'>가능</label>
                    </div>
                    <div>
                        <input type="radio" id='wtlRgs2' name='wtlRgs' value='불가능'
                            checked={prgDataOneD.wtlRgs === 0} onChange={prgdChange} />
                        <label htmlFor='wtlRgs2'>불가능</label>
                    </div>
                </div>

                <div></div>
                <div></div>
            </div>
            <b>프로그램 대상기준(대상자 요건 및 자격)</b>
            <div className='prg_dtl_gridBox3'>

                <div><span>*</span>가구유형</div>
                <div className='prg_dtl_checkBox'>
                    <div>
                        <input className='esntl_f_typ' type="checkbox" id='ffTyp' name='ffTyp'
                            checked={CheckBoxTrue(prgDataOneD.ffTyp, '해당없음')} onChange={prgdCkChange} />
                        <label htmlFor='ffTyp'>해당없음</label>
                    </div>
                    <div>
                        <input className='esntl_f_typ' type="checkbox" id='한부모' name='ffTyp'
                            checked={CheckBoxTrue(prgDataOneD.ffTyp, '한부모')} onChange={prgdCkChange} />
                        <label htmlFor='한부모'>한부모</label>
                    </div>
                    <div>
                        <input className='esntl_f_typ' type="checkbox" id='다문화' name='ffTyp'
                            checked={CheckBoxTrue(prgDataOneD.ffTyp, '다문화')} onChange={prgdCkChange} />
                        <label htmlFor='다문화'>다문화</label>
                    </div>
                    <div>
                        <input className='esntl_f_typ' type="checkbox" id='조손' name='ffTyp'
                            checked={CheckBoxTrue(prgDataOneD.ffTyp, '조손')} onChange={prgdCkChange} />
                        <label htmlFor='조손'>조손</label>
                    </div>
                    <div>
                        <input className='esntl_f_typ' type="checkbox" id='새터민' name='ffTyp'
                            checked={CheckBoxTrue(prgDataOneD.ffTyp, '새터민')} onChange={prgdCkChange} />
                        <label htmlFor='새터민'>새터민</label>
                    </div>
                    <div>
                        <input className='esntl_f_typ' type="checkbox" id='소년소녀가장' name='ffTyp'
                            checked={CheckBoxTrue(prgDataOneD.ffTyp, '소년소녀가장')} onChange={prgdCkChange} />
                        <label htmlFor='소년소녀가장'>소년소녀가장</label>
                    </div>
                    <div>
                        <input className='esntl_f_typ' type="checkbox" id='독거노인' name='ffTyp'
                            checked={CheckBoxTrue(prgDataOneD.ffTyp, '독거노인')} onChange={prgdCkChange} />
                        <label htmlFor='독거노인'>독거노인</label>
                    </div>
                </div>

                <div><span>*</span>소득구분</div>
                <div>
                    <div>
                        <input className='esntl_cls_inc' type="checkbox" id='clsInc' name='clsInc'
                            checked={CheckBoxTrue(prgDataOneD.clsInc, '일반')} onChange={prgdCkChange} />
                        <label htmlFor='clsInc'>일반</label>
                    </div>
                    <div>
                        <input className='esntl_cls_inc' type="checkbox" id='수급자' name='clsInc'
                            checked={CheckBoxTrue(prgDataOneD.clsInc, '수급자')} onChange={prgdCkChange} />
                        <label htmlFor='수급자'>수급자</label>
                    </div>
                    <div>
                        <input className='esntl_cls_inc' type="checkbox" id='차상위' name='clsInc'
                            checked={CheckBoxTrue(prgDataOneD.clsInc, '차상위')} onChange={prgdCkChange} />
                        <label htmlFor='차상위'>차상위</label>
                    </div>
                    <div>
                        <input className='esntl_cls_inc' type="checkbox" id='저소득' name='clsInc'
                            checked={CheckBoxTrue(prgDataOneD.clsInc, '저소득')} onChange={prgdCkChange} />
                        <label htmlFor='저소득'>저소득</label>
                    </div>
                </div>
            </div>
            <div className='buttonBox'>
                <div>
                    <button type="button" onClick={resetData}>입력취소</button>
                    <button type="button" value='삭제' onClick={deleteData}>삭제</button>
                    <button type="button" value='신규' onClick={insertData}>신규</button>
                    <button type="button" value='저장' onClick={updateData}>저장</button>
                    <button type="button" value='테스트' onClick={() => prg_dtls_inp_ck(prgDataOneD)}>테스트</button>

                    {/* <button type="submit" value='삭제' formAction="/api/prg/delete" onClick={(event) => deleteData(event)}>삭제</button>
                        <button type="submit" value='신규' formAction="/api/prg/insert" onClick={(event) => insertData(event)}>신규</button>
                        <button type="submit" value='저장' formAction="/api/prg/update" onClick={(event) => updateData(event)}>저장</button>
                        <button type="button" value='테스트' onClick={prg_essential}>테스트</button> */}
                </div>
            </div>
            {/* </form> */}

        </div>
    )
}

export default ProgramDetails;