
import ApexChart from "react-apexcharts";
import { apiCall } from "../../server/apiService";
import { useEffect, useState } from "react";


function MealChart() {
  const [chartdata,setChartdata]=useState([]);
    const options = {
      chart: {
        type: "bar",
        height: 350,
        width: 500,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '12px',
                fontWeight: 900,
              }
            }
          }
        },
      },
      stroke: { 
        width : 1 , colors : ['#FFF'] 
      },
      title : {
        text: '급식 월별 데이터'
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val 
          }
        }
      },
      xaxis: {
        labels: {
          formatter: function (val) {
            return val
          }
        },
        categories: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      },
      fill: {
        opacity: 1
      },
      noData: {
        text: 'Loading...'
      }
    };
  
    const series = [
      {
        name: "조식",
        // data: [100, 150, 100, 180, 200, 130, 120, 125, 160, 200, 100, 80],
        data: chartdata.brk_meal || [],
        color: "var(--admin)" 
      },
      {
        name: "중식",
        // data: [150, 180, 150, 180, 220, 150, 130, 130, 160, 250, 110, 90],
        data: chartdata.lnc_meal || [],
        color: "var(--blue2)" 
      },
      {
        name: "석식",
        // data: [180, 200, 180, 200, 220, 200, 200, 220, 230, 260, 170, 190],
        data: chartdata.dnr_meal || [],
        color: "var(--heavyblue)" 
      },
      {
        name: "간식",
        // data: [189, 202, 183, 210, 229, 208, 207, 223, 230, 261, 175, 200],
        data: chartdata.snk_meal || [],
        color: "var(--lightblue)" ,
      }
      // Mealmgnm 로 데이터 변경

    ];
    
    useEffect(()=>{
      apiCall('/meal/chartData','POST', null , null)
      .then((res) => {
          setChartdata(res.data);
          // console.log(chartdata);
      })
      .catch((err) => {
          console.log("시스템 오류 입니다."+err);
      });
    },[])
    
 
    return (
      <ApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        width={500}
      />
    );
  };
  
  export default MealChart;