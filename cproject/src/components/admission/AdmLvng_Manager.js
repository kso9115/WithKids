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



function AdmLvng_Manager() {

    // 2. memberManager 에서 선택한 아동 한명을 전달 받아, set 해주어, memDataOne 에 저장 
    const [memDataOne, setMemDataOne] = useState({});
    //console.log(memDataOne);


    // 3. MemberAdmission에 detail DATA 전달하기 
    const [admMemOne, setAdmMemOne] = useState({});
    // console.log(admMemOne);

    // 4. 퇴소 데이터 가져오기 
    const[lvngMem,setLvngMem]=useState({});

    
    // 1. 컨테이너에 정보 전달 
    const subMenuArr = [
        { name: '입소/이용', content: '' },
        { name: '퇴소/종결', content: '' },
    ];
    subMenuArr[0].content = <MemberAdmission admMemOne={admMemOne} setAdmMemOne={setAdmMemOne}></MemberAdmission>
    subMenuArr[1].content = <MemberLeaving memDataOne={memDataOne} lvngMem={lvngMem}></MemberLeaving>

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
    const axiF = (url, params, setData) => {
        axios
            .get(url, { params })
            .then((res) => {
                console.log(res.data);
                if(!res.data) setData({memSerial: memDataOne.memSerial});
                else setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // useEffect 내에서 fetchData 함수를 호출하여 데이터 가져오도록 변경
    useEffect(() => {
        if (memDataOne.constructor === Object && Object.keys(memDataOne).length !== 0) {
            // NemberAdmission 데이터 요청
            
            axiF("/api/adm/admMemOne", { memSerial: memDataOne.memSerial }, setAdmMemOne);
            
            // 퇴소 데이터 요청
            axiF("/api/lvng/lvngMemOne", { memSerial: memDataOne.memSerial }, setLvngMem);
        }
    }, [memDataOne]); 


    return (
        <div className="admLvngBox">
            <SearchBox data={admLvng_mng} />
            <div className="adMainBox">
                <div style={{
                    width: '30%',
                    height: '100%'
                }} >
                    {/* <div style={{
                        marginBottom: '5px'}}>
                        
                    </div> */}
                    <MemberList setData={setMemDataOne} />
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
                        setCurrentTab={setSubCurrentTab} mainSub={'sub'}></Container>
                </div>
            </div>
        </div>
    );
}

export default AdmLvng_Manager;