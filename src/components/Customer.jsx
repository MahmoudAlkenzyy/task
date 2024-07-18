import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useData from "../hooks/useData";
import { eachDayOfInterval, format, subDays } from "date-fns";

const aggregateDataByDate = (transactions, selectedCustomerId) => {
  const filteredData = transactions?.filter((transaction) => transaction.customer_id == selectedCustomerId);
  const aggregatedData = filteredData?.reduce((acc, curr) => {
    const { date, amount } = curr;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += amount;
    return acc;
  }, {});
  if (aggregatedData === undefined) return;
  return Object.keys(aggregatedData).map((date) => ({
    date: format(date, "MMM dd"),
    totalAmount: aggregatedData[date],
    allDates: allDates.map((date) => {
      return format(date, "MMM dd");
    }),
  }));
};
const allDates = eachDayOfInterval({
  start: subDays(new Date("2022-01-02"), 1),
  end: new Date(),
});
const Customer = ({ id }) => {
  // const { id } = useParams();

  const { transactions } = useData();

  const aggregatedData = aggregateDataByDate(transactions, id);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="container mt-3">
      <div className="row align-items-center justify-content-center">
        <div className=" col-lg-4 container d-flex justify-content-center align-items-center ">
          <LineChart width={400} height={300} data={aggregatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="allDates" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        <div className="col-lg-4 d-flex justify-content-center align-items-center">
          <BarChart
            width={400}
            height={300}
            data={aggregatedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="allDates" />
            <YAxis />
            <Tooltip shared={false} trigger="click" />
            <Legend />
            <Bar dataKey="totalAmount" fill="#8884d8" />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
          </BarChart>
        </div>
        <div className="col-lg-4 d-flex justify-content-center align-items-center mb-3">
          <PieChart width={400} height={300}>
            <Pie
              data={aggregatedData}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {aggregatedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Pie
              data={aggregatedData}
              cx={200}
              cy={150}
              startAngle={0}
              endAngle={360}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="totalAmount"
            >
              {aggregatedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Customer;
