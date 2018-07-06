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
    this.setState({ cart: [...this.state.cart, item] });
  }

  // Remove item from cart
  handleRemoveFromCart(item) {
    const newCart = [...this.state.cart];
    const idx = newCart.indexOf(item);
    newCart.splice(idx, 1);
    this.setState({ cart: newCart });
  }

  updateQuantity(quantity) {
    this.setState({ quantity });
  }

  //Sort products
  handleSort(e) {
    this.setState({ sortingOption: e.target.value });
  }

  // Search products
  handleSearch(e) {
    this.setState({ searchQuery: e.target.value });
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
          quantity={quantity}
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
