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
    <article key={data.header} className="tag-cards">
      <div className="article-image">
        <Image src={data.image} alt={data.alt} width={50} height={50} />
      </div>
      <h3>{data.header}</h3>
      <p>{data.text}</p>
    </article>
  ));
  return (
    <section>
      <Shortener />
      <div className="stats-write-up">
        <h2>Advanced Statistics</h2>
        <p>
          Track how your links are performing across the web with our advanced
          statistics dashboard
        </p>
      </div>

      <hr />

      <div className="Cards-container">{articleInfo}</div>
    </section>
  );
}

function Shortener() {
  return (
    <>
      <div className="bg-[url(../../public/background2.webp)] bg-no-repeat">
        <form className="input-form">
          <input
            type="text"
            placeholder="shorten your link here..."
            className="input"
          />
          <button type="submit" className="submit">
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
