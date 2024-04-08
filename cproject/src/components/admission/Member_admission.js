import axios from 'axios';
import './Member_admission.css';
import { useState, useEffect, useCallback } from 'react';
import searchIcon from '../../assets/images/free-icon-search-149852.png';
//모달창 지원
import Modal from "react-modal";
import { apiCall } from '../../server/apiService';

function Member_admission({admMemOne , dataDML } ){
    // 발자취 남기기 => 생각을 잘못함 
    // const[admMem,SetAdmMem]=useState([]);
    // useEffect(()=>{
    //     axios
    //     .get("/api/adm/admMem")
    //     .then((res)=>{
    //         // console.log(res.data);
    //         SetAdmMem(res.data);
    //     })
    // })
    
    // 3. 전달된 데이터(admMemOne)를 저장 
     const[admMemOneD,setAdmMemOneD] = useState({});

    // 3-3. checkBox 처리하기 

    // 3-1. 전달된 데이터(admMemOne)를 저장 및 제어 
    useEffect(()=>{
        if(admMemOne.constructor === Object 
            && Object.keys(admMemOne).length !==0 ){
                // console.log("안오냐");
                setAdmMemOneD({
                    ...admMemOne,
                })
        }
    },[admMemOne]);

    
    // 3-2. 태그 하나하나가 변경 될 때(onChang), 변경된 값을 인식하고 제어함
    const admdChange = useCallback((event) => {
        admMemOneD[event.target.name] = event.target.value;
        setAdmMemOneD({ ...admMemOneD});
    }, [admMemOneD]);



    // // 6. 신규 버튼 클릭 onClick={()=> saveInsert("admInsert") 했을 때, 실행하여 요청
    // // axios 를 요청 할 때 필요한 인자 => url , admMemOneD, setData => post 요청은 body에 전달함. 2번째 인자를 사용
    // function saveInsert() {
    //     if(admMemOneD.memSerial){
    //         if(window.confirm("입소 데이터를 저장하시겠습니까?")){

    //             axios
    //             .post("/api/adm/admInsert", admMemOneD, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then((res)=>{
    //                     console.log(res.data);
    //                     setAdmMemOneD(res.data);
    //             })
    //             .catch((err) => {
    //                     console.log(err);
    //             })
    //         }else alert(" 신규 데이터 저장을 취소하셨습니다.");
    //     }  else alert(" admMemOneD에 memSerial 없다? ");
    // }
    // console.log(admMemOneD);
    
    
    // // 7. update을 작성 
    // function saveUpdate() {
    //     if(admMemOneD.memSerial){
    //         if(window.confirm("입소 데이터를 수정하시겠습니까?")){

    //             axios
    //             .post("/api/adm/admUpdate", admMemOneD, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then((res)=>{
    //                     console.log(res.data);
    //                     setAdmMemOneD(res.data);
    //             })
    //             .catch((err) => {
    //                     console.log(err);
    //             })
    //         }else alert(" 데이터 수정을 취소하셨습니다.");
    //     }  else alert(" admMemOneD에 memSerial 없다? ");
    // }

    // // 8. delete 작성

    // function deleteData() {
    //     if(admMemOneD.memSerial){
    //         if(window.confirm("입소 데이터를 수정하시겠습니까?")){
    //             axios
    //             .post("/api/adm/delete", admMemOneD, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then((res)=>{
    //                 console.log(res.data);
    //                 setAdmMemOneD(res.data);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //         } else alert(" 데이터 삭제 취소 ");
    //     } else alert(" admMemOneD에 memSerial 없다? ");
    // }

    // 함수 받아오기 
    const setDataDML = (type,dml, data)=>{
        dataDML(type,dml, data);
    }

    // modal 만들기 
    let [modal, setModal] = useState(false);

    // click 했을 때, staff 에서 값을 받아와야함.
    const onOpenClick = () => {
        setModal(true);
        console.log("트루");
    }
    const onCloseClick = () => {
        setModal(false);
        console.log("폴스~");
    }

    function ModalRes({modal, setData, onCloseClick}){
        const [staff,SetStaff] = useState([]);

        useEffect(()=>{
            if(modal){
               apiCall('/staff/staffList','GET')
               .then((res)=>{
                    SetStaff(res.data);
                    console.log(res.data);
               })
               .catch((err)=>{
                    console.log("모달창 요청 에러 => " +  err);
               }) 
            }
        },[modal])

        return(staff.map((items) => {
            console.log("리턴");
            return(
                <div key={items.staffNm} onClick={() => { 
                        setData(items.staffNm)
                        onCloseClick();  
                }}>
                    <div>{items.staffPst}</div>
                    <div>{items.staffNm}</div>
                    <div>{items.staffPhnn}</div>
                </div>
            )
        }))
    }

    const staffSelect =(name)=> {setAdmMemOneD({ ...admMemOneD, memResponsiblePerson: name})};

    const modalStyle = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            width: "400px",
            height: "300px",
            margin: "auto",
            padding: "20px",
            zIndex: "1",
        }
    }

    return (
        <div>
            <Modal style={modalStyle} isOpen={modal} onRequestClose={onCloseClick}>
                <h4>임직원 조회하기</h4>
                <div className='staffModal'>
                    {/* <select name='' value={''} onChange={admdChange}>
                        <option value="none" >--선택--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select> */}
                    <div style={{ backgroundColor: 'var(--admin)' }}>
                        <div>직급</div>
                        <div>성함</div>
                        <div>연락처</div>
                    </div>
                    <ModalRes modal={modal} setData={staffSelect} onCloseClick={onCloseClick}></ModalRes>
                </div>
                <button className="planModalClose" onClick={onCloseClick}>닫기</button>
            </Modal>
            <div style={{color:'black',fontWeight:'bold'}}>입소/이용 정보</div>
            <div className="adgridBox admissionBox">
                <div><span style={{color:"red"}}>*</span>입소/이용일자</div>
                <div><input type="date" name="admissionDate" value={admMemOneD.admissionDate || '' } onChange={admdChange}/></div>
                
                <div><span style={{color:"red"}}>*</span>입소/이용유형</div>
                <div><select name="admissionType" value={admMemOneD.admissionType || ''} onChange={admdChange}>
                        <option value="none" >--선택해 주세요--</option>
                        <option value="차상위 계층 등">차상위 계층</option>
                        <option value='국민기초생활보장수급자'>국민기초생활보장수급자</option>
                        <option value='돌봄특례 아동'>돌봄특례 아동</option>
                        <option value='초중고 교육비지원대상자'>초중고 교육비지원대상자</option>
                        <option value='일반아동.다자녀 가족'>일반아동,다자녀 가족</option>
                        <option value='교육급여대상가정 아동'>교육급여대상가정 아동</option>
                        <option value='한부모 가족 아동'>한부모 가족 아동</option>
                    </select>
                </div>
                
                <div><span style={{color:"red"}}>*</span>입소/이용자격</div>
                <div>
                    <select name="admissionQualification" value={admMemOneD.admissionQualification || ''} onChange={admdChange}>
                        <option value="none" >----</option>
                        <option value="무료">무료</option>
                        <option value='유료'>유료</option>
                    </select>    
                </div>
                 
                <div><span></span>전입여부</div>
                <div><input type="radio" id="transfer" name="transfer" value={1} checked={admMemOneD.transfer == 1} onChange={admdChange}/><label htmlFor='transfer'>Y</label>  &nbsp;
                    <input type="radio" id="transfer" name="transfer" value={0} checked={admMemOneD.transfer == 0} onChange={admdChange}/> <label htmlFor='transfer'>N</label>
                </div>

                <div></div><div></div>
                <div></div><div></div>

                <div><span></span>이전시설명</div>
                <div><input type="text" name="preFacNm" value={admMemOneD.preFacNm || ''} onChange={admdChange}/></div>
               
                <div><span></span>이전시설입소일자</div>
                <div><input type="date" name="preFacAdmissionDate" value={admMemOneD.preFacAdmissionDate || ''} onChange={admdChange}/></div>

                <div><span></span>이전시설퇴소일자</div>
                <div><input type="date" name="preFacLeavingDate" value={admMemOneD.preFacLeavingDate || ''} onChange={admdChange}/></div>
               
                <div><span style={{color:"red"}}>*</span>입소/이용사유</div>
                <div><select name="admissionRs" value={admMemOneD.admissionRs || ''} onChange={admdChange}>
                        <option value="none" >--선택해 주세요--</option>
                        <option value="맞벌이 부부">맞벌이 부모</option>
                        <option value='다문화 가정'>다문화 가정</option>
                        <option value='형재·자매가 재원중'>형제,자매가 재원중</option>
                        <option value='자녀가 3명 이상'>자녀가 3명이상</option>
                        <option value='무연고자'>무연고자</option>
                        <option value='조부모 돌봄'>조부모 돌봄</option>
                        <option value='한부모 가족 아동'>한부모 가족 아동</option>
                    </select>
                </div>
                
                <div><span></span>입소/이용사유내용</div>
                <div><input type="text" name="admissionDetail" value={admMemOneD.admissionDetail || ''} onChange={admdChange}/></div>

                <div></div><div></div>
                
                <div><span></span>입소/이용시작시간</div>
                <div><input type="time" name="memRegisterTime" value={admMemOneD.memRegisterTime || ''} onChange={admdChange}/><span style={{fontSize:10 , color:"var(--lgray)"}}>(예시: 오후1:00)</span></div>
                
                <div><span style={{color:"red"}}>*</span>프로그램</div>
                <div><select name="program"  onChange={admdChange}>
                    <option value="none" >--선택해 주세요--</option>
                        <option value="내부 프로그램">내부 프로그램</option>
                        <option value='신청형 프로그램'>신청형 프로그램</option>
                    </select>
                </div>

                <div><span></span>담당자 성명</div>
                <div><input type="text" name='memResponsiblePerson' onChange={admdChange} value={ admMemOneD.memResponsiblePerson || '' }/> <img className="sIcon" src={searchIcon} alt="search" onClick={onOpenClick}/> </div>
                
            </div>
            <br></br>
            <div style={{color:'black',fontWeight:'bold'}}>입소/이용 상황 및 경위</div>
            <div className="adgridBox2" onChange={admdChange}>
                <div><span></span>입소/이용상황</div>
                <div><textarea name="admissionStatus" value={admMemOneD.admissionStatus || ''}></textarea></div>

                <div><span></span>입소/이용경위</div>
                <div><textarea name="admissionStatusDetail" value={admMemOneD.admissionStatusDetail || ''}></textarea></div>
            </div>   

            <div className='buttonBox'>
                {/* <div>
                    <button type="reset">입력취소</button>
                    <button type="submit" value='삭제' formaction="/admission/delete">삭제</button>
                    <button type="submit" value='신규' formaction="/admission/insert">신규</button>
                    <button type="submit" value='저장' formaction="/admission/update">저장</button>
                </div> */}
                <div>
                    <button type="reset" onClick={()=> setAdmMemOneD({}) }>입력취소</button>
                    <button type="submit" value='삭제' onClick={()=>setDataDML("1","delete",admMemOneD)}>삭제</button>
                    <button type="submit" value='신규' onClick={()=>setDataDML("1","insert",admMemOneD)}>신규</button>
                    <button type="submit" value='저장' onClick={()=>setDataDML("1","update",admMemOneD)}>저장</button> 
                </div>
            </div>
        </div>
          
    );
}
export default Member_admission;