import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { apiCall } from "../../server/apiService";

function UserCheck() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [attOne, setAttOne] = useState({});

    var sessionData = JSON.parse(sessionStorage.getItem('userLogin'));


    // useEffect(() => {
    // },[]);
    const attChange = () => {

        const params = {
            memSerial: sessionData ? sessionData.data.id : null,
            memName: sessionData ? sessionData.data.username : null,
            attDate: format(currentMonth, 'yyyy-MM-dd'),
            attStatus: '출',
        }
    
        // console.log(params); // 데이터 줄력됨 => 그대로 요청이랑 전달하면댄당
    
        apiCall('/att/attInsert', 'POST', params)
            .then((response) => {
                console.log("오잉");
                // response : message
                // setAttOne()
                alert(response)
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
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
                    marginBottom: '50px',
                    fontSize: 30
                }}>{format(currentMonth, 'yyyy-MM-dd')}</div>

                <div style={{
                    display: 'flex',
                    gap: '50px',
                    justifyContent: 'center'
                }}>
                    <div
                        style={{
                            border: '1px solid black',
                            backgroundColor: 'black',
                            padding: 20,
                            borderRadius: 10

                        }}>
                        <button className="attChange"
                            onClick={attChange()}
                        >입실하기</button>
                    </div>
                    <div
                        style={{
                            border: '1px solid black',
                            backgroundColor: 'black',
                            padding: 20,
                            borderRadius: 10

                        }}>
                        <button>조식</button>&nbsp;
                        <button>중식</button>&nbsp;
                        <button>석식</button>&nbsp;
                        <button>간식</button>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default UserCheck;