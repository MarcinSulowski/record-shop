import React from "react";
import PropTypes from "prop-types";

const ProductCard = props => {
  const { product } = props;

  return (
    <figure className="product">
      <img className="product__image" src={product.image} alt={product.name} />
      <figcaption className="product__caption">{product.name}</figcaption>
      <p className="product__price">{product.price} PLN</p>
      <button className="btn btn--cart">Add to cart</button>
    </figure>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
