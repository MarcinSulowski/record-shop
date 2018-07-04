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
      category: "",
      quantity: 1,
      sortingOption: "",
      loading: true,
      error: null,
    };

    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
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

  componentDidMount() {
    this.fetchProducts();
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
    const { products, cart, totalItems, totalAmount, searchQuery, category, quantity, loading, error, sortingOption } = this.state;

    return (
      <div className="page">
        <Header />
        <Search handleSearch={this.handleSearch} products={products} searchQuery={searchQuery} />
        <Cart />
        <Products handleSort={this.handleSort} products={products} loading={loading} error={error} searchQuery={searchQuery} sortingOption={sortingOption}/>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
