import './MemberDetailNote.css'

function MemberDetailNote() {

    return (
        <div>
            <b>비고</b>
            <div className='gridBox3'>
                <div>아동 특이사항</div>
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
