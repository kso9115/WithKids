import MemberAdmission from "./Member_admission";
import MemberList from "../memberdetail/MemberList";
import MemberAssortment from "./Member_assortment";
import MemberLeaving from "./Member_Leaving";
import SearchBox from "../searchbox/SearchBox";
import Container from "../Container";
import {admLvng_mng} from "../searchbox/searchData";

import './AdmLvng_Manager.css';
import { useState } from "react";



function AdmLvng_Manager() {
    const [subMenuArr,setSubMenuArr] = useState([
        {name : '입소/이용',content:<MemberAdmission></MemberAdmission>},
        {name : '퇴소/종결',content:<MemberLeaving></MemberLeaving>},
    ]);
    const [subCurrentTab,setSubCurrentTab] = useState(0);
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
                    <MemberList />
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