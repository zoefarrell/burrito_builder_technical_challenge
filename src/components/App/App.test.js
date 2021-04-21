import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { getOrders } from "../../apiCalls";

import App from "./App";

jest.mock("../../apiCalls");

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders App component", () => {
    const orderName = "My Order";
    const orderIngredients = ["beans", "steak"];

    getOrders.mockResolvedValue({
      orders: [
        { id: 1, name: orderName, ingredients: orderIngredients },
        { id: 2, name: orderName, ingredients: orderIngredients },
        { id: 3, name: orderName, ingredients: orderIngredients },
      ],
    });
    render(<App />);
    expect(screen.getByText(/Burrito Builder/)).toBeInTheDocument();
  });

  test("Fetches and displays orders", async () => {
    const testOrders = {
      orders: [
        {
          id: 1,
          name: "Pat",
          ingredients: [
            "beans",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno",
          ],
        },
        {
          id: 2,
          name: "Sam",
          ingredients: [
            "steak",
            "pico de gallo",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno",
          ],
        },
        {
          id: 3,
          name: "Alex",
          ingredients: [
            "sofritas",
            "beans",
            "sour cream",
            "carnitas",
            "queso fresco",
          ],
        }
      ],
    };

    getOrders.mockResolvedValue(testOrders);
    render(<App />);

    expect(getOrders).toHaveBeenCalledTimes(1);

    await waitFor(() => screen.getByText(/Pat/));
    expect(screen.getByText(/Pat/)).toBeInTheDocument();
    expect(screen.getByText(/Sam/)).toBeInTheDocument();
    expect(screen.getByText(/Alex/)).toBeInTheDocument();
  });

  test("Displays No order message when unable to load orders", async () => {
    getOrders.mockRejectedValue(new Error("Cannot GET /api/v1/ordersss"));

    render(<App />);

    expect(getOrders).toHaveBeenCalledTimes(1);
    await waitFor(() => screen.getByText(/No orders yet!/));
    expect(screen.getByText(/No orders yet!/)).toBeInTheDocument();
  });
});
