import { TbHandClick } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";

function LinkStats() {
  return (
    <div className="flex bg-white shadow-md justify-between p-5 rounded-full mt-8 px-10 text-VeryDarkBlue">
      <div className="flex gap-5 items-center font-semibold text-lg">
        <p className="flex gap-2 items-center ">
          <FaLink size={25} color="hsl(257, 27%, 26%)" /> Total Links
        </p>
        <p>5</p>
      </div>
      <div className="flex gap-5 items-center font-semibold text-lg text-VeryDarkBlue">
        <p className="flex gap-2 items-center ">
          <TbHandClick size={25} color="hsl(257, 27%, 26%)" />
          Total clicks
        </p>
        <p>20</p>
      </div>
    </div>
  );
}

export default LinkStats;
