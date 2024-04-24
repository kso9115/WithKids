import { useState,useEffect } from 'react';
import './Member_assortment.css';

function Member_assortment({memDataOne}){
    // AdmLvng_Manager에서 memDataOne 전달받아서, 상태값을 전달할 useState를 작성. 
    const[memDataOneD,setMemDataOneD] = useState({});
    //useEffet를 통해서 전달 받은 값을 펼침연산자 사용.
    useEffect(() => {
        setMemDataOneD({
            ...memDataOne
        });
    }, [memDataOne])
    //console.log(memDataOneD);

    return (
        <div className='asgridBox'>
            <div>대상자성명</div> 
            <div><input type='text' value={memDataOneD.memName || '' } disabled/></div>    
            
            <div>대상자번호</div>  
            <div><input type='text' value={memDataOneD.memSerial || '' } disabled/></div> 

            <div>생년월일</div>  
            <div><input type='text' value={memDataOneD.memBirth || '' } disabled/></div> 

            <div>주민등록번호</div>
            <div><input type='text' value={memDataOneD.memRegNum || '' } disabled/></div> 

            <div>성별구분</div>
            <div><input type='text' value={memDataOneD.memSex || '' } disabled/></div> 

            <div>입소/이용상태</div>
            <div><input type='text' value={memDataOneD.memStatus || '' } disabled/></div>
        </div>
    );
}
export default Member_assortment;