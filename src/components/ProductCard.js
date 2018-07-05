import React from "react";
import PropTypes from "prop-types";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProduct: {},
    };

    this.addSelectedItemToCart = this.addSelectedItemToCart.bind(this);
  }

  // adds selected item to cart and updates app state
  addSelectedItemToCart(product, quantity) {
    this.setState(
      {
        selectedProduct: {
          name: product.name,
          id: product.id,
          price: product.price,
          image: product.image,
          quantity: quantity,
        },
      },
      () => this.props.handleAddToCart(this.state.selectedProduct)
    );
  }

  render() {
    const { product, quantity } = this.props;

    return (
      <figure className="product">
        <img
          className="product__image"
          src={product.image}
          alt={product.name}
        />
        <figcaption className="product__caption">{product.name}</figcaption>
        <p className="product__price">{product.price} PLN</p>
        <button
          className="btn btn--add"
          onClick={() => this.addSelectedItemToCart(product, quantity)}
        >
          Add to cart
        </button>
      </figure>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default ProductCard;
