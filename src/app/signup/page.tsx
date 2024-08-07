"use client";
import Link from "next/link";
import { useState } from "react";
import { signup } from "../login/actions";
import Image from "next/image";
import Aside from "@/components/aside";
import Shortlylogo from "../../../public/Shortly.webp";

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
      <div className="flex items-center w-[55%] justify-center h-screen flex-col relative">
        <Link href="/">
          <Image
            src={Shortlylogo}
            alt="shortly logo"
            className="absolute top-12 right-32"
          />
        </Link>
        <div className="w-[60%]">
          <h1 className="mb-2 font-extrabold text-3xl text-center text-VeryDarkBlue">
            Sign up
          </h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-VeryDarkBlue">
              User name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="User name"
              required
            />
            <label htmlFor="email" className="text-VeryDarkBlue">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <label htmlFor="password" className="text-VeryDarkBlue">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            {error && <span className="text-red-500">{error}</span>}
            <button type="submit" className="p-2 rounded-lg mt-2">
              Sign up
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-cyan">
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
