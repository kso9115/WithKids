import './userLogin.css';
function UserLogin( ){
    // serial 과 password useState
    const [serial, setSerial] = useState("");
    const [password, setPassword] = useState("");
    // const [disabled, setDisabled] = useState(false);

    // value가 바뀌도록 함 
    const handleSerialChange = (event) => setSerial(event.target.value);
    const handlePwChange = (event) => setPassword(event.target.value);

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 리프레시를 막아줌

        console.log("serial 넘버 => " + serial);
        console.log("password => " + password);

        if (serial.length > 0 && password.length > 0) {
            axios
            .post("/api/mem/login", {
                memSerial: serial,
                memLogingPW: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                alert("오류남 => " + err);
            });
        } else {
        alert("serial 번호와 password를 확인해 주세요");
        }
    }

    return(
        <div>
            <div className='loginTable'>
                <div className='idpwbox'>
                    <div><img className="serial" src={faceId} alt="serial" />
                        <input type="text" id="serial" name="serial" value={serial} onChange={handleSerialChange} />
                    </div>
                    <div><img className="padLock" src={padLock} alt="password"></img>
                        <input type="password" id="password" name="password" value={password} onChange={handlePwChange}/>
                    </div>
                </div>
                <div className='loginBtn'>
                    <input className='custom-btn' type="submit" value="로그인" onClick={onSubmitHandler}/>&nbsp;&nbsp;&nbsp;
                    <input className='custom-btn' type="reset" value="취소" />
                </div>
            </div>
        </div>
    )
}
export default UserLogin;