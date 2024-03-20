import { useState, useEffect, useCallback } from 'react';
import './programDetails.css'

function ProgramDetails({ data }) {
    const [prgDataOneD, setPrgDataOneD] = useState(data);
    useEffect(() => {
        
        setPrgDataOneD({ ...data })
    }, [data])
    console.log("ProgramDetails");
    // function prg_essential(event) {
    //     let esntl_text = document.querySelectorAll('.esntl_text');
    //     let esntl_radio = document.querySelectorAll('.esntl_radio');
    //     let esntl_f_typ = document.querySelectorAll('.esntl_f_typ');
    //     let esntl_cls_inc = document.querySelectorAll('.esntl_cls_inc');

    //     console.log(esntl_text);
    //     console.log(esntl_radio);
    //     console.log(esntl_f_typ);
    //     console.log(esntl_cls_inc);

    //     // input type = text 유효성 검사
    //     for (let i = 0; i < esntl_text.length; i++) {
    //         console.log(esntl_text[i].value);
    //         if (esntl_text[i].value === '') {
    //             esntl_text[i].focus();
    //             event.preventDefault();
    //             return;
    //         }
    //     }

    //     // input type = radio 유효성 검사
    //     for (let i = 0; i < esntl_radio.length; i = i + 2) {
    //         if (!esntl_radio[i].value && !esntl_radio[i + 1].value) {
    //             esntl_radio[i].focus();
    //             event.preventDefault()
    //             return;
    //         };
    //     }

    //     // 가구유형 체크박스 유효성 검사
    //     let f_typ_count = 0;
    //     esntl_f_typ.forEach((e) => {
    //         console.log(e.checked);
    //         if (e.checked === true) {
    //             f_typ_count++;
    //         }
    //     })
    //     if (f_typ_count === 0) {
    //         esntl_f_typ[0].focus();
    //         event.preventDefault()
    //         return;
    //     }

    //     // 소득구분 체크박스 유효성 검사
    //     let cls_inc_count = 0;
    //     esntl_cls_inc.forEach((e) => {
    //         console.log(e.checked);
    //         if (e.checked === true) cls_inc_count++;
    //     })
    //     if (cls_inc_count === 0) {
    //         cls_inc_count[0].focus();
    //         event.preventDefault()
    //         return;
    //     }
    // }

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

    function timeTest() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        console.log(hours + minutes + seconds);
    }

    return (
        <div style={{
            height: '100%'
        }}>
            <form style={{
                height: '100%'
            }} method='get'>
                <b>프로그램 기본정보</b>
                <div className='prg_dtl_gridBox'>
                    <div><span>*</span>사업 대분류</div>
                    <div><input className='esntl_text' type="text" name='prg_big_cls' value={prgDataOneD.prg_big_cls} onChange={prgdChange} /></div>

                    <div><span>*</span>사업 중분류</div>
                    <div><input className='esntl_text' type="text" name='prg_mid_cls' value={prgDataOneD.prg_mid_cls} onChange={prgdChange} /></div>

                    <div><span>*</span>사업 소분류</div>
                    <div><input className='esntl_text' type="text" name='prg_sub_cls' value={prgDataOneD.prg_sub_cls} onChange={prgdChange} /></div>

                    <div><span>*</span>프로그램 구분</div>
                    <div className='prg_dtl_radioBox'>
                        <div>
                            <input className='esntl_radio' type="radio" id='interior' name='prg_cls' value='내부형프로그램'
                                defaultChecked={prgDataOneD.prg_cls === '내부형프로그램' ? true : false} onChange={prgdChange} />
                            <label htmlFor='interior'>내부형프로그램</label>
                        </div>
                        <div>
                            <input className='esntl_radio' type="radio" id='application' name='prg_cls' value='신청형프로그램'
                                defaultChecked={prgDataOneD.prg_cls !== '내부형프로그램' ? true : false} onChange={prgdChange} />
                            <label htmlFor='application'>신청형프로그램</label>
                        </div>
                    </div>

                    <div><span>*</span>프로그램명</div>
                    <div><input className='essential esntl_text' type="text" name='prg_nm' value={prgDataOneD.prg_nm} onChange={prgdChange} /></div>

                    <div>서비스 분류</div>
                    <div><input type="text" name='prg_svc' value={prgDataOneD.prg_svc} /></div>

                    <div><span>*</span>프로그램 기간</div>
                    <div><input className='esntl_text' type="date" name='prg_str' value={prgDataOneD.prg_str} onChange={prgdChange} /> ~
                        <input className='esntl_text' type="date" name='prg_end' value={prgDataOneD.prg_end} onChange={prgdChange} /></div>

                    <div><span>*</span>담당자</div>
                    <div><input className='esntl_text' type="text" name='prg_mngr' value={prgDataOneD.prg_mngr} onChange={prgdChange} /></div>

                    <div><span>*</span>담당자 전화번호</div>
                    <div><input className='esntl_text' type="tel" name='prg_mngr_phnn' value={prgDataOneD.prg_mngr_phnn} onChange={prgdChange} /></div>

                    <div><span>*</span>담당자 이메일</div>
                    <div><input className='esntl_text' type="email" name='prg_mngr_eml' value={prgDataOneD.prg_mngr_eml} onChange={prgdChange} /></div>

                    <div><span>*</span>지원횟수</div>
                    <div><input className='esntl_text' type="text" name='prg_nmb_api' value={prgDataOneD.prg_nmb_api} onChange={prgdChange} /></div>

                    <div><span>*</span>사용여부</div>
                    <div className='prg_dtl_radioBox'>
                        <div>
                            <input className='esntl_radio' type="radio" id='yes' name='prg_use' value='Y'
                                defaultChecked={prgDataOneD.prg_use === '1' ? true : false} onChange={prgdChange} />
                            <label htmlFor='yes'>Y</label>
                        </div>
                        <div>
                            <input className='esntl_radio' type="radio" id='no' name='prg_use' value='N'
                                defaultChecked={prgDataOneD.prg_use !== '1' ? true : false} onChange={prgdChange} />
                            <label htmlFor='no'>N</label>
                        </div>
                    </div>

                </div>
                
                <b>예산, 비용, 인원 정보 </b>
                <div className='prg_dtl_gridBox2'>
                    <div>예산집행여부</div>
                    <div className='radioBox'>
                        <div>
                            <input type="radio" id='execution' name='bdg_exc' value='집행'
                                defaultChecked={prgDataOneD.bdg_exc === '1' ? true : false} onChange={prgdChange} />
                            <label htmlFor='execution'>집행</label>
                        </div>
                        <div>
                            <input type="radio" id='nonexecution' name='bdg_exc' value='미집행'
                                defaultChecked={prgDataOneD.bdg_exc !== '1' ? true : false} onChange={prgdChange} />
                            <label htmlFor='nonexecution'>미집행</label>
                        </div>
                    </div>

                    <div>예산금액</div>
                    <div><input className='text_align' type="text" name='bdg_amt' value={prgDataOneD.bdg_amt} onChange={prgdChange} />&nbsp;(원)</div>

                    <div>이용계약체결</div>
                    <div className='prg_dtl_radioBox'>
                        <div>
                            <input type="radio" id='Concluded' name='sgnn_cntr' value='체결'
                                defaultChecked={prgDataOneD.sgnn_cntr === '1' ? true : false} onChange={prgdChange} />
                            <label htmlFor='Concluded'>체결</label>
                        </div>
                        <div>
                            <input type="radio" id='notConcluded' name='sgnn_cntr' value='미체결'
                                defaultChecked={prgDataOneD.sgnn_cntr !== '1' ? true : false} onChange={prgdChange} />
                            <label htmlFor='notConcluded'>미체결</label>
                        </div>
                    </div>

                    <div><span>*</span>비용구분</div>
                    <div className='prg_dtl_selectBox'>
                        <select className='esntl_text' name='cost_clsfc' value={prgDataOneD.cost_clsfc} onChange={prgdChange}>
                            <option value="무료" key="무료" >무료</option>
                            <option value="유료" key="유료" >유료</option>
                        </select>
                    </div>

                    <div>프로그램요금</div>
                    <div><input className='text_align' type="text" name='prg_fee' value={prgDataOneD.prg_fee} onChange={prgdChange} />&nbsp;(원)</div>

                    <div></div>
                    <div></div>

                    <div><span>*</span>계획인원(정원)</div>
                    <div><input className='text_align esntl_text' type="text" name='pln_nmb_ppl' value={prgDataOneD.pln_nmb_ppl} onChange={prgdChange} />&nbsp;(명)</div>

                    <div>대기자등록</div>
                    <div className='prg_dtl_radioBox'>
                        <div>
                            <input type="radio" id='possible' name='wtl_rgs' value='가능'
                                defaultChecked={prgDataOneD.wtl_rgs === '1' ? true : false} onChange={prgdChange} />
                            <label htmlFor='possible'>가능</label>
                        </div>
                        <div>
                            <input type="radio" id='impossible' name='wtl_rgs' value='불가능'
                                defaultChecked={prgDataOneD.wtl_rgs !== '1' ? true : false} onChange={prgdChange} />
                            <label htmlFor='impossible'>불가능</label>
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
                            <input className='esntl_f_typ' type="checkbox" id='해당없음' name='f_typ'
                                checked={CheckBoxTrue(prgDataOneD.f_typ, '해당없음')} onChange={prgdCkChange} />
                            <label htmlFor='해당없음'>해당없음</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='한부모' name='f_typ'
                                checked={CheckBoxTrue(prgDataOneD.f_typ, '한부모')} onChange={prgdCkChange} />
                            <label htmlFor='한부모'>한부모</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='다문화' name='f_typ'
                                checked={CheckBoxTrue(prgDataOneD.f_typ, '다문화')} onChange={prgdCkChange} />
                            <label htmlFor='다문화'>다문화</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='조손' name='f_typ'
                                checked={CheckBoxTrue(prgDataOneD.f_typ, '조손')} onChange={prgdCkChange} />
                            <label htmlFor='조손'>조손</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='새터민' name='f_typ'
                                checked={CheckBoxTrue(prgDataOneD.f_typ, '새터민')} onChange={prgdCkChange} />
                            <label htmlFor='새터민'>새터민</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='소년소녀가장' name='f_typ'
                                checked={CheckBoxTrue(prgDataOneD.f_typ, '소년소녀가장')} onChange={prgdCkChange}/>
                            <label htmlFor='소년소녀가장'>소년소녀가장</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='독거노인' name='f_typ'
                                checked={CheckBoxTrue(prgDataOneD.f_typ, '독거노인')} onChange={prgdCkChange}/>
                            <label htmlFor='독거노인'>독거노인</label>
                        </div>
                    </div>

                    <div><span>*</span>소득구분</div>
                    <div>
                        <div>
                            <input className='esntl_cls_inc' type="checkbox" id='일반' name='cls_inc'
                                checked={CheckBoxTrue(prgDataOneD.cls_inc, '일반')} onChange={prgdCkChange}/>
                            <label htmlFor='일반'>일반</label>
                        </div>
                        <div>
                            <input className='esntl_cls_inc' type="checkbox" id='수급자' name='cls_inc'
                                checked={CheckBoxTrue(prgDataOneD.cls_inc, '수급자')} onChange={prgdCkChange}/>
                            <label htmlFor='수급자'>수급자</label>
                        </div>
                        <div>
                            <input className='esntl_cls_inc' type="checkbox" id='차상위' name='cls_inc'
                                checked={CheckBoxTrue(prgDataOneD.cls_inc, '차상위')} onChange={prgdCkChange}/>
                            <label htmlFor='차상위'>차상위</label>
                        </div>
                        <div>
                            <input className='esntl_cls_inc' type="checkbox" id='저소득' name='cls_inc'
                                checked={CheckBoxTrue(prgDataOneD.cls_inc, '저소득')} onChange={prgdCkChange}/>
                            <label htmlFor='저소득'>저소득</label>
                        </div>
                    </div>
                </div>
                <div className='buttonBox'>
                    <div>
                        <button type="reset">입력취소</button>
                        <button type="submit" value='삭제' formAction="/program/delete"
                            // onClick={(event) => prg_essential(event)}
                        >삭제</button>
                        <button type="submit" value='신규' formAction="/program/insert">신규</button>
                        <button type="submit" value='저장' formAction="/program/update">저장</button>
                        <button type="button" value='테스트' onClick={timeTest}>테스트</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default ProgramDetails;