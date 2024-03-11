import './login.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Session from 'react-session-api';

function Login({ setSessionName }) {



    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    // const [disabled, setDisabled] = useState(false);

    const handleIdChange = (event) => setId(event.target.value);
    const handlePwChange = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.get("http://localhost:4000/api/member")
            .then(result => {
                let idPwCk = false;
                result.data.forEach(element => {
                    if ((element.id === id) && (element.password === password)) {
                        idPwCk = true;
                        console.log(element.id + " : " + element.password);
                    }
                });
                if (idPwCk) {
                    setSessionName(id);
                    sessionStorage.setItem("sname", id);
                    window.location.reload();
                } else {
                    alert("일치하는 계정이 없습니다.\n다시입력하세요")
                }
            })
            .catch(err => console.log(err))
    };


    return (
        <div id="loginBox">
            <h2>** Login Form **</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="id">I D</label></td>
                            <td><input type="text" id="id" name="id" value={id} onChange={handleIdChange} size="18" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">비밀번호</label></td>
                            <td><input type="password" id="password" name="password" value={password} onChange={handlePwChange} size="18" /></td>
                        </tr>
                        <tr><td></td>
                            <td>
                                <input type="submit" value="로그인" />&nbsp;&nbsp;&nbsp;
                                <input type="reset" value="취소" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Login;