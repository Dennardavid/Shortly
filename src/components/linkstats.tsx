import { TbHandClick } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";

function LinkStats() {
  return (
    <div className="flex   justify-between  mt-8  text-VeryDarkBlue">
      <div className="flex gap-5 items-center font-semibold text-lg bg-white p-5 rounded-xl px-10 shadow-md hover:cursor-pointer" title="This is the total number of links you have shortened">
        <p className="flex gap-2 items-center ">
          <FaLink size={25} color="hsl(256, 26%, 33%)" /> Total Links
        </p>
        <p>5</p>
      </div>
      <div className="flex gap-5 items-center font-semibold text-lg bg-white p-5 rounded-xl px-10 shadow-md hover:cursor-pointer" title="This is the total number of clicks gotten from all links summed together">
        <p className="flex gap-2 items-center ">
          <TbHandClick size={25} color="hsl(256, 26%, 33%)" />
          Total clicks
        </p>
        <p>20</p>
      </div>
    </div>
  );
}

export default LinkStats;
