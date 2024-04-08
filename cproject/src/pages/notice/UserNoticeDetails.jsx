import { useLocation } from "react-router-dom";
import { apiCall } from "../../server/apiService";
import { useEffect } from "react";

function UserNoticeDetails() {
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        apiCall('/notice/updateCnt', 'GET', { seq: location.state.seq, cnt: location.state.cnt })
            .then((response) => {
                if (response.data === "실패") alert("조회수 증가에 실패했습니다.");
            })
            .catch((error) => {
                console.log(error);
                alert("서버 통신 에러로 조회수 증가에 실패했습니다.");
            })
    }, [location])

    function downloadFile(event) {
        if (window.confirm(`${event.target.name} 파일을 다운로드 하시겠습니까?`))
            apiCall('/notice/filedownload', 'GET', {
                seq: location.state.seq,
                fileName: event.target.name
            })
                .then((response) => {
                    // 파일 다운로드를 위해 blob 데이터를 URL로 변환
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    // a 태그를 생성하고 다운로드 링크를 설정하여 다운로드를 유도
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.target.name); // 다운로드할 파일명을 설정
                    document.body.appendChild(link);
                    link.click();
                    // URL 객체의 사용이 끝나면 해제하여 메모리 누수를 방지
                    URL.revokeObjectURL(url);
                })
                .catch((error) => {
                    console.error('파일 다운로드 실패:', error);
                })
    }

    return (
        <div className="userNoticeDetail">
            <div>
                <div><p>{location.state.title}</p></div>
                <div>
                    <div>
                        <p>등록일&nbsp;:&nbsp;</p>
                        <p>{location.state.regdate}</p>
                    </div>
                    <div>
                        <p>조회수&nbsp;:&nbsp;</p>
                        <p>{location.state.cnt}</p>
                    </div>
                </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: location.state.content }}></div>

            <div>
                <div>첨부파일:</div>
                {location.state.file === "" ? <div>첨부파일이 없습니다.</div> :
                    <div className='userNoticeFile'>{
                        location.state.file ? location.state.file.split("?").map((e) => {
                            return (
                                <div key={e}>
                                    <div>{e}</div>
                                    <button type='button' name={e} onClick={downloadFile}>다운로드</button>
                                </div>
                            )
                        }) : <div>첨부파일이 없습니다.</div>
                    }</div>
                }
            </div>
        </div>
    );
}

export default UserNoticeDetails;