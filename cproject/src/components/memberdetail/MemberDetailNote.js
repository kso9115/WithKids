import { useState } from 'react';
import './MemberDetailNote.css'

function MemberDetailNote() {
    // 멤버리스트로 연결하지말고 아예 새로운 엔티티생성해서 비고 데이터만 전달받기
    // 매칭은 memSerial로 하면서 바로 띄워줄 수 있게끔
    // const []= useState();

    // 수정을 일도 안했다
    return (
        <div>
            <b>비고</b>
            <div className='gridBox3'>
                <div><textarea name="mem_info"></textarea></div>
            </div>
            <div className='gridBox4'>
                <div className='MemberDetailNote_submitB'><input type='submit' value='저장'></input></div>&nbsp;&nbsp;
                <div className='MemberDetailNote_resetB'><input type='reset' value='초기화'></input></div>
            </div>
        </div>
    )

}

export default MemberDetailNote;
