import './Attandance.css';

function Attandance() {
    return (
        <>
            <b>출석관리</b>
            <form>
                <div className='attandance'>
                    <div className='attandance_container'>
                        <div className='attandance_row_header'>
                            <div className='attandance_cell'>체크란</div>
                            <div className='attandance_cell'>전체그룹select</div>
                            <div className='attandance_cell'>이름</div>
                            <div className='attandance_cell'>출석률</div>
                            <div className='attandance_cell'>출/캠</div>
                            <div className='attandance_cell'>공/결</div>

                        </div>

                        <div className='attandance_row'>
                            <div className='attandance_cell'>체크란</div>
                            <div className='attandance_cell'>미금</div>
                            <div className='attandance_cell'>김수옥</div>
                            <div className='attandance_cell'>100%</div>
                            <div className='attandance_cell'>20/20</div>
                            <div className='attandance_cell'>0/0</div>
                        </div>
                    </div>

                </div>
            </form>
        </>

    );

}

export default Attandance;