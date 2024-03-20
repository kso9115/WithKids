import './navbar.css'
import React from 'react'

const data = {
    name: '임명건',
    spot: '관리자'
}


function Navbar() {

    function dropdownHide(e) {
        if (e.target.parentElement.nextSibling.className === 'dropdown_menu') {
            e.target.parentElement.nextSibling.className = 'dropdown_menu hide'
        } else {
            e.target.parentElement.nextSibling.className = 'dropdown_menu'
        }
    }

    return (
        <div id='navbar'>
            <ul className='navbar_nav'>
                {/* <li className='nav_item'>
                    <div className='nav_icon'>
                        <img src="img/메시지파랑.png" alt="" />
                        <span></span>
                    </div>
                    <div className='dropdown_list'></div>
                </li> */}

                <li className='nav_item'>
                    <div className='nav_icon'>
                        <img src="img/알람파랑.png" alt="" />
                        <span>1</span>
                    </div>
                    <div className='dropdown_list'></div>
                </li>

                <div></div>

                <li className='nav_item'>
                    <div className='nav_icon' >
                        <p onClick={dropdownHide} >{data.name + ' ' + data.spot}</p>
                    </div>
                    <div className='dropdown_menu hide'>
                        <ul>
                            <li>Profile</li>
                            <li>Settings</li>
                            <li>Activity Log</li>
                            {/* <li>Logout</li> */}
                        </ul>
                        <div><p>Logout</p></div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default React.memo(Navbar);