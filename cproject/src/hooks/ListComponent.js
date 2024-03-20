function ListComponent({ name, data }) {

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
                        height:'100%',
                        overflow: 'auto'
                    }}>
                        {/* 클릭 이벤트를 위한 한줄 감싸기 */}
                        <div style={{
                            display: 'grid',
                            backgroundColor: 'var(--admin)',
                            fontWeight: 'bold',
                            position: 'sticky',
                            top:'0'
                        }}>
                            {name.title.map((e, i) => {
                                return (<div key={`${name.name}head${i}`}>{e}</div>);
                            })}
                        </div>
                        {data.map((e, i) => {
                            return (
                                <div key={e + i} style={{display: 'grid'}}>
                                    {name.menu.map((e2, i2) => {
                                        return (<div key={e2 + i2}>{e[e2]}</div>)
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListComponent;