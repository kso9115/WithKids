import './container.css';

function ContainerSub({ menuArr, currentTab, setCurrentTab }) {

    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    }

    return (
        <>
            <div className={`sub-container`}>
                <ul className="tabs">
                    {menuArr.map((ele, index) => {
                        return (
                            <li
                                key={index}
                                className={currentTab === index ? "tab-link current" : "tab-link"}
                                onClick={() => selectMenuHandler(index)}
                            >
                                {ele.name}
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

export default ContainerSub;