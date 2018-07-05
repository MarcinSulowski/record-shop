import React from "react";
import PropTypes from "prop-types";

class CartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.quantity,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.updateOnChange = this.updateOnChange.bind(this);
  }

  increment() {
    this.setState(
      prevState => ({ quantity: Number(prevState.quantity) + 1 }),
      this.props.updateQuantity(this.state.quantity)
    );
  }

  decrement() {
    if (this.state.quantity > 1) {
      this.setState(
        prevState => ({ quantity: Number(prevState.quantity) - 1 }),
        this.props.updateQuantity(this.state.quantity)
      );
    }
  }

  // updates quantity on input change
  updateOnChange() {
    this.setState(
      { quantity: this.refs.qty.value },
      this.props.updateQuantity(this.state.quantity)
    );
  }

  render() {
    const { item, removeItem } = this.props;

    return (
      <div className="cart-item">
        <img className="cart-item__img" src={item.image} alt="" />
        <p className="cart-item__caption">{item.name}</p>
        <div className="stepper">
          <input
            ref="qty"
            type="number"
            className="stepper__input"
            value={this.state.quantity}
            onChange={this.updateOnChange}
          />
          <div className="stepper__btns">
          <button className="stepper__btn btn" onClick={this.increment}>
            +
          </button>
          <button className="stepper__btn btn" onClick={this.decrement}>
            –
          </button>
          </div>
        </div>
        <p className="cart-item__price">
          {this.state.quantity * item.price}PLN
        </p>
        <button
          className="cart__remove-btn btn"
          onClick={() => removeItem(item)}
        >
          x
        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default CartItem;
