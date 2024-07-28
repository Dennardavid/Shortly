import Image from "next/image";
import working from "../../public/working_with_computer.webp";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="flex justify-between pl-32 mt-7">
      <div className="self-center">
        <h1 className="font-bold text-7xl text-VeryDarkBlue leading-tight -tracking-[2px]">
          More than just shorter links
        </h1>
        <p className=" font-medium text-GrayishViolet leading-8 w-[80%] text-xl mt-3">
          Build your brands recognition and get detailed insights on how your
          links are performing.
        </p>
        <Link href="/signup">
          <button type="button" title="get started" className="py-2 px-8 rounded-full mt-5">
            Get started
          </button>
        </Link>
      </div>
      <div className="desk-guy">
        <Image src={working} width={850} height={482} alt="woking man" />
      </div>
    </section>
  );
}

export default HeroSection;
