import Image from "next/image";
import working from "../../public/working_with_computer.webp";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between md:pl-32 mt-7 pb-40">
      <div className="self-center text-center md:text-start mx-5 md:max-w-2xl bg-green-400">
        <h1 className="font-bold text-5xl md:text-7xl text-VeryDarkBlue leading-tight -tracking-[2px]">
          More than just shorter links
        </h1>
        <p className=" font-medium text-GrayishViolet leading-8 max-w-[95%] md:w-[80%] text-lg md:text-xl mt-3 mx-auto md:mx-0">
          Build your brands recognition and get detailed insights on how your
          links are performing.
        </p>
        <Link href="/signup">
          <button type="button" title="get started" className="py-2 px-8 rounded-full mt-5">
            Get started
          </button>
        </Link>
      </div>
      <div className="desk-guy ml-11 md:ml-0 ">
        <Image src={working} width={850} height={482} alt="woking man" />
      </div>
    </section>
  );
}

export default HeroSection;
