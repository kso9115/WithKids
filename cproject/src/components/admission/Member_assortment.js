import './Member_assortment.css';

function Member_adssortment(){

    return (
        <div className='asgridBox'>
            <div>대상자성명</div> 
            <div><input type='text' readOnly/></div>    
            
            <div>대상자번호</div>  
            <div><input type='text' readOnly/></div> 

            <div>생년월일</div>  
            <div><input type='text' readOnly/></div> 

            <div>주민등록번호</div>
            <div><input type='text' readOnly/></div> 

            <div>성별구분</div>
            <div><input type='text' readOnly/></div> 

            <div>입소/이용상태</div>
            <div><input type='text' readOnly/></div>
        </div>
    );
}
export default Member_adssortment;