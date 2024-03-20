import React from 'react'; 
// import './userprogram.css'; 
//import img3 from './webcontent/schdul/2024/3/20/38ec421d-1817-4f4a-8ded-6c89565bf7ee.png';

function Userprogram() {

    // searchBtn 함수를 정의합니다.
    const searchBtn = () => {
      
    };

    // searchReset 함수를 정의합니다.
    const searchReset = () => {
        
    };

    return(
        <>
            <div className="top_title"> {/* class -> className 으로 변경합니다. */}
                <h5>프로그램</h5>
            </div> <br/>

            <div className="program_Search_table"> {/* class -> className 으로 변경합니다. */}
                <fieldset>
                    <table>
                        <caption className="tts"></caption>
                        <colgroup>
                            <col style={{width:'80px'}}></col>
                            <col style={{width:'40%'}}></col>
                            <col style={{width:'80px'}}></col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">제목</th>
                                <td colSpan="3">
                                    <div className="input_group"> {/* class -> className 으로 변경합니다. */}
                                        <input type="text" className="keyword" title="검색어" placeholder="검색어를 입력하세요." name="q_searchVal" id="q_searchVal" />
                                        <span className="input_addon"><button type="submit" className="btn_bbs_search" onClick={() => searchBtn()}>검색</button></span>
                                        <span className="input_addon"><button type="button" className="btn_bbs_search" onClick={() => searchReset()}>초기화</button></span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </div>

            <form name="dataForm" id="dataForm" method="get" action="BD_selectSchdul.do" class="form-inline"></form>

            <ul>
                        
                            
                                
                                <li>
                                    <a href="#none" onclick="opSelectForm('751');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        {/* <img src={img3} alt=""></img> */}
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label03 fl">문화예술</p>
	                                        
                                        </div>
                                        <p class="program_tit">도전크루와 함께 운동할 크루원모집 - 혼성풋살</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.03.30
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('750');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/2bdfeb3a-89e8-43cd-b6d6-cb1dbf3724d1.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label04 fl">상담</p>
	                                        
                                        </div>
                                        <p class="program_tit">[기흥] 아크릴화 클래스 – 마음을 그리는 시간</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.16
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('749');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/2c7fb7fa-9817-4535-bee0-eb5f2168d700.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label04 fl">상담</p>
	                                        
                                        </div>
                                        <p class="program_tit">[기흥] MBTI 검사를 통한 YOU &amp; ME 사용설명서</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.09
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('748');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/dec6b525-baea-4b08-a364-51e7bfaad3d2.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label04 fl">상담</p>
	                                        
                                        </div>
                                        <p class="program_tit">[기흥] 재직자를 위한 소통검사 - 나의 조직생활을 위한 에니어그램 검사</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.06
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('747');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/4e2d2cd2-e4ca-4c43-b467-3548fbc16ba3.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label04 fl">상담</p>
	                                        
                                        </div>
                                        <p class="program_tit">[처인] 아크릴화 클래스 – 마음을 그리는 시간</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.08
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('746');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/85479b95-7306-4aa0-afb0-ae4605194948.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label04 fl">상담</p>
	                                        
                                        </div>
                                        <p class="program_tit">[처인] MBTI 검사를 통한 YOU &amp; ME 사용설명서</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.01
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('745');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/32da6c21-9f83-4711-8567-484014651c40.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label04 fl">상담</p>
	                                        
                                        </div>
                                        <p class="program_tit">[처인] 재직자를 위한 소통검사 - 나의 조직생활을 위한 에니어그램 검사</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.03.25
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('744');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/0dcfd52f-77a1-4187-b7ce-0ec2d180101f.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label03 fl">문화예술</p>
	                                        
                                        </div>
                                        <p class="program_tit">[수지] 용인을 사로잡는 18-39초, 숏폼 콘텐츠 제작 (기초반)</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.10
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('743');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/03e1d88c-2135-47f6-9ba0-383359b6559c.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label03 fl">문화예술</p>
	                                        
                                        </div>
                                        <p class="program_tit">[수지] 유리소품 전사지 클래스 : 나만의 감성가득 컵 만들기</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.15
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('742');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/dfde7e03-118c-4270-95c6-07077e10498d.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label03 fl">문화예술</p>
	                                        
                                        </div>
                                        <p class="program_tit">[수지] 봄을 선물하는 꽃 도시락 (플라워박스) 만들기</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.01
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('741');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/616a1ce8-4c83-4bc8-adcd-77a21a69e4ac.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label03 fl">문화예술</p>
	                                        
                                        </div>
                                        <p class="program_tit">[수지] 나만의 시그니쳐 항수만들기</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.03.29
                                        </p>
                                    </a>
                                </li>
                            
                                <li>
                                    <a href="#none" onclick="opSelectForm('740');">
                                        <p class="program_img">
                                            
                                                
                                                        
                                                        <img src="/webcontent/schdul/2024/3/20/260dd9db-4191-401e-8173-6a9689856f90.png" alt=""></img>
                                                    
                                                
                                                
                                            
                                        </p>
                                        <div class="ovh">
	                                        
	                                            
	                                            
	                                            
	                                            
	                                        
	                                        <p class="label label03 fl">문화예술</p>
	                                        
                                        </div>
                                        <p class="program_tit">[기흥] 봄을 선물하는 꽃 도시락 (플라워박스) 만들기</p>
                                        <p class="program_date">
                                            2024.03.20&nbsp;~&nbsp;
                                            2024.04.08
                                        </p>
                                    </a>
                                </li>
                            
                            
                            
                        
                </ul>

          
        </>
    );
}

export default Userprogram;