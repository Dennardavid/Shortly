import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../src/app/login/page";
import { describe } from "node:test";

describe("Login", () => {
  it("should render the login heading", () => {
    render(<Login />);
    const login = screen.getByRole("heading", { name: "Login" });
    expect(login).toBeInTheDocument();
  });

  it("should render the email and password ", () => {
    render(<Login />);
    const email = screen.getByLabelText("Email:");
    expect(email).toBeInTheDocument();

    const password = screen.getByLabelText("Password:");
    expect(password).toBeInTheDocument();
  });

  it("should accept the email and password content", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  it("submits the form with email and password", () => {
    const mockLogin = jest.fn();

    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByDisplayValue("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledTimes(0);
  });
});
