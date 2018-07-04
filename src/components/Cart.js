import React from "react";

class Cart extends React.Component {
    constructor () {
        super ();

        this.state = {
            
        }
    }

  render() {
    return (
      <section className="section section--cart">
        <header className="header--section">
          <h2 className="header__text">Cart</h2>
        </header>

        <div className="cart" />
      </section>
    );
  }
}

export default Cart;
