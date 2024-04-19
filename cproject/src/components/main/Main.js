import ReactApexChart from "react-apexcharts";

function Main() {

    const state = {

        series: [37, 6 ],
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
        <ReactApexChart options={state.options} series={state.series} type="pie" width={380} />
    );
}
export default Main;