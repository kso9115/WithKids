import { Icon } from '@iconify/react'
import { format } from 'date-fns'

function RenderHeader({ currentMonth, prevMonth, nextMonth }) {

    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
            </div>
        </div>
    );
};
export default RenderHeader;