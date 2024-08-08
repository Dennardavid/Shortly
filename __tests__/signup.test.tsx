import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../src/app/signup/page";
import { describe } from "node:test";

describe("Signup", () => {
  it("should render the signup heading", () => {
    render(<SignUp />);
    const signup = screen.getByRole("heading", { name: "Sign up" });
    expect(signup).toBeInTheDocument();
  });

  it("should render the username, email and password ", () => {
    render(<SignUp />);
    const email = screen.getByLabelText("Email:");
    expect(email).toBeInTheDocument();

    const password = screen.getByLabelText("Password:");
    expect(password).toBeInTheDocument();

    const username = screen.getByLabelText("User name:");
    expect(username).toBeInTheDocument();
  });

  it("should accept the username, email and password content", () => {
    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    const userrNameInput = screen.getByPlaceholderText(
      "User name"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");

    fireEvent.change(userrNameInput, { target: { value: "David Dennar" } });
    expect(userrNameInput.value).toBe("David Dennar");
  });
});
