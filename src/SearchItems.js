import React from "react";

const SearchItems = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchItem"></label>
      <input
        role="search Item"
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search item"
      />
    </form>
  );
};

export default SearchItems;
