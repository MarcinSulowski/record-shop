import React from "react";
import PropTypes from "prop-types";

const Sort = props => {
  const { handleSort } = props;

  document.addEventListener(
    "DOMContentLoaded",
    function() {
      document.querySelector(".sort-select").onchange = handleSort;
    },
    false
  );

  return (
    <select className="sort-select" name="sort">
      <option className="sort-select__option" value="">
        Sort records
      </option>
      <option className="sort-select__option" value="byname">
        By name
      </option>
      <option className="sort-select__option" value="price-ascending">
        By price (low to high)
      </option>
      <option className="sort-select__option" value="price-descending">
        By price (high to low)
      </option>
    </select>
  );
};

Sort.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default Sort;
