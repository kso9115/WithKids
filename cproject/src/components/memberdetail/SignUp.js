import React from 'react';

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>


const SignUp = () => {
    const handleClick = () => {
        // 카카오 주소 API 팝업 띄우기
        const width = 500;
        const height = 600;
        const kakaoMapUrl = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&libraries=services';

        // 주소 검색 창을 띄울 새 창의 위치를 계산합니다.
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const features = `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,resizable=yes,scrollbars=yes`;

        const popupWindow = window.open('', '_blank', features);

        // 카카오 지도 API 스크립트를 비동기적으로 로드합니다.
        const script = document.createElement('script');
        script.src = kakaoMapUrl;
        script.onload = () => {
            window.kakao.maps.load(() => {
                new window.kakao.maps.services.Places(popupWindow).postcode(popupWindow);
            });
        };

        popupWindow.document.write('Loading...');
        popupWindow.document.body.appendChild(script);
    };

    return (
        <div>
            <div>주소</div>
            <div className='mem_address1'>
                <input type='text' name='mem_address1' placeholder='도로명 주소를 입력하세요' readOnly></input>&nbsp;&nbsp;
                <input type='text' name='mem_address2' placeholder='상세주소'></input>&nbsp;&nbsp;
                <input type='button' value='주소검색' onClick={handleClick}></input>
            </div>
        </div>
    );
}

export default SignUp;
