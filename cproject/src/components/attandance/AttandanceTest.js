import { useRef, useState } from 'react';
import './attandanceTest.css'
import { Icon } from '@iconify/react'
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, addDays } from 'date-fns';

// function ChildComponent() {
//     const list = useRef();

//     return (

//     );
// }

function AttandanceMangement() {

    const [currentYear, setCurrentYear] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    let day = startDate;
    let count = 0;
    const thisMonth = format(currentMonth, 'yyyy') + format(currentMonth, 'M')
        === format(selectedDate, 'yyyy') + format(selectedDate, 'M') ? "block" : "none";
    let size = format(monthEnd, 'd');
    let rows = 70 / size + "%";

    for (let i = 1; i < size; i++) {
        rows += " " + 70 / size + "%";
    }

    if (format(monthStart, 'M') === format(startDate, 'M')) {
        count = format(startDate, 'd') * 1
    } else {
        count = format(addDays(startDate, 7), 'd') * 1
    }
    // console.log(format(monthStart, 'M'));
    // console.log(format(startDate, 'M'));
    console.log(count + 1);
    return (
        <div className="att_mng">
            <div>
                <Icon icon="bi:arrow-left-circle-fill" ></Icon>
                {format(currentMonth, 'yyyy')}년
                {format(currentMonth, 'M')}월
                <Icon icon="bi:arrow-right-circle-fill" ></Icon>
                <div style={{ display: thisMonth }}>이번달</div>
            </div>
            <div></div>
            <div>
                <div className='att_mng_list' style={{
                    display: 'grid',
                    gridTemplateColumns: "2% 8% 5% 5% 5% 5% " + rows
                }}>
                    <div><input type="checkbox" /></div>
                    <div><select></select></div>
                    <div>이름</div>
                    <div>출석률</div>
                    <div>출석</div>
                    <div>결석</div>
                    {Array.from({ length: size }, (_, index) => {
                        if ((index + 1) % 7 === 0) {
                            count += 7;
                        }
                        return (
                            <div className={index + 1 === count - 1 ? "colorBlue" :
                                index + 1 === count ? "colorRed" : ""} key={index + 1}>{index + 1}</div>
                        );
                    })}
                </div>
                {/* <ChildComponent /> */}
            </div>
        </div>
    );

}

export default AttandanceMangement;

