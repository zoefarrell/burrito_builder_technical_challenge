import React, { Component } from "react";
import "./App.css";
import { getOrders, addOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    getOrders()
      .then((response) => this.setState({ orders: response.orders }))
      .catch((err) => console.error("Error fetching orders:", err));
  }

  addOrder = (newOrder) => {
    addOrder(newOrder)
      .then((response) =>
        this.setState({ orders: [...this.state.orders, response] })
      )
      .catch((err) => console.error("Error adding order:", err));
  };

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>

        <Orders id="orders" orders={this.state.orders} />
      </main>
    );
  }
}

export default App;
