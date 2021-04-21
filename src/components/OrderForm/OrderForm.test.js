import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
} from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { addOrder } from "../../apiCalls";

import OrderForm from "./OrderForm";

jest.mock("../../apiCalls");

describe("OrderForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders name input, ingreedients, and order", () => {
    render(<OrderForm />);
    expect(screen.getByText(/Order: Nothing selected/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /steak/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /steak/i })).not.toBeDisabled();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  test("Adds and removes to order when ingredient button clicked", () => {
    render(<OrderForm addOrder={addOrder} />);

    fireEvent.click(screen.getByRole("button", { name: /beans/i }));
    fireEvent.click(screen.getByRole("button", { name: /steak/i }));
    expect(screen.getByText(/Order: beans, steak/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /beans/i }));
    expect(screen.queryByText(/Order: beans, steak/)).not.toBeInTheDocument();
    expect(screen.getByText(/Order: steak/)).toBeInTheDocument();
  });

  test("Users can fill out the form and submit", () => {
    const orderName = "My Order";
    const orderIngredients = ["beans", "steak"];

    render(<OrderForm addOrder={addOrder} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: orderName },
    });
    fireEvent.click(screen.getByRole("button", { name: /beans/i }));
    fireEvent.click(screen.getByRole("button", { name: /steak/i }));
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(addOrder).toHaveBeenCalledTimes(1);
    expect(addOrder).toHaveBeenCalledWith({
      name: orderName,
      ingredients: orderIngredients,
    });
  });

  test("values are cleared on when form is submitted", () => {
    const orderName = "My Order";

    render(<OrderForm addOrder={addOrder} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: orderName },
    });
    fireEvent.click(screen.getByRole("button", { name: /beans/i }));
    fireEvent.click(screen.getByRole("button", { name: /steak/i }));
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.queryByText(orderName)).not.toBeInTheDocument();
    expect(screen.queryByText(/Order: beans, steak/)).not.toBeInTheDocument();
  });

  test("Submit button is disabled if no order name filled in", () => {
    render(<OrderForm addOrder={addOrder} />);
    fireEvent.click(screen.getByRole("button", { name: /beans/i }));
    fireEvent.click(screen.getByRole("button", { name: /steak/i }));
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(addOrder).toHaveBeenCalledTimes(0);
  });

  test("Submit button is disabled if no ingredients selected", () => {
    render(<OrderForm addOrder={addOrder} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "My Order" },
    });
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(addOrder).toHaveBeenCalledTimes(0);
  });
});
