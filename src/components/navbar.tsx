import Link from "next/link";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import shortlyLogo from "../../public/Shortly.webp";

function NavBar() {
  return (
    <header>
      <nav className="flex justify-between px-6 md:px-28 py-9 md:py-12">
        <div className="flex items-center justify-center gap-x-14">
          <Link href="/">
            <Image src={shortlyLogo} alt="Shortly_logo" />
          </Link>
          <ul className="text-GrayishViolet text-base font-medium hidden md:flex gap-x-10">
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex md:gap-x-10 items-center">
          <Link
            href="/login"
            className="font-medium text-base text-GrayishViolet"
          >
            Login
          </Link>

          <Link href="/signup">
            <button
              type="button"
              title="sign up"
              className="py-2 px-5 rounded-full"
            >
              Sign up
            </button>
          </Link>
        </div>
        <div className="md:hidden">
          <IoMenu size={30} />
        </div>
      </nav>
    </header>
  );
}
export default NavBar;
