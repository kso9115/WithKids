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
    
    // 1. MemAdmission 에서 detail정보를 가져옴. 
    const[admMemOne,setAdmMemOne] = useState({});   
    // 2. Manager에 DATA 가져오기
    const[memData, setMemData]= useState();
    
    // 3. 컨테이너에 정보 전달 
    const [subMenuArr,setSubMenuArr] = useState([
        {name : '입소/이용',content:<MemberAdmission admMemOne={admMemOne}></MemberAdmission>},
        {name : '퇴소/종결',content:<MemberLeaving></MemberLeaving>},
    ]);
    const [subCurrentTab,setSubCurrentTab] = useState(0);
    
    // 1. MemAdmission 에서 detail정보를 가져옴. 
    useEffect(()=>{
        if(admMemOne.constructor === Object
            && Object.keys(admMemOne).length !==0 ){
                // 빈객체가 넘어 오지 않도록 방어코드를 넣어줌 -> 넣지 않는 경우, 동기화 문제가 발생함. 
            axios
            .get("/api/adm/admMemOne",{
                params:{
                    memSerial :admMemOne.memSerial
                }
            }).then((response)=>{
                console.log(response.data);
                setAdmMemOne(response.data);
            })
            .catch((err)=>{
                console.log(`admMemOne 아동1명 불러오기 오류 발생 => ${err}`);
            })
        }
    });
    
    
    // 2. Manager에 memList DATA 가져오기
    useEffect(() => {
        axios
        .get("/api/mem/memList")
        .then((res) => {
            console.log(res.data);
            setMemData(res.data);
        })
        .catch((err)=>{
            console.log(`Manager에서 아동 List 불러오기 => ${err}`);
        })
    }, []);

    // Manager 에서 대상자 성명, 번호, 생년월일, 번호, 성별구분, 입소이용상태 값을 전달하기 
    // const[assort,SetAssort] = useState();
    // useEffect(()=>{
    //     axios
    //     .get("/api/mem/memList")
    //     .then((response)=>{
    //         console.log(response.data);
    //         setMList(response.data);
    //     })
    //     .catch((err)=>{
    //         console.log(`SpringData 오류 발생 => ${err}`);
    //     })
    // });



 
    
    // 화면
    return (
        <div className="admLvngBox">
            <SearchBox data={admLvng_mng}/>
            <div className="adMainBox">
                <div style={{
                    width: '30%',
                    height: '100%'}} >
                    {/* <div style={{
                        marginBottom: '5px'}}>

                    </div> */}
                    <MemberList memData={memData}/>
                </div>
                <div style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgb(223, 222, 222)',
                    marginLeft: '5px',
                    marginRight: '5px'}}>
                </div> 
                <div style={{
                    width: '70%',
                    height: '100%'
                }}>
                    <MemberAssortment />
                    <Container menuArr={subMenuArr} setMenuArr={setSubMenuArr} 
                        currentTab={subCurrentTab} setCurrentTab={setSubCurrentTab} mainSub={'sub'}></Container>
                </div>
            </div>
        </div>
    );
}
 
export default AdmLvng_Manager;