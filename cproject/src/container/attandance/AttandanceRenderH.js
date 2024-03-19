
import { Icon } from '@iconify/react';
import { format } from 'date-fns';

function AttandanceRenderH({ currentMonth, prevMonth, nextMonth }) {

    return (

        <div className="attandanceHead">
            <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
            &nbsp;<span className="text month">{format(currentMonth, 'M')}월</span>&nbsp;
            <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
        </div>
    );


}

export default AttandanceRenderH;