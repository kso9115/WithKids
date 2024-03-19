import { useState } from 'react';
import './Attandance.css';

import { addMonths, subMonths } from 'date-fns';
import AttandanceRenderH from './AttandanceRenderH';

function Attandance() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const RenderDays = () => {
        const days = [];
        const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

        for (let i = 0; i < 31; i++) {
            days.push(
                <div className="col " key={i}>
                    {date[i]}
                </div>
            );            
        }

        return <div className='days row'>{days}</div>

    }

    return (
        <>
            <AttandanceRenderH
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            ></AttandanceRenderH>
            {RenderDays()}
            {/* <form>
                <div className='attandance'>
                    <div className='attandance_container'>
                        <div className='attandance_row_header'>
                            <div className='attandance_cell'>□</div>
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
            </form> */}
        </>

    );

}

export default Attandance;