import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import axios from 'axios';

function RenderCells({ currentMonth, selectedDate, onDateClick }) {
    const [stfAtn, setStfAtn] = useState([]);

    const hide = useRef();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    let yymmddformatDate = '';

    useEffect(() => {
        axios.get(`/api/staff/staffAtnList`)
            .then((response) => {
                console.log(response.data)
                setStfAtn(response.data);
            }).catch((error) => {
                // handle error
                console.log(error);
            })
    }, [])

    function isDate(element, yymmddformatDate) {
        if (element.staffDate === yymmddformatDate) {
            return true;
        }
    }

    function leftPad(value) {
        if (value >= 10) {
            return value;
        }
        return `0${value}`;
    }

    function toStringByFormatting(source, delimiter = '-') {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());

        return [year, month, day].join(delimiter);
    }

    function handleMouseOver(event) {
        console.log(event.target.nextSibling);
        event.target.nextSibling.style.display = 'block'
    }

    function handleMouseOut(event) {
        event.target.nextSibling.style.display = 'none'
    }

    // console.log(day);
    // console.log(stfAtn);
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            let coler;
            if (i === 0) {
                coler = 'colRed';
            } else if (i === 6) {
                coler = 'colBlue';
            }
            formattedDate = format(day, 'd');
            // yymmddformatDate = toStringByFormatting(day);
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${!isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                                ? 'not-valid'
                                : 'valid'
                        } ${coler}`}
                    key={day}
                // onClick={() => {
                //     console.log(parse(cloneDay))
                //     onDateClick(parse(cloneDay))
                // }}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                    {
                        stfAtn.map((e) => {
                            if (e.staffDate === toStringByFormatting(cloneDay)) {
                                return (
                                    <div key={`${e.staffId}${e.staffDate}`}>
                                        <div className='atnContent' 
                                            onMouseOver={handleMouseOver}
                                            onMouseOut={handleMouseOut}
                                        >{`${e.staffNm} : ${e.staffAtn}`}
                                        </div>
                                        <div className={i < 2 ? 'atnHoverBox1' : 'atnHoverBox2'}>
                                            <p>{`${e.staffNm} : ${e.staffAtn}`}</p>
                                            <p>내용: {e.content}</p>
                                        </div>
                                    </div>
                                );
                            } else return null;
                        })
                    }
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};
export default RenderCells;