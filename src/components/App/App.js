import React, { Component } from "react";
import "./App.css";
import { getOrders, addOrder, deleteOrder } from "../../apiCalls";
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

  deleteOrder = (orderId) => {
    deleteOrder(orderId)
      .then(() =>
        this.setState({
          orders: this.state.orders.filter((order) => order.id !== orderId),
        })
      )
      .catch((err) =>
        console.error(`Error deleting order id ${orderId}:`, err)
      );
  };

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>
        <Orders
          id="orders"
          orders={this.state.orders}
          deleteOrder={this.deleteOrder}
        />
      </main>
    );
  }
}

export default App;
