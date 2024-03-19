import './pagesCollapse.css'

function Charts({ name, getTransTitle, conName,img }) {

    return (
        <li className='menu-side'>
            <div className='menu-side-name2' onClick={() => getTransTitle(conName)}>
                <img src={img} alt='' style={{
                    width: '18px',
                    height: '18px',
                    marginRight: '7px'
                }}></img>
                {name}
            </div>
        </li>
    );
}
export default Charts;