import { useState } from "react";
import useData from "../hooks/useData";
import SortingBar from "./SortingBar";
import Customer from "./Customer";
import SearchInput from "./SearchingBar";

export default function Home() {
  const [sort, setSort] = useState("amount");
  const [id, setId] = useState(1);
  const [search, setSearch] = useState("");
  const { customers, transactions, isLoading } = useData();

  if (isLoading) return <div>Loading......</div>;

  const fullCustomersInfo = transactions?.map((trans) => {
    trans.name = customers?.find((cust) => cust.id === trans.customer_id)?.name;
    return trans;
  });
  let sortingCustomer = fullCustomersInfo?.sort(
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
  console.log(customers);
  sortingCustomer = sortingCustomer?.filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <div>
        <Customer id={id} />
      </div>
      <SearchInput searchTearm={search} setSearchTearm={setSearch} />
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
          {sortingCustomer?.map((cust, idx) => {
            return (
              <tr key={idx}>
                <th>
                  <span
                    to={`/customer/${cust.customer_id}`}
                    className="text-decoration-none text-dark-emphasis"
                    onClick={() => {
                      setId(cust.customer_id);
                    }}
                  >
                    {cust?.name}
                  </span>
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
