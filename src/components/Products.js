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
    handleAddToCart,
    handleSort,
    quantity,
    sortingOption,
    updateQuantity,
  } = props;

  // filter products against a regular expression
  const regexp = new RegExp(searchQuery, "gi");
  const filteredProducts = products.filter(
    product => !!product.name.match(regexp)
  );

  // sort items in particular order
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

  //a list of products to be returned in the ProductCard component
  let productView;

  if ((!filteredProducts.length && !searchQuery) || loading) {
    productView = <Loader />;
  } else if ((!filteredProducts.length && searchQuery) || error) {
    productView = <div className="error">{error}</div>;
  } else {
    productView = filteredProducts.map(product => (
      <ProductCard product={product} quantity={quantity} updateQuantity={updateQuantity} handleAddToCart={handleAddToCart} key={`product-${product.id}`} />
    ));
  }

  return (
    <section className="products-section">
      <header className="section-header">
        <h2 className="section-header__title">Products</h2>
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
  handleAddToCart: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  sortingOption: PropTypes.string.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default Products;
