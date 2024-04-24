import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";


export default function AttandanceChart(){

    const data = [["Age", "Weight"], [4, 5.5], [8, 12]]
    const options = {
      title: "아동 출석 통계",
      colors: ["gray"],
      titleTextStyle: {
        fontSize: 24
      }
    }


    return (
        <>
          {/* <Chart 
            chartType="LineChart"
            data={data}
            options={options}
          /> */}
        </>
      );

}