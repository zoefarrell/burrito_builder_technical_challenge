import React, { Component } from "react";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.clearInputs();
    this.props.addOrder({ ...this.state });
  };

  clearInputs = () => {
    this.setState({ name: "", ingredients: [] });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleIngredientChange = (e) => {
    e.preventDefault();
    const changedIngredient = e.target.name;
    if (this.state.ingredients.includes(changedIngredient)) {
      this.setState({
        ingredients: this.state.ingredients.filter(
          (ingredient) => ingredient !== changedIngredient
        ),
      });
    } else {
      this.setState({
        ingredients: [...this.state.ingredients, changedIngredient],
      });
    }
  };

  formIsSubmittable = () => {
    return this.state.name && this.state.ingredients.length > 0;
  };

  render() {
    const possibleIngredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          onClick={(e) => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <label>Name: <input
          id="name-input"
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleNameChange(e)}
        /></label>

        {ingredientButtons}

        <p>Order: {this.state.ingredients.join(", ") || "Nothing selected"}</p>

        <button
          disabled={!this.formIsSubmittable()}
          onClick={(e) => this.handleSubmit(e)}
        >
          Submit Order
        </button>
      </form>
    );
  }
}

export default OrderForm;
