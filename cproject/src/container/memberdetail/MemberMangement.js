import MemberSearch from "./MemberSearch";
import MemberList from "./MemberList";

function MemberMangement() {

    return (

        <div className="MemberMangement">
            <h>MemberMangement 아동 관리 전체 화면</h>
            <MemberSearch />
            <MemberList />
        </div>
    );
}

export default MemberMangement;