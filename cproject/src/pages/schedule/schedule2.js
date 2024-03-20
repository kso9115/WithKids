let pHtml = "";
function goDetail(day){
    let programDate =  new Date(2024,2, day); //2024년 3월 1일
    

    //순서 
    //[PROGRAM 테이블] programController => programService => programDAO => 
    //[PROGRAM 신청 테이블] Insert/select     
    //ajax로 db에서 프로그램정보 조회하기 parameter(programDate)   
    //해당 날짜에 존재하는 프로그램 조회해와서 아래 변수에 채워줌
    //select 프로그램날짜 ,프로그램명, 기간, 시간, 장소 
    //from PROGRAM 
    //where start_date = *$programDate*
    // MVC = M= DB V=view C= Controller 
    let programDay = ''; //요일
    let programName = ''; //프로그램 명
    let programDue = ''; //프로그램 기간
    let programTime =''; //프로그램 시간
    let programSpace = ''; //프로그램 장소

    // java(서버단) controller 호출해서 DB 접근하는 ajax
    $.ajax({
        type: 'post',//데이터 전송 타입,
        url : 'insertProgram',//데이터를 주고받을 파일 주소 입력,
        data: {  jno: programDate},//보내는 데이터,    변수보내기 *programDate*
        dataType:'application/json',//문자형식으로 받기 , 
        success: function(result){
            //작업이 성공적으로 발생했을 경우
            programDay = result.programDay; //요일 바인딩
            programName = result.programName; //프로그램 명
            programDue = result.programDue; //프로그램 기간
            programTime = result.programTime; //프로그램 시간
            programSpace = result.programSpace; //프로그램 장소

        },
        error:function(){  
            //에러가 났을 경우 실행시킬 코드
        }
    })



    pHtml += "<a href='#schedule1list1c2' class='a1 toggle' title='상세 내용 여닫기'>";
    pHtml += '<span class="timegroup1 timegroup1t">';
	pHtml += '<span class="time"><b class="t1" title="날짜">'+ +'</b> <span class="t2"';
	pHtml += 'title="요일">'+ programDay +'</span></span>';
	pHtml += '<span class="group"></span>';
	pHtml += '</span>';
	pHtml += '<span class="text">';
	pHtml += '<strong class="t1">'+ programName +'</strong>';
	pHtml += '<span class="t2wrap">';
	pHtml += '<span class="t2">기간 : '+ programDue +'</span>';
	pHtml += '</span>';
	pHtml += '<span class="t2wrap">';
    pHtml += '<span class="t2">시간 : '+ programTime +'</span>';
    pHtml += '<span class="t2">장소 : '+ programSpace +'</span>';
    pHtml += '</span>';
    pHtml += '</span>';
    pHtml += '<i class="ic1"><i class="ic1sw0 bsContain" style="background-size: contain;"></i>';
    pHtml += '<i class="ic1sw1 bsContain" style="background-size: contain;"></i></i>';
    pHtml += '</a>';

    document.getElementById('programDetailList').innerHTML = pHtml;

}