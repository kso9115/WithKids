import './Member_admission.css';

function Member_addission(){

    return (
        <form>
            <div style={{color:'black',fontWeight:'bold'}}>입소/이용 정보</div>
            <div className="adgridBox admissionBox">
                <div><span style={{color:"red"}}>*</span>입소/이용일자</div>
                <div><input type="date" /></div>
                
                <div><span style={{color:"red"}}>*</span>입소/이용유형</div>
                <div><input type="select" /></div>
                
                <div><span style={{color:"red"}}>*</span>입소/이용자격</div>
                <div><input type="select" /></div>
                 
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
                <div><input type="select" /></div>
                
                <div><span></span>입소/이용사유내용</div>
                <div><input type="text" /></div>

                <div></div><div></div>
                
                <div><span></span>입소/이용시작시간</div>
                <div><input type="time" /><span style={{fontSize:10}}>(예시:13:00)</span></div>
                
                <div><span style={{color:"red"}}>*</span>프로그램</div>
                <div><input type="text" /></div>

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
          </form>
          
    );
}
export default Member_addission;