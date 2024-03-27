import './container.css';

function Container({ menuArr, setMenuArr, currentTab, setCurrentTab }) {
    console.log(currentTab)
    console.log(menuArr)
    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    }
    const onRemove = (name, index) => {
        setMenuArr(menuArr.filter(menu => menu.name !== name));
        console.log(index + " " + currentTab + " " + menuArr.length)
        if ((index === currentTab) && (currentTab - 1 < 0)) {
            console.log("손");
        } else if (index === currentTab) {
            console.log("손손");
            setCurrentTab(currentTab - 1)
        }

        if (menuArr.length - 1 < currentTab) {
            console.log("손손손");
            setCurrentTab(currentTab - 1)
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