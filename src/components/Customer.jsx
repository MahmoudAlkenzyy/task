import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useData from "../hooks/useData";
import { useParams } from "react-router-dom";
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
const Customer = () => {
  const { id } = useParams();

  const { transactions } = useData();

  const aggregatedData = aggregateDataByDate(transactions, id);

  console.log(aggregatedData);
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <LineChart width={600} height={300} data={aggregatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="allDates" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Customer;
