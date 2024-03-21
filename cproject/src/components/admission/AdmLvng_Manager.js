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

    // 컨테이너에 정보 전달 
    const [subMenuArr,setSubMenuArr] = useState([
        {name : '입소/이용',content:<MemberAdmission></MemberAdmission>},
        {name : '퇴소/종결',content:<MemberLeaving></MemberLeaving>},
    ]);
    const [subCurrentTab,setSubCurrentTab] = useState(0);



    // Manager에 DATA 가져오기
    const[memList, setMList]= useState();

    useEffect(()=>{
        SpringData();
    },[]);

    async function SpringData(){
        await axios
            .get("/api/mem/memList")
            .then((response)=>{
                console.log(response.data);
                setMList(response.data);
            })
            .catch((err)=>{
                console.log(`SpringData 오류 발생 => ${err}`);
            })
    }

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
                    <MemberList memList={memList}/>
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