import MemberAdmission from "./Member_admission";
import MemberList from "../memberdetail/MemberList";
import MemberAssortment from "./Member_assortment";
import MemberLeaving from "./Member_Leaving";
import SearchBox from "../../hooks/searchbox/SearchBox";
import Container from "../container/Container";
import './AdmLvng_Manager.css';

import { admLvng_mng } from "../../hooks/searchbox/searchData";

import { useEffect, useState } from "react";
import axios from "axios";
import { apiCall } from "../../server/apiService";
import { admission_inp_ck } from '../../hooks/inputCheck/admissionInputCheck';

const memberList = {
    name: 'adm',
    list: '아동 목록',
    title: ['대상자 번호', '대상자명', '성별', '생년월일'],
    menu: ['memSerial', 'memName', 'memSex', 'memBirth']
}


function AdmLvng_Manager() {

    // 2. memberManager 에서 선택한 아동 한명을 전달 받아, set 해주어, memDataOne 에 저장 
    const [memDataOne, setMemDataOne] = useState({});
    //console.log(memDataOne);


    // 3. MemberAdmission에 detail DATA 전달하기 
    const [admMemOne, setAdmMemOne] = useState({});
    // console.log(admMemOne);

    // 4. 퇴소 데이터 가져오기 
    const [lvngMem, setLvngMem] = useState({});

    // search Box 요청 => 감지하여 값 변경
    const[memListUpdate,setMemListUpdate] = useState(true); 

    // 1. 컨테이너에 정보 전달 
    const subMenuArr = [
        { name: '입소/이용', content: '' },
        { name: '퇴소/종결', content: '' },
    ];
    subMenuArr[0].content = <MemberAdmission admMemOne={admMemOne} setAdmMemOne={setAdmMemOne}
        dataDML={dataDML}></MemberAdmission>
    subMenuArr[1].content = <MemberLeaving memDataOne={memDataOne} lvngMem={lvngMem} setLvngMem={setLvngMem}
        dataDML={dataDML}></MemberLeaving>

    const [subCurrentTab, setSubCurrentTab] = useState(0);

    // // 3. MemberAdmission에 detail DATA 전달하기 
    // // 실행되는 시점을 제어하기 위해 if문 안에 매핑 요청
    // useEffect(() => {
    //     if (memDataOne.constructor === Object
    //         && Object.keys(memDataOne).length !== 0) {
    //         axios
    //             .get("/api/adm/admMemOne", {
    //                 params: {
    //                     memSerial: memDataOne.memSerial
    //                 }
    //             }).then((res) => {
    //                 // console.log(res.data);
    //                 setAdmMemOne(res.data);
    //             }).catch((err) => {
    //                 console.log(err);
    //             })
    //     }
    // }, [memDataOne]);

    // // 4. 퇴소 데이터 가져오기 
    // useEffect(()=>{
    //     if(memDataOne.constructor === Object
    //         && Object.keys(memDataOne).length !== 0){
    //         axios
    //         .get("/api/lvng/lvngMemOne",{
    //             params:{
    //                 memSerial: memDataOne.memSerial
    //             }
    //         })
    //         .then((res)=>{
    //             console.log(res.data);
    //             setLvngMem(res.data);
    //         })
    //     }
    // },[memDataOne])
    // console.log({lvngMem});


    // 5. 3번과 4번의 중복을 제거함. 

    // 공통된 로직을 함수로 분리
    // 
    const axiF = (url, setData) => {
        console.log({ memSerial: memDataOne.memSerial });
        console.log(memDataOne.memSerial );
        // axios
        //     .post(url, null, { params })   
         

            apiCall(url,'POST', { 
                memSerial: memDataOne.memSerial 
            } , null)
                .then((res) => {
                    console.log(res.data);
                    if (!res.data) setData({ memSerial: memDataOne.memSerial });
                    else setData(res.data);
                    
                })
                .catch((err) => {
                    console.log(err);
                });

        
    };

    // useEffect 내에서 fetchData 함수를 호출하여 데이터 가져오도록 변경
    useEffect(() => {
        if (memDataOne.constructor === Object && Object.keys(memDataOne).length !== 0) {
            
                axiF("/adm/admMemOne", setAdmMemOne);
                axiF("/lvn/lvngMemOne", setLvngMem);
            // NemberAdmission 데이터 요청
            // axiF("/api/adm/admMemOne", { memSerial: memDataOne.memSerial }, setAdmMemOne);
            // 퇴소 데이터 요청
            // axiF("/api/lvn/lvngMemOne", { memSerial: memDataOne.memSerial }, setLvngMem);
        }
    }, [memDataOne]);



    //  props로 함수 전달 

    // 6. 신규 버튼 클릭 onClick={()=> saveInsert("admInsert") 했을 때, 실행하여 요청
    // axios 를 요청 할 때 필요한 인자 => url , admMemOne, setData => post 요청은 body에 전달함. 2번째 인자를 사용
    // function saveInsert() {
    //     if(admMemOne.memSerial){
    //         if(window.confirm("입소 데이터를 저장하시겠습니까?")){

    //             axios
    //             .post("/api/adm/admInsert", admMemOne, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then((res)=>{
    //                     console.log(res.data);
    //                     setAdmMemOne(res.data);
    //             })
    //             .catch((err) => {
    //                     console.log(err);
    //             })
    //         }else alert(" 신규 데이터 저장을 취소하셨습니다.");
    //     }  else alert(" admMemOne에 memSerial 없다? ");
    // }
    // console.log(admMemOne.memSerial);


    // // 7. update을 작성 
    // function saveUpdate() {
    //     if(admMemOne.memSerial){
    //         if(window.confirm("입소 데이터를 수정하시겠습니까?")){

    //             axios
    //             .post("/api/adm/admUpdate", admMemOne, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then((res)=>{
    //                     console.log(res.data);
    //                     setAdmMemOne(res.data);
    //             })
    //             .catch((err) => {
    //                     console.log(err);
    //             })
    //         }else alert(" 데이터 수정을 취소하셨습니다.");
    //     }  else alert(" admMemOne에 memSerial 없다? ");
    // }

    // // 8. delete 작성

    // function deleteData() {
    //     if(admMemOne.memSerial){
    //         if(window.confirm("입소 데이터를 수정하시겠습니까?")){
    //             axios
    //             .post("/api/adm/delete", admMemOne, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then((res)=>{
    //                 console.log(res.data);
    //                 setAdmMemOne(res.data);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //         } else alert(" 데이터 삭제 취소 ");
    //     } else alert(" admMemOne에 memSerial 없다? ");
    // }

    // 코드 중복 정리 함수 작성. 
    function dataDML(type, dml, data) {
        console.log(admMemOne);
        if(admission_inp_ck(admMemOne)){
            if (admMemOne.memSerial) {
                console.log({data});
                if (window.confirm(" 데이터 신규 등록 및 수정 하시겠습니까?")) {
                    // axios
                    //     .post(`/api/${type == "1" ? "adm" : "lvn"}/${dml}`,  data , {
                    //         headers: {
                    //             'Content-Type': 'application/json'
                    //         }
                    //     })
                    apiCall(`/${type == "1" ? "adm" : "lvn"}/${dml}` , 'POST' , data ,null )
                        .then((res) => {
                            { type == "1" ? setAdmMemOne(res.data)  : setLvngMem(res.data) };
                            alert("완료")
                        })
                        .catch((err) => {
                            alert("완료")
                            console.log(err);

                        })
                } else alert(" 취소하셨습니다.");
            } else alert(" admMemOne에 memSerial 없다? ");
    
        }
    }
    // searchBox 요청
    function searchBoxClick(sbVal){
        setMemListUpdate(sbVal);
    }

    return (
        <div className="admLvngBox">
            <SearchBox data={admLvng_mng} searchBoxClick={searchBoxClick} />
            <div className="adMainBox">
                <div style={{
                    width: '30%',
                    height: '100%'
                }} >
                    {/* <div style={{
                        marginBottom: '5px'}}>
                        
                    </div> */}
                    <MemberList name={memberList} setData={setMemDataOne} memListUpdate={memListUpdate} />
                </div>
                <div style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgb(223, 222, 222)',
                    marginLeft: '5px',
                    marginRight: '5px'
                }}>
                </div>
                <div style={{
                    width: '70%',
                    height: '100%'
                }}>
                    <MemberAssortment memDataOne={memDataOne} />
                    <Container menuArr={subMenuArr} currentTab={subCurrentTab}
                        setCurrentTab={setSubCurrentTab} mainSub={"sub"}></Container>
                </div>
            </div>
        </div>
    );
}

export default AdmLvng_Manager;