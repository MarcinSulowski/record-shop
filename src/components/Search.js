import React from "react";
import PropTypes from "prop-types";

const Search = props => {
  const { handleSearch, searchQuery } = props;

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search records"
        onChange={handleSearch}
        value={searchQuery}
      />
    </div>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Search;
