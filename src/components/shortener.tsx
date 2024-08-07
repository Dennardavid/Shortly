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
      className="bg-white rounded-xl px-5 py-8 w-[320px] h-[250px] relative"
    >
      <div className="h-16 w-16 rounded-full bg-DarkViolet flex items-center justify-center absolute -top-8">
        <Image src={data.image} alt={data.alt} width={35} height={35} />
      </div>
      <h3 className="mb-3 text-DarkViolet font-bold text-lg mt-9">
        {data.header}
      </h3>
      <p className="text-sm text-GrayishViolet leading-6 max-w-[260px]">
        {data.text}
      </p>
    </article>
  ));
  return (
    <section className="flex flex-col items-center bg-Gray mt-8 pb-20">
      <Shortener />
      <div className="text-center w-[450px]">
        <h2 className="font-bold text-3xl text-VeryDarkBlue">
          Advanced Statistics
        </h2>
        <p className="text-GrayishViolet leading-relaxed text-base mt-5">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
      </div>

      <hr />

      <div className="flex mt-16 justify-evenly w-full">{articleInfo}</div>
    </section>
  );
}

export function Shortener() {
  return (
    <>
      <div className="bg-[url(../../public/background2.webp)] bg-center bg-contain bg-no-repeat py-[72px] self-center lg:w-3/5 relative bottom-24">
        <form className="flex justify-center gap-5 w-full">
          <input
            type="text"
            placeholder="shorten your link here..."
            className="w-3/4 p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan"
          />
          <button type="submit" className="px-8 rounded-lg">
            Shorten It!
          </button>
        </form>
        <div className="wrongUrlContainer">
          <small id="wrong_url"></small>
        </div>
      </div>
    </>
  );
}

export default Stats;
