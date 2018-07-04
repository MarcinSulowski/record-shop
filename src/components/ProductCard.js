import React from "react";
import PropTypes from "prop-types";

const ProductCard = props => {
  const { products } = props;

  return (
    <div className="products-container">
      {products.map(product => (
        <figure className="product" key={`product-${product.id}`}>
          <img
            className="product__image"
            src={product.image}
            alt={product.name}
          />
          <figcaption className="product__caption">{product.name}</figcaption>
          <p className="product__price">{product.price} PLN</p>
          <button className="btn btn--cart">Add to cart</button>
        </figure>
      ))}
    </div>
  );
};

ProductCard.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductCard;
