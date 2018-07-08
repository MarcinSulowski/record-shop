import React from "react";
import PropTypes from "prop-types";

class CartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.updateInputOnChange = this.updateInputOnChange.bind(this);
  }

  increment() {
    const { item, updateQuantity } = this.props;

    item.quantity += 1;
    updateQuantity();
  }

  decrement() {
    const { item, updateQuantity } = this.props;

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateQuantity();
    }
  }

  updateInputOnChange() {
    const { item, updateQuantity } = this.props;

    item.quantity = Number(this.refs.qtyInp.value);
    updateQuantity();
  }

  render() {
    const { item, removeItem } = this.props;
    return (
      <div className="cart-item">
        <img className="cart-item__img" src={item.image} alt="" />
        <p className="cart-item__caption">{item.name}</p>
        <div className="stepper">
          <input
            ref="qtyInp"
            type="number"
            className="stepper__input"
            value={item.quantity}
            onChange={this.updateInputOnChange}
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
        <p className="cart-item__price">{item.quantity * item.price} PLN</p>
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
  updateQuantity: PropTypes.func.isRequired,
};

export default CartItem;
