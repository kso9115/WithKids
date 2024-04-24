import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, addDays, addMonths } from 'date-fns';
import { Icon } from '@iconify/react'
import "./attandanceStatistic.css"
import { apiCall } from "../../server/apiService";

function AttandanceStatistic() {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [attCount, setAttCount] = useState([]);
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    let count = 0;
    useEffect(() => {
        apiCall('/att/attCount', 'GET', { attandanceDate: format(currentMonth, 'yyyy-MM-dd') })
            .then((response) => {
                setAttCount(response.data);
            })
            .catch((error) => {
                console.error(error);
            })

    }, [currentMonth])
    // function addDays(date, days) {
    //     const clone = new Date(date);
    //     clone.setDate(date.getDate() + days)
    //     return clone;
    // }
    if (format(monthStart, 'M') === format(startDate, 'M')) {
        count = format(startDate, 'd') * 1
    } else {
        count = format(addDays(startDate, 7), 'd') * 1
    }
    console.log(count);
    console.log(format(currentMonth, 'dd') % 7);
    
    const tomorrow = () => {
        if (format(currentMonth, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) return;
        if (format(currentMonth, 'dd') % 7 === count - 2) setCurrentMonth(addDays(currentMonth, 3));
        else if (format(currentMonth, 'dd') % 7 === count - 1) setCurrentMonth(addDays(currentMonth, 2));
        else setCurrentMonth(addDays(currentMonth, 1));
        // setCurrentMonth(addDays(currentMonth, 1));
    };
    const yesterday = () => {
        if (format(currentMonth, 'dd') % 7 === (count + 1) % 7) setCurrentMonth(addDays(currentMonth, -3));
        else if (format(currentMonth, 'dd') % 7 === (count) % 7) setCurrentMonth(addDays(currentMonth, -2));
        else setCurrentMonth(addDays(currentMonth, -1));
        // setCurrentMonth(addDays(currentMonth, -1));
    };

    const state = {
        series: attCount.length === 0 ? [1] : attCount,
        options: {
            chart: {
                width: 500,
                type: 'pie',
            },
            // labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            labels: ['출석', '결석'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    }

    return (
        <div>
            <div style={{
                width: '25%',
                height: '100%',
            }}>
                <div className="attSttstIcon">
                    <Icon icon="bi:arrow-left-circle-fill" onClick={yesterday}></Icon>
                    {format(currentMonth, 'yyyy-MM-dd')}
                    <Icon className={format(currentMonth, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? "dateNone" : ""}
                        icon="bi:arrow-right-circle-fill" onClick={tomorrow}></Icon>
                </div>
                <ReactApexChart options={state.options} series={state.series} type="pie" width={380} />
            </div>

        </div>
    );
}

export default AttandanceStatistic;