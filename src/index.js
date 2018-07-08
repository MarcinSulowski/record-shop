import React from "react";
import ReactDOM from "react-dom";
import Products from "./components/Products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Search from "./components/Search";
import { handleResponse } from "./helpers";
import "./scss/styles.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      searchQuery: "",
      quantity: 1,
      sortingOption: "",
      loading: true,
      error: null,
    };

    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();

    if (sessionStorage["cachedCart"]) {
      this.setState({
        cart: [...JSON.parse(sessionStorage["cachedCart"])],
      });
    }
  }

  fetchProducts() {
    fetch("./products.json")
      .then(handleResponse)
      .then(response => {
        this.setState({
          products: response.records,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: "Oops! Something went wrong!",
          loading: false,
        });
      });
  }
  
  // Add an item to cart
  handleAddToCart(item) {
    const duplicate = this.state.cart.find(i => i.id === item.id);

    if (duplicate) {
      duplicate.quantity += 1;

      sessionStorage["cachedCart"] = JSON.stringify([...this.state.cart]);
      this.setState({ cart: [...JSON.parse(sessionStorage["cachedCart"])] });
    } else {
      sessionStorage["cachedCart"] = JSON.stringify([...this.state.cart, item]);
      this.setState({ cart: [...JSON.parse(sessionStorage["cachedCart"])] });
    }
  }

  // Remove an item from cart
  handleRemoveFromCart(item) {
    const newCart = [...this.state.cart];
    const idx = newCart.indexOf(item);
    newCart.splice(idx, 1);

    this.setState({ cart: newCart });
    sessionStorage.setItem("cachedCart", JSON.stringify(newCart));
  }

  // update products quantity
  updateQuantity() {
    sessionStorage["cachedCart"] = JSON.stringify([...this.state.cart]);

    this.setState({
      cart: [...JSON.parse(sessionStorage["cachedCart"])],
    });
  }

  //Sort products
  handleSort(e) {
    this.setState({ sortingOption: e.target.value });
  }

  // Search products
  handleSearch(e) {
    this.setState({ searchQuery: e.target.value });
    console.log(this.state.cart);
  }

  render() {
    const {
      products,
      cart,
      searchQuery,
      quantity,
      loading,
      error,
      sortingOption,
    } = this.state;

    return (
      <div className="page">
        <Header />
        <Search
          handleSearch={this.handleSearch}
          products={products}
          searchQuery={searchQuery}
        />
        <Cart
          cart={cart}
          removeItem={this.handleRemoveFromCart}
          updateQuantity={this.updateQuantity}
        />
        <Products
          handleSort={this.handleSort}
          handleAddToCart={this.handleAddToCart}
          products={products}
          loading={loading}
          error={error}
          updateQuantity={this.updateQuantity}
          quantity={quantity}
          searchQuery={searchQuery}
          sortingOption={sortingOption}
        />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
