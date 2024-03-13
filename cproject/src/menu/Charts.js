import './pagesCollapse.css'

function Charts({ name, menu, getTransTitle, conName }) {

    return (
        <li className='menu-side'>
            <div className='menu-side-name' onClick={() => getTransTitle(conName)}>{name}</div>
        </li>
    );
}
export default Charts;