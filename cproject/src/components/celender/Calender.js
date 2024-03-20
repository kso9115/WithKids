import './calender.css';
import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import RenderHeader from './RenderHeader'
import RenderCells from './RenderCells.js'

function Calender() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        console.log(day);
        setSelectedDate(day);
    };
    const RenderDays = () => {
        const days = [];
        const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col " key={i}>
                    {date[i]}
                </div>,
            );
        }

        return <div className="days row">{days}</div>;
    };

    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            ></RenderHeader>
            {RenderDays()}
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            ></RenderCells>
        </div>
    );
};

export default Calender;