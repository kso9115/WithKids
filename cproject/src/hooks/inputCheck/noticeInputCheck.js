export function notice_inp_ck(data, type, text) { // 필수입력확인
    var regex = /^[0-9]*$/;
    if (Object.keys(data).length > 0) {

        //제목 title
        if (!data.title) return alert("제목을 입력해주세요.");

        if (text === "" || !text) return alert("내용을 입력해주세요");

        // useConfirm("프로젝트를 신규 생성하시겠습니까?",true,false);
        if (type === "noticeInsert") {
            if (data.seq) return alert("선택된 공지사항을 수정하셨습니다.\n신규 작성 하시려면 입력취소 후에 다시입력해주세요");

            return window.confirm("공지사항을 생성하시겠습니까?");
        } else if (type === "noticeUpdate") {
            if (!data.seq) return alert("선택된 공지사항이 없습니다.\n수정 하시려면 공지사항을 선택 후 다시입력해주세요");

            return window.confirm("입력하신 공지사항을 저장하시겠습니까?");
        } else {
            alert("잘못된 요청입니다.");
            return false;
        }

    } else {
        alert("종류를 선택해주세요.");
        return false;
    }
}