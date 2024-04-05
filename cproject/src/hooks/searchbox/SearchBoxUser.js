import React, { useState } from "react";

function SearchBoxUser({ setWord }) {
    const [searchWord, setSearchWord] = useState("");

    function searchWordChange(event) {
        setSearchWord(event.target.value);
    }

    function setWordChange(params) {
        setWord(params);
    }

    return (
        <div className={`userSearch`}>
            <div>
                <div>제목</div>
                <input type="text" placeholder='검색어를 입력하세요.'
                    value={searchWord} onChange={searchWordChange}/>
                <button type='button' onClick={() => { setWordChange(searchWord) }}>검색</button>
                <button type='button' onClick={() => { setWordChange(""); setSearchWord("") }}>초기화</button>
            </div>
        </div>
    );
}

export default React.memo(SearchBoxUser);