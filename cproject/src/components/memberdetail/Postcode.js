import React, { useEffect } from 'react';

function PostCode({ 
    // onAddressChange, onZipcodeChange,
    setMemDataOneD,memDataOneD }) {
    useEffect(() => {
        // 다음 우편번호 스크립트 로드
        // daum객체를 사용하기 위해 미리 script 생성
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
        // 스크립트 로드 후에는 cleanup 함수를 이용하여 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 
    const execDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 부모 컴포넌트에서 전달한 콜백 함수를 호출하여 값을 전달
                // onAddressChange(data.address);
                // onZipcodeChange(data.zonecode);
                setMemDataOneD({
                    ...memDataOneD,
                    memZipCode:data.zonecode,
                    memAddress1: data.address
                })
            }
        }).open("","_blank");
    };

    return (
        <>
            {/* <input type="text" name="memAddress1" id="memAddress1" readOnly />
            <input type="text" name="memZipCode" id="memZipCode" size="15" maxLength="30" readOnly /> */}
            <div onClick={execDaumPostcode}
            style={{
               border:1,
               borderStyle: 'solid',
               borderColor:'black',
               backgroundColor: 'black',
               color:'white',
               paddingLeft:10,
               paddingRight:10,
               height:22
            }}
            >검색하기</div>&nbsp;
        </>
    );
}

export default PostCode;

