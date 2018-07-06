import React from "react";
import CartItem from "./CartItem";
import PropTypes from "prop-types";

const Cart = props => {
  const { cart, removeItem, updateQuantity, quantity } = props;

  const showCart = () => {
    document.querySelector(".cart-container").classList.toggle("collapsed");
  };

  return (
    <section className="cart-section">
      <header className="section__header">
        <h2 className="header__title">Cart</h2>
      </header>
      <button className="btn btn--show" onClick={showCart}>
        Show cart
      </button>

      <div className="cart-container collapsed">
        {!cart.length && <div className="empty-cart">Your cart is empty</div>}
        {cart.map(item => (
          <CartItem
            key={`cart-item-${item.id}`}
            item={item}
            removeItem={removeItem}
            quantity={quantity}
            updateQuantity={updateQuantity}
          />
        ))}
        {cart.length > 0 && (
          <p className="cart-total">
            Total amount:{" "}
            {cart
              .map(item => item.price * item.quantity)
              .reduce((acc, val) => acc + val, 0)}{" "}
            PLN
          </p>
        )}
      </div>
    </section>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default Cart;
