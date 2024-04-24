import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "1주",
    출석: 32,
    결석: 3
  },
  {
    name: "2주",
    출석: 22,
    결석:5
  },
  {
    name: "3주",
    출석: 30,
    결석:2
  },
  {
    name: "4주",
    출석: 20,
    결석:7
  },

];

const AttCharts = () => {
  return (
    <>
    <div>

      <h1>아동 출결 합계</h1>
      <LineChart width={700} height={300} data={data}>
        <Line type="linear" dataKey="출석" stroke="#0CD3FF" strokeWidth={3} />
        <Line type="linear" dataKey="결석" stroke="#a6120d" strokeWidth={3} />
      
        <CartesianGrid stroke="#ccc" />
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
    </>
  );
};

export default AttCharts;