import './programDetailsPrg.css'
import React, { useState } from 'react';
import AttachedFile from '../../func/AttachedFile';

function MakeDiv({ e, i, detailsChange }) {
    return (<><div>{i + 1}</div><div onClick={()=> detailsChange(i)}>{e.title}</div><div>{e.content}</div></>);
}

function ProgramDetailsPrg({ data, subData }) {
    const [prgDetailData, setPrgDetailData] = useState({});
    function makeDiv() {
        if (Array.isArray(data) && data.length > 0) {
            // console.log(data);
            return data.map((e, i) => (<MakeDiv key={e.rec + e.prgDate + e.prgId} e={e} i={i} detailsChange={detailsChange}></MakeDiv>));
        } else {
            return <div className='notPrgDetail'>정보가 없습니다.</div>;
        }
    }
    
    function detailsChange(i) {
        
        setPrgDetailData({
            ...data[i],
            prg_big_cls: subData.prg_big_cls,
            prg_mid_cls: subData.prg_mid_cls,
            prg_sub_cls: subData.prg_sub_cls

        })
    }
    console.log(prgDetailData);
    return (
        <div style={{
            height: '100%'
        }}>
            <form style={{
                height: '100%'
            }} method='get'>
                <b>세부프로그램 목록</b>
                <div className='prg_dtlprg_grid'>
                    {/* <div className='prg_dtlprg_gridBoxT'>
                        <div>번호</div><div>세부프로그램명</div><div>세부프로그램내용</div><div></div>
                    </div> */}
                    <div className='prg_dtlprg_gridBox'>
                        <div>번호</div><div>세부프로그램명</div><div>세부프로그램내용</div>
                        {makeDiv()}
                    </div>
                </div>

                <b>세부프로그램 상세정보</b>
                <div className='prg_dtlprg_gridBox2'>
                    <div><span>*</span>대분류명</div>
                    <div><input type="text" name='prg_big_cls' value={prgDetailData.prg_big_cls} disabled /></div>

                    <div><span>*</span>중분류명</div>
                    <div><input type="text" name='prg_mid_cls' value={prgDetailData.prg_mid_cls} disabled /></div>

                    <div><span>*</span>소분류명</div>
                    <div><input type="text" name='prg_sub_cls' value={prgDetailData.prg_sub_cls} disabled /></div>

                    <div><span>*</span>프로그램명</div>
                    <div><input type="text" name='prgNm' value={prgDetailData.prgNm} disabled /></div>
                </div>

                <div className='prg_dtlprg_gridBox3'>
                    <div><span>*</span>세부프로그램명</div>
                    <div><input type="text" /></div>

                    <div>세부프로그램 내용</div>
                    <div><textarea cols="140" rows="6"></textarea></div>

                    <div>첨부파일</div>
                    <div><AttachedFile></AttachedFile></div>
                </div>
                <div className='buttonBox'>
                    <div>
                        <button type="reset">입력취소</button>
                        <button type="submit" value='삭제' formAction="/program/delete" >삭제</button>
                        <button type="submit" value='신규' formAction="/program/insert">신규</button>
                        <button type="submit" value='저장' formAction="/program/update">저장</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProgramDetailsPrg;