import Image from "next/image";

function Stats() {
  const articles = [
    {
      image: "/brand.webp",
      alt: "Brand_recognition",
      header: "Brand Recognition",
      text: "Boost your brand recognition with each link. Generic links don't mean a thing. Branded links help instil confidence in your content.",
    },
    {
      image: "/details.webp",
      alt: "detailed_records",
      header: "Detailed Records",
      text: "Gain insights into who is clicking your links. Knowing when and where people engage with your content help inform better decision.",
    },
    {
      image: "/customize.webp",
      alt: "fully_customizable",
      header: "Fully Customizable",
      text: "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    },
  ];

  const articleInfo = articles.map((data) => (
    <article
      key={data.header}
      className="bg-white rounded-xl px-5 py-6 lg:w-[320px] lg:h-[250px] relative text-center md:text-left"
    >
      <div className="h-16 w-16 rounded-full bg-DarkViolet flex items-center justify-center m-auto absolute -top-8">
        <Image src={data.image} alt={data.alt} width={35} height={35} />
      </div>
      <h3 className="mb-3 text-DarkViolet font-bold text-lg mt-9">
        {data.header}
      </h3>
      <p className="text-sm text-GrayishViolet leading-6 md:max-w-[260px]">
        {data.text}
      </p>
    </article>
  ));
  return (
    <section className="flex flex-col items-center bg-Gray mt-8 pb-20">
      <Shortener />
      <div className="text-center w-[80%] md:w-[450px]">
        <h2 className="font-bold text-3xl text-VeryDarkBlue">
          Advanced Statistics
        </h2>
        <p className="text-GrayishViolet leading-relaxed text-base mt-5">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
      </div>

      <div className="flex flex-col gap-12 md:gap-7 lg:justify-evenly justify-center md:flex-row mt-16  w-full px-5">
        {articleInfo}
      </div>
    </section>
  );
}

export function Shortener() {
  return (
    <>
      <div className="bg-[url(../../public/background2.webp)] bg-center bg-no-repeat py-6 md:py-[45px] rounded-lg relative bottom-16 md:bottom-24 w-[90%] xl:w-[75%] 2xl:w-[58%]">
        <form className="flex flex-col md:flex-row justify-center gap-5 w-3/4 md:w-[90%] mx-auto">
          <input
            type="text"
            placeholder="shorten your link here..."
            className="md:w-[80%] p-2 md:p-3 lg:p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan"
          />
          <button type="submit" className="md:w-32 lg:w-48 lg:px-8 py-2 lg:py-3 rounded-lg">
            Shorten It!
          </button>
        </form>
        <div>
          <small id="wrong_url"></small>
        </div>
      </div>
    </>
  );
}

export default Stats;
