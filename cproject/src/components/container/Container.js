import './container.css';

function Container({ menuArr, setMenuArr, currentTab, setCurrentTab }) {

    console.log(menuArr)
    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    }
    const onRemove = (name, index) => {
        setMenuArr(menuArr.filter(menu => menu.name !== name));

        if ((index === currentTab) && (currentTab - 1 < 0)) {

        } else if (index === currentTab) {
            setCurrentTab(currentTab - 1)
        }

        if (menuArr.length - 1 < currentTab) {
            setCurrentTab(menuArr.length - 1)
        }
    };

    return (
        <>
            <div className={`main-container`}>
                <ul className="tabs">
                    {menuArr.map((ele, index) => {
                        return (
                            <li
                                key={index}
                                className={currentTab === index ? "tab-link current" : "tab-link"}
                                onClick={() => selectMenuHandler(index)}
                            >
                                {ele.name}
                                {
                                    (ele.name !== '메인')
                                        ? <div className="close"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onRemove(ele.name, index)
                                            }}
                                        >&nbsp;&nbsp;</div>
                                        : null
                                }
                            </li>
                        )
                    })}
                </ul>
                <div className="tab-content current">
                    {menuArr[currentTab].content}
                </div>
            </div>
        </>
    );
}

export default Container;