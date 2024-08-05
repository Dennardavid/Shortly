"use client";
import Link from "next/link";
import { useState } from "react";
import { login } from "./actions";

function Login() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Calling the server action directly
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    }
  };

  return (
    <section className="flex">
      <div className="w-[45%] bg-cyan"></div>
      <div className="flex flex-col items-center w-[55%] justify-center h-screen">
        <div className="w-[60%]">
          <h1 className="text-left mb-2 font-bold text-lg">Login</h1>
          <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Email" />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />

            {error && <span className="text-red-500">{error}</span>}
            <button type="submit" className="p-2 rounded-lg" formAction={login}>
              Login
            </button>
          </form>
          <div className="text-right mt-3">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
