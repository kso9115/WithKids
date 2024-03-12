import MemberSearch from "./MemberSearch";
import MemberList from "./MemberList";

function MemberMangement() {

    return (

        <div className="MemberMangement">
            <p>아동 관리 전체 화면</p>

            <MemberSearch />

            <form>
                <div className='memberMainBox'>
                    <div>
                        <div>
                            <span>대상자 목록(총 20건)</span>
                            <button>excel다운(이벤트넣기)</button>&nbsp;
                            <button>출력(이벤트넣기)</button>
                        </div>
                        <MemberList />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MemberMangement;