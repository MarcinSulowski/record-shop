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

  const regexp = new RegExp(searchQuery, "gi");
  const filteredProducts = products.filter(
    product => !!product.name.match(regexp)
  );

  switch (handleSort && sortingOption) {
    case "price-ascending":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-descending":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "byname":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  //the list of products to be returned in the ProductCard component
  let productView;

  if ((!filteredProducts.length && !searchQuery) || loading) {
    productView = <Loader />;
  } else if ((!filteredProducts.length && searchQuery) || error) {
    productView = <div className="error">{error}</div>;
  } else {
    productView = filteredProducts.map(product => (
      <ProductCard product={product} key={`product-${product.id}`} />
    ));
  }

  return (
    <section className="section section--products">
      <header className="header--section">
        <h2 className="header__text">Products</h2>
      </header>
      <Sort handleSort={handleSort} />
      <div className="products-container">{productView}</div>
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
