import Link from "next/link";
import { login } from './actions'

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[70%]">
        <h1 className="text-left mb-2 font-bold text-lg">Login</h1>
        <form className=" flex flex-col gap-3" >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            
          />

          <span className="text-red-500">{}</span>
          <button
            type="submit"
            className="p-2 rounded-lg"
            formAction={login}
          >
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
  );
}

export default Login;
