import Image from "next/image";
import shortlyLogo from "../../public/Shortly.webp";

function Aside() {
  return (
    <>
      <div className="w-[45%] bg-[url(../../public/pngwing.com.webp)] bg-cover bg-no-repeat">
        <h1>Welocome</h1>
        <p>full acces</p>
        <Image src={shortlyLogo} alt="shortly logo" />
      </div>
    </>
  );
}

export default Aside;
