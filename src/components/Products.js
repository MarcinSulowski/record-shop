import React from "react";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import Sort from "./Sort";
import PropTypes from "prop-types";

const Products = props => {
  const {
    loading,
    products,
    error,
    searchQuery,
    handleSort,
    sortingOption,
  } = props;

  let filteredProducts;

  if (handleSort) {
    sortProducts(sortingOption);
  }

  function sortProducts(sortType) {
    if (sortType === "price-ascending") {
      filteredProducts = products.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-descending") {
      filteredProducts = products.sort((a, b) => b.price - a.price);
    } else if (sortType === "byname") {
      filteredProducts = products.sort((a, b) => a.name.localeCompare(b.name));
    } 
    return filteredProducts;
  }

  function searchProduct(searchQuery) {
    return function(product) {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        !searchQuery
      );
    };
  }

  filteredProducts = products.filter(searchProduct(searchQuery));

  //the list of products to be returned in the ProductCard component
  let productView;

  if ((filteredProducts.length <= 0 && !searchQuery) || loading) {
    productView = <Loader />;
  } else if ((filteredProducts.length <= 0 && searchQuery) || error) {
    productView = <div className="error">{error}</div>;
  } else {
    productView = <ProductCard products={filteredProducts} />;
  } 

  return (
    <section className="section section--products">
      <header className="header--section">
        <h2 className="header__text">Products</h2>
      </header>
      <Sort handleSort={handleSort} />

      {productView}
    </section>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default Products;
