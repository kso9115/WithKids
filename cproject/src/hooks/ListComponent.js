import axios from "axios";
import React, { useEffect, useState } from "react";

function ListComponent({ name, setData, listUpdate }) {
    const [listData, setListData] = useState([]);
    //프로그램 테이블 전체 보관
    useEffect(() => {
        if (listUpdate !== true && listUpdate !== false) {
            axios.get(`/api/${name.name}/${name.name}Search`, {
                params: listUpdate
            })
                .then((response) => {
                    console.log(response.data);
                    setListData(response.data);
                    setData([])
                }).catch((error) => {
                    // handle error
                    console.log(error);
                })
        } else {
            axios.get(`/api/${name.name}/${name.name}List`)
                .then((response) => {
                    console.log(response.data)
                    setListData(response.data);
                }).catch((error) => {
                    // handle error
                    console.log(error);
                })
        }
    }, [listUpdate]);

    return (
        <>
            <b>{name.list}</b>
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
                                    <div key={e + i} style={{ display: 'grid' }} onClick={() => setData({...e})}>
                                        {name.menu.map((e2, i2) => {
                                            return (<div key={e2 + i2}>{e[e2]}</div>)
                                        })}
                                    </div>
                                );
                            }) :
                            <div>정보가 없습니다.</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(ListComponent);