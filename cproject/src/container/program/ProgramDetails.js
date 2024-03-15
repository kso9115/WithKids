import './programDetails.css'

function ProgramDetails() {
    let submitBool = false;

    function prg_essential(event) {
        let esntl_text = document.querySelectorAll('.esntl_text');
        let esntl_radio = document.querySelectorAll('.esntl_radio');
        let esntl_f_typ = document.querySelectorAll('.esntl_f_typ');
        let esntl_cls_inc = document.querySelectorAll('.esntl_cls_inc');

        console.log(esntl_text);
        console.log(esntl_radio);
        console.log(esntl_f_typ);
        console.log(esntl_cls_inc);

        // input type = text 유효성 검사
        for (let i = 0; i < esntl_text.length; i++) {
            console.log(esntl_text[i].value);
            if (esntl_text[i].value === '') {
                esntl_text[i].focus();
                event.preventDefault();
                return;
            }
        }

        // input type = radio 유효성 검사
        for (let i = 0; i < esntl_radio.length; i=i+2) {
            if (!esntl_radio[i].value && !esntl_radio[i + 1].value) {
                esntl_radio[i].focus();
                event.preventDefault()
                return ;
            };
        }

        // 가구유형 체크박스 유효성 검사
        let f_typ_count = 0;
        esntl_f_typ.forEach((e) => {
            console.log(e.checked);
            if (e.checked === true) {
                f_typ_count++;
            }
        })
        if (f_typ_count === 0) {
            esntl_f_typ[0].focus();
            event.preventDefault()
            return;
        }

        // 소득구분 체크박스 유효성 검사
        let cls_inc_count = 0;
        esntl_cls_inc.forEach((e) => {
            console.log(e.checked);
            if (e.checked === true) cls_inc_count++;
        })
        if (cls_inc_count === 0) {
            cls_inc_count[0].focus();
            event.preventDefault()
            return;
        }
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
                    <div><input className='esntl_text' type="text" name='prg_big_cls' /></div>

                    <div><span>*</span>사업 중분류</div>
                    <div><input className='esntl_text' type="text" name='prg_mid_cls' /></div>

                    <div><span>*</span>사업 소분류</div>
                    <div><input className='esntl_text' type="text" name='prg_sub_cls' /></div>

                    <div><span>*</span>프로그램 구분</div>
                    <div className='prg_dtl_radioBox'>
                        <div>
                            <input className='esntl_radio' type="radio" id='interior' name='prg_cls' value='내부형프로그램' />
                            <label for='interior'>내부형프로그램</label>
                        </div>
                        <div>
                            <input className='esntl_radio' type="radio" id='application' name='prg_cls' value='신청형프로그램' />
                            <label for='application'>신청형프로그램</label>
                        </div>
                    </div>

                    <div><span>*</span>프로그램명</div>
                    <div><input className='essential esntl_text' type="text" name='prg_nm' /></div>

                    <div>서비스 분류</div>
                    <div><input type="text" name='prg_svc' /></div>

                    <div><span>*</span>프로그램 기간</div>
                    <div><input className='esntl_text' type="date" name='prg_str' /> ~ <input type="date" name='prg_end' /></div>

                    <div><span>*</span>담당자</div>
                    <div><input className='esntl_text' type="text" name='prg_mngr' /></div>

                    <div><span>*</span>담당자 전화번호</div>
                    <div>
                        <select className='prg_dtl_select'>
                            <option value="010" key="010">010</option>
                            <option value="011" key="011">011</option>
                            <option value="016" key="016">016</option>
                            <option value="017" key="017">017</option>
                            <option value="019" key="019">019</option>
                        </select>&nbsp;-&nbsp;
                        {/* <input className='esntl_text' type="tel" name='prg_mngr_phnn1' />&nbsp;-&nbsp; */}
                        <input className='esntl_text' type="tel" name='prg_mngr_phnn2' maxlength='4' />&nbsp;-&nbsp;
                        <input className='esntl_text' type="tel" name='prg_mngr_phnn3' maxlength='4' />
                    </div>

                    <div><span>*</span>담당자 이메일</div>
                    <div><input className='esntl_text' type="email" name='prg_mngr_eml' /></div>

                    <div><span>*</span>지원횟수</div>
                    <div><input className='esntl_text' type="text" name='prg_nmb_api' /></div>

                    <div><span>*</span>사용여부</div>
                    <div className='prg_dtl_radioBox'>
                        <div><input className='esntl_radio' type="radio" id='yes' name='prg_use' value='Y' /><label for='yes'>Y</label></div>
                        <div><input className='esntl_radio' type="radio" id='no' name='prg_use' value='N' /><label for='no'>N</label></div>
                    </div>

                </div>
                <b>예산, 비용, 인원 정보 </b>
                <div className='prg_dtl_gridBox2'>
                    <div>예산집행여부</div>
                    <div className='radioBox'>
                        <div><input type="radio" id='execution' name='bdg_exc' value='집행' checked /><label for='execution'>집행</label></div>
                        <div><input type="radio" id='nonexecution' name='bdg_exc' value='미집행' /><label for='nonexecution'>미집행</label></div>
                    </div>

                    <div>예산금액</div>
                    <div><input className='text_align' type="text" name='bdg_amt' />&nbsp;(원)</div>

                    <div>이용계약체결</div>
                    <div className='prg_dtl_radioBox'>
                        <div><input type="radio" id='Concluded' name='sgnn_cntr' value='체결' checked /><label for='Concluded'>체결</label></div>
                        <div><input type="radio" id='notConcluded' name='sgnn_cntr' value='미체결' /><label for='notConcluded'>미체결</label></div>
                    </div>

                    <div><span>*</span>비용구분</div>
                    <div className='prg_dtl_selectBox'>
                        <select className='esntl_text' name='cost_clsfc'>
                            <option value="무료" key="">무료</option>
                            <option value="유료" key="">유료</option>
                        </select>
                    </div>

                    <div>프로그램요금</div>
                    <div><input className='text_align' type="text" name='prg_fee' />&nbsp;(원)</div>

                    <div></div>
                    <div></div>

                    <div><span>*</span>계획인원(정원)</div>
                    <div><input className='text_align esntl_text' type="text" name='pln_nmb_ppl' />&nbsp;(명)</div>

                    <div>대기자등록</div>
                    <div className='prg_dtl_radioBox'>
                        <div><input type="radio" id='possible' name='wtl_rgs' value='가능' checked /><label for='possible'>가능</label></div>
                        <div><input type="radio" id='impossible' name='wtl_rgs' value='불가능' /><label for='impossible'>불가능</label></div>
                    </div>

                    <div></div>
                    <div></div>
                </div>
                <b>프로그램 대상기준(대상자 요건 및 자격)</b>
                <div className='prg_dtl_gridBox3'>

                    <div><span>*</span>가구유형</div>
                    <div className='prg_dtl_checkBox'>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='none' name='f_typ' />
                            <label for='none'>해당없음</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='singleParent' name='f_typ' />
                            <label for='singleParent'>한부모</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='multicultural' name='f_typ' />
                            <label for='multicultural'>다문화</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='grandson' name='f_typ' />
                            <label for='grandson'>조손</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='defector' name='f_typ' />
                            <label for='defector'>새터민</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='BnG_hoh' name='f_typ' />
                            <label for='BnG_hoh'>소년소녀가장</label>
                        </div>
                        <div>
                            <input className='esntl_f_typ' type="checkbox" id='etc' name='f_typ' />
                            <label for='etc'>독거노인</label>
                        </div>
                    </div>

                    <div><span>*</span>소득구분</div>
                    <div>
                        <div>
                            <input className='esntl_cls_inc' type="checkbox" id='general' name='cls_inc' />
                            <label for='general'>일반</label>
                        </div>
                        <div>
                            <input className='esntl_cls_inc' type="checkbox" id='beneficiary ' name='cls_inc' />
                            <label for='beneficiary'>수급자</label>
                        </div>
                        <div>
                            <input className='esntl_cls_inc' type="checkbox" id='nearPoverty' name='cls_inc' />
                            <label for='nearPoverty'>차상위</label>
                        </div>
                        <div>
                            <input className='esntl_cls_inc' type="checkbox" id='none' name='cls_inc' />
                            <label for='none'>저소득</label>
                        </div>
                    </div>
                </div>
                <div className='buttonBox'>
                    <div>
                        <button type="reset">입력취소</button>
                        <button type="submit" value='삭제' formaction="/program/delete" onClick={(event) => prg_essential(event)} >삭제</button>
                        <button type="submit" value='신규' formaction="/program/insert">신규</button>
                        <button type="submit" value='저장' formaction="/program/update">저장</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default ProgramDetails;