import './pagesCollapse.css'

function PagesCollapse({ name, menu, getTransTitle, conName }) {

    function menuHide(e) {
        if (e.target.nextSibling.className === "menu-side-menu") {
            e.target.nextSibling.className = 'menu-side-menu hide';
            e.target.className = 'menu-side-name afterIcon';
        } else {
            document.querySelectorAll('.menu-side-menu').forEach((e) => {
                e.className = 'menu-side-menu hide'
            })
            document.querySelectorAll('.menu-side-name').forEach((e) => {
                e.className = 'menu-side-name afterIcon'
            })
            e.target.nextSibling.className = 'menu-side-menu'
            e.target.className = 'menu-side-name afterIconRot';
        }
    }

    return (
        <li className='menu-side' >
            <div className='menu-side-name afterIcon' onClick={menuHide}>{name}</div>
            <div className='menu-side-menu hide'>
                {menu.map((e,i) => {
                    return(
                        <p onClick={() => getTransTitle(conName[i])} >{e}</p>
                    );
                })}
            </div>
        </li>
    );
}
export default PagesCollapse;