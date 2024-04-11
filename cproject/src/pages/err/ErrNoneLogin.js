import { Link } from 'react-router-dom';
import './ErrNoneLogin.css'

function ErrNoneLogin() {

    return (
        <div className="errNoneLogin">
            <div>
                <p>ERROR<br /></p>
                <p>잘못된 접근입니다.<br></br>로그인후에 이용해주세요</p>
            </div>
            <div>
                <Link to="/">SELECT</Link>
                <Link to="/login">LOGIN</Link>
            </div>
        </div>
    );

}
export default ErrNoneLogin;