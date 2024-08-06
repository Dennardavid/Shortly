"use client";
import Link from "next/link";
import { useState } from "react";
import { signup } from "../login/actions";
import Aside from "@/components/aside";

function SignUp() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Calling the server action directly
    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to login page on success
      window.location.href = "/login";
    }
  };

  return (
    <section className="flex">
      <Aside />
      <div className="flex items-center w-[55%] justify-center h-screen">
        <div className="w-[60%]">
          <h1 className="text-left mb-2 font-bold text-lg">Sign up</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            {error && <span className="text-red-500">{error}</span>}
            <button type="submit" className="p-2 rounded-lg">
              Sign up
            </button>
          </form>
          <div className="text-right mt-3">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
