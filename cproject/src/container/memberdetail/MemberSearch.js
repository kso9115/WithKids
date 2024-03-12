import './MemberSearch.css';

function MemberSearch() {
    return (
        <div>
            <p>서치 박스 : MemberSearch 컴포넌트</p>
            <form>
                <div className='memberSearchBox'>
                    <div>
                        <span>기간</span>&nbsp;
                        <input type="text" ></input>&nbsp;
                        <input type="date" ></input>
                    </div>
                    <div>
                        <span>대상자명</span>&nbsp;
                        <input type="text"></input>
                    </div>
                    <div>
                        <span>성별</span>&nbsp;
                        <select>
                            <option value>남</option>
                            <option value>여</option>
                        </select>
                    </div>
                    <div>
                        <span>입소/이용안내</span>&nbsp;
                        <select>
                            <option value>이용</option>
                            <option value>이용하지않음</option>
                        </select>
                    </div>
                    <div>
                        <span>숙소</span>&nbsp;
                        <select>
                            <option value>1</option>
                            <option value>2</option>
                        </select>
                    </div>
                    <div>
                        <span>담당자명</span>
                        <input type="text"></input>
                    </div>
                    <div>
                        <button type='submit'>검색</button>&nbsp;
                        <button type='reset'>입력 초기화</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MemberSearch;