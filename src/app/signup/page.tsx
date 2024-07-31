import Link from "next/link";

function SignUp() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-[70%]">
          <h1 className="text-left mb-2 font-bold text-lg">Sign up</h1>
          <form className=" flex flex-col gap-3">
            <label htmlFor="name">Full name:</label>
            <input type="text" name="name" id="name" placeholder="Full name" />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Email" />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="confirmpassword">Confirm Password:</label>

            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
            />
            <span className="text-red-500">{}</span>
            <button
              type="submit"
              className="bg-zinc-400/40 text-white p-2 rounded-lg"
            >
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
    </>
  );
}

export default SignUp;
