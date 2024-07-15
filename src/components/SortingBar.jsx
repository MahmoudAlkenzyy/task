export default function SortingBar({ sort, setSort }) {
  return (
    <div className="d-flex justify-content-end py-3">
      <div className="btn-group text-end" role="group" aria-label="Basic example">
        <button
          type="button"
          className={`btn btn-primary ${sort === "name" && "active"}`}
          onClick={() => {
            setSort("name");
          }}
        >
          Name
        </button>
        <button
          type="button"
          className={`btn btn-primary ${sort === "amount" && "active"}`}
          onClick={() => {
            setSort("amount");
          }}
        >
          Amount
        </button>
      </div>
    </div>
  );
}
