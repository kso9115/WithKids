
<div>
    <input type="text" id="sample3_postcode" placeholder="우편번호"></input>
    <input type="button" onclick="sample3_execDaumPostcode()" value="우편번호 찾기" />
    <input type="text" id="sample3_address" placeholder="주소" />
    <input type="text" id="sample3_detailAddress" placeholder="상세주소" />
    <input type="text" id="sample3_extraAddress" placeholder="참고항목"></input>


    <div id="wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" 
        style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="foldDaumPostcode()" alt="접기 버튼" />
    </div>
</div>

