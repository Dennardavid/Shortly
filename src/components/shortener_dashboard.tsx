import { FaRegCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";

export function DashboardShortener() {
  return (
    <div className="bg-white rounded-xl shadow-lg mt-4 p-5 flex flex-col">
      <h2 className="text-center text-VeryDarkBlue font-semibold text-lg">
        Shorten a new link
      </h2>
      
      <form className="flex justify-between mt-3 mb-7">
        <input
          type="text"
          placeholder="Paste your link here"
          className="w-[85%]"
        />
        <button className="px-4 rounded-lg">shorten it!</button>
      </form>
      <ShortenedComp />
    </div>
  );
}

function ShortenedComp() {
  return (
    <div className="mb-3 flex justify-between">
        <Image src='' alt='qr code'/>
      <p>long url</p>
      <p>short url</p>
      <div className="flex items-center gap-4">
        <FaRegCopy size={19} />
        <MdDeleteOutline size={20} />
        <button className="rounded-full px-4 py-1">details</button>
      </div>
    </div>
  );
}
