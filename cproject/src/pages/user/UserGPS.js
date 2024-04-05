export default function UserGPS() {

    // 위치 정보 가져오기
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    // 위치 정보 서버측에 출력 : ajax로하란다
    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
        // 이 위치 정보를 서버로 전송하여 출석체크를 처리하거나 다른 작업을 수행할 수 있습니다.
    }

    // 위치 정보 가져오기 호출
    getLocation();

    return(
        <div>위치정보 가져와서 서버로 전송 or front에서 처리하거나..생각을해보자
            <div onClick={getLocation}>위치 정보 가져오기</div>
            <div onClick={showPosition}>위치 정보 출력</div>

        </div>
    )


}