import './MemberList.css';

function MemberList() {

    const testData = [
        {
            serial: 'user2024ff001',
            name: '김수옥',
            gender: '여',
            birth: '1995-08-08'
        },
        {
            serial: 'user2024ff002',
            name: '임시운',
            gender: '여',
            birth: '1994-06-17'
        },
        {
            serial: 'user2024ff003',
            name: '임명건',
            gender: '남',
            birth: '1993-04-18'
        },
        {
            serial: 'user2024ff004',
            name: '김창민',
            gender: '남',
            birth: '1993-04-18'
        },
        {
            serial: 'user2024ff005',
            name: '장근정',
            gender: '여',
            birth: '1993-04-18'
        },
        {
            serial: 'user2024ff006',
            name: '백승현',
            gender: '남',
            birth: '1993-04-18'
        },
        {
            serial: 'user2024ff007',
            name: '최승삼',
            gender: '남',
            birth: '1993-04-18'
        },
    ]



    return (
        <>
        <p>대상자 리스트</p>
            <form>
                <div className="memberList">
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>대상자번호</th>
                                <th>대상자명</th>
                                <th>성별</th>
                                <th>생년월일</th>
                            </tr>

                        </thead>
                        {testData.map((o, i) => {
                            // console.log(`test => ${name}`);
                            return (
                                <tbody>
                                    <tr>
                                        <td><input type='text' value='시퀀스 넘버' readonly /></td>
                                        <td><input type='text' value={o.serial} readonly /></td>
                                        <td><input type='text' value={o.name} readonly /></td>
                                        <td><input type='text' D value={o.gender} readonly /></td>
                                        <td><input type='text' value={o.birth} readonly /></td>
                                    </tr>
                                </tbody>

                            )
                        })

                        }
                    </table>
                </div>
            </form>
        </>
    );
}

export default MemberList;