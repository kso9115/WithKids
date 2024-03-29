
import { Link } from 'react-router-dom';

function Select() {
    // const con = {
    //     position: relative,
    //     left: calc(50 % - 150px)
    // };
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            textAlign: 'center',
            paddingTop: '25%'
        }}>
            <img
                style={{
                    marginBottom: '50px'
                }}
                src="img/Community Child Center.png" alt=""></img>

            <div style={{
                marginBottom: '50px'
            }}>안녕하세요 지역 아동 복지 센터 입니다.</div>

            <div style={{
                display: 'flex',
                gap: '50px',
                justifyContent: 'center'
            }}>
                <Link to="/user">사용자 홈페이지로</Link>
                <Link to="/login">관리페이지로</Link>
            </div>

        </div>
    );
}

export default Select;