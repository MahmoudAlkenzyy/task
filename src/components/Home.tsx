import { useState } from "react";
import useData from "../hooks/useData";
import SortingBar from "./SortingBar";
import { Link } from "react-router-dom";

export default function Home() {
  const [sort, setSort] = useState("name");
  const { customers, transactions, isLoading } = useData();

  if (isLoading) return <div>Loading......</div>;

  const fullCustomersInfo = transactions?.map((trans) => {
    trans.name = customers?.find((cust) => cust.id === trans.customer_id)?.name;
    return trans;
  });
  const sortingCustomer = fullCustomersInfo?.sort(
    sort === "name"
      ? function (a, b) {
          if (a?.name < b?.name) {
            return -1;
          }
          if (a?.name > b?.name) {
            return 1;
          }
          return 0;
        }
      : function (a, b) {
          return a.amount - b.amount;
        }
  );

  return (
    <div className="container">
      <SortingBar sort={sort} setSort={setSort} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {fullCustomersInfo?.map((cust, idx) => {
            return (
              <tr key={idx}>
                <th>
                  <Link to={`/customer/${cust.customer_id}`} className="text-decoration-none text-dark-emphasis">
                    {cust?.name}
                  </Link>
                </th>
                <th>{cust.amount}</th>
                <th>{cust.date}</th>
                <th>Visa</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
