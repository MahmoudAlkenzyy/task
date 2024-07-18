export default function SearchInput({ setSearchTearm, searchTearm }) {
  return (
    <div>
      <input
        className="form-control"
        value={searchTearm}
        onChange={(e) => setSearchTearm(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
}
