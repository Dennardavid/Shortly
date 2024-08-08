"use client";
import Link from "next/link";
import { useState } from "react";
import Aside from "@/components/aside";
import Image from "next/image";
import Shortlylogo from "../../../public/Shortly.webp";
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
      <Aside />
      <div className="flex flex-col items-center w-[55%] justify-center h-screen relative">
        <Link href="/">
          <Image
            src={Shortlylogo}
            alt="shortly logo"
            className="absolute top-12 right-32"
          />
        </Link>
        <div className="w-[60%]">
          <h1 className="mb-2 font-extrabold text-3xl text-center text-VeryDarkBlue">
            Login
          </h1>
          <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
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
            <label htmlFor="login" className="sr-only"></label>
            <input type="submit" value="Login" name="login" className="p-2 rounded-lg mt-2 border-none bg-cyan text-white font-medium text-base" formAction={login} />
          </form>
          <div className="text-center mt-3">
            <p className="text-VeryDarkBlue">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-cyan">
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
