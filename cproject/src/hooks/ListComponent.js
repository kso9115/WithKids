import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiCall } from "../server/apiService";

function ListComponent({ name, setData, listUpdate }) {
    const [listData, setListData] = useState([]);
    //프로그램 테이블 전체 보관
    useEffect(() => {
        if (listUpdate !== true && listUpdate !== false) {
            apiCall(`/${name.name}/${name.name}Search`, 'GET', listUpdate)
                .then((response) => {
                    setListData(response.data);
                    setData([])
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            apiCall(`/${name.name}/${name.name}List`, 'GET')
                .then((response) => {
                    setListData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [listUpdate]);

    return (
        <>
            
            <div className={`${name.name}List`} style={{
                marginTop: '5px',
                padding: '5px',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'var(--mgray)',
                height: 'calc(100% - 26px)',
                fontSize: '15px',
            }}>
                <div className={`${name.name}List_container`} style={{
                    height: '100%',
                }}>
                    <div className={`${name.name}List_row`} style={{
                        height: '100%',
                        overflow: 'auto'
                    }}>
                        {/* 클릭 이벤트를 위한 한줄 감싸기 */}
                        <div style={{
                            display: 'grid',
                            backgroundColor: 'var(--admin)',
                            fontWeight: 'bold',
                            position: 'sticky',
                            top: '0'
                        }}>
                            {name.title.map((e, i) => {
                                return (<div key={`${name.name}head${i}`}>{e}</div>);
                            })}
                        </div>
                        {listData.length > 0 ?
                            listData.map((e, i) => {
                                return (
                                    <div key={e + i} style={{ display: 'grid' }} onClick={() => setData({ ...e })}>
                                        {name.menu.map((e2, i2) => {
                                            return (<div key={e2 + i2}>{e[e2]}</div>)
                                        })}
                                    </div>
                                );
                            }) :
                            <div className={`${name.name}List_none`}>정보가 없습니다.</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(ListComponent);