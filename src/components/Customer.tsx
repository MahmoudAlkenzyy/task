import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useData from "../hooks/useData";

// Function to aggregate data by date for a selected customer
const aggregateDataByDate = () => {
  const { transactions } = useData();
  const filteredData = data.filter((transaction) => transaction.customer_id === customerId);
  const aggregatedData = filteredData.reduce((acc, curr) => {
    const { date, amount } = curr;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += amount;
    return acc;
  }, {});

  return Object.keys(aggregatedData).map((date) => ({
    date,
    totalAmount: aggregatedData[date],
  }));
};

// Select a customer (e.g., customer with ID 3)
const selectedCustomerId = 3;
const aggregatedData = aggregateDataByDate(transactions, selectedCustomerId);

const TransactionChart = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <LineChart width={600} height={300} data={aggregatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default TransactionChart;
