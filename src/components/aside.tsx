import Image from "next/image";
import Link from "next/link";
import shortlyLogo from "../../public/Shortly.webp";

function Aside() {
  return (
    <>
      <div className="w-[45%] bg-[url(../../public/pngwing.com.webp)] bg-cover bg-no-repeat">
        <h1>Welocome</h1>
        <p>full acces</p>
        <Image src={shortlyLogo} alt="Shortly_logo" />
      </div>
    </>
  );
}

export default Aside;
