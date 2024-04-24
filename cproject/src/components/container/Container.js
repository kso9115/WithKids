import AttandanceChart from '../../pages/chartAPI/AttandanceChart';
import './container.css';

function Container({ menuArr, setMenuArr, currentTab, setCurrentTab, mainSub }) {

    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    }

    const onRemove = (name, index) => {
        setMenuArr(menuArr.filter(menu => menu.name !== name));

        if ((index === currentTab) && (currentTab - 1 < 0)) {

        } else if (index === currentTab) {
            setCurrentTab(currentTab - 1)
        }

        if (menuArr.length - 1 === currentTab) {
            setCurrentTab(currentTab - 1)
        }
    };

    return (
        <>
            <div className={`${mainSub}-container`}>
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
                                    (ele.name !== '메인' && mainSub === 'main')
                                        ? <div className="close"
                                            onClick={(event) => {
                                                event.stopPropagation(); //상위 요소로 이벤트 전파 방지
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