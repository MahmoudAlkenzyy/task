// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import useData from "../hooks/useData";
// import { useParams } from "react-router-dom";

// // Function to aggregate data by date for a selected customer
// const aggregateDataByDate = (
//   transactions: { id: number; customer_id: number; date: string; amount: number; name: string | undefined }[],
//   selectedCustomerId
// ) => {
//   if (transactions === []) return null;
//   const filteredData = transactions?.filter((transaction) => transaction.customer_id === selectedCustomerId);
//   const aggregatedData = filteredData?.reduce((acc, curr) => {
//     const { date, amount } = curr;
//     if (!acc[date]) {
//       acc[date] = 0;
//     }
//     acc[date] += amount;
//     return acc;
//   }, {});

//   return Object?.keys(aggregatedData)?.map((date) => ({
//     date,
//     totalAmount: aggregatedData[date],
//   }));
// };

// // Select a customer (e.g., customer with ID 3)

// const TransactionChart = () => {
//   const { id: selectedCustomerId } = useParams();
//   const { transactions } = useData();
//   console.log(transactions);

//   const aggregatedData = aggregateDataByDate(transactions ? transactions : [], selectedCustomerId);
//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <LineChart width={600} height={300} data={aggregatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
//     </div>
//   );
// };

// export default TransactionChart;
