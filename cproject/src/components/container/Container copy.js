import './container.css';
import { useEffect, useState } from 'react';



function Container({ menuArr, subMenuArr, setMenuArr, currentTab, setCurrentTab, mainSub }) {
    const [menus, setMenus] = useState();
    console.log(menus);
    useEffect(() => {
        setMenus(menuArr);
    }, [menuArr])
    console.log(menuArr)
    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    }
    const onRemove = (name, index) => {
        setMenuArr(menus.filter(menu => menu.name !== name));
        setMenus(menus.filter(menu => menu.name !== name));
        if ((index === currentTab) && (currentTab - 1 < 0)) {

        } else if (index === currentTab) {
            setCurrentTab(currentTab - 1)
        }

        if (menus.length - 1 < currentTab) {
            setCurrentTab(menus.length - 1)
        }
    };

    function makeContainer() {
        return (
            <>
                <div className={`${mainSub}-container`}>
                    <ul className="tabs">
                        {(mainSub === 'main' ? menuArr : subMenuArr).map((ele, index) => {
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
                        {(mainSub === 'main' ? menuArr : subMenuArr)[currentTab].content}
                    </div>
                </div>
            </>
        );
    }
    // const onRemove = (name, index) => {
    //     setMenuArr(menuArr.filter(menu => menu.name !== name));
    //     // setMenus(menuArr.filter(menu => menu.name !== name));
    //     if ((index === currentTab) && (currentTab - 1 < 0)) {

    //     } else if (index === currentTab) {
    //         setCurrentTab(currentTab - 1)
    //     }

    //     if (menuArr.length - 1 < currentTab) {
    //         setCurrentTab(menuArr.length - 1)
    //     }
    // };
    console.log()
    if (!!menus) {
        return makeContainer();
    } else if (!!subMenuArr) { 
        return makeContainer();
    }
    else return null;
    // return (
    //     <>
    //         <div className={`${mainSub}-container`}>
    //             <ul className="tabs">
    //                 {(mainSub === 'main' ? menuArr : subMenuArr).map((ele, index) => {
    //                     return (
    //                         <li
    //                             key={index}
    //                             className={currentTab === index ? "tab-link current" : "tab-link"}
    //                             onClick={() => selectMenuHandler(index)}
    //                         >
    //                             {ele.name}
    //                             {
    //                                 (ele.name !== '메인' && mainSub === 'main')
    //                                     ? <div className="close"
    //                                         onClick={(event) => {
    //                                             event.stopPropagation();
    //                                             onRemove(ele.name, index)
    //                                         }}
    //                                     >&nbsp;&nbsp;</div>
    //                                     : null
    //                             }
    //                         </li>
    //                     )
    //                 })}
    //             </ul>
    //             <div className="tab-content current">
    //                 {(mainSub === 'main' ? menuArr : subMenuArr)[currentTab].content}
    //             </div>
    //         </div>
    //     </>
    // );
}

export default Container;