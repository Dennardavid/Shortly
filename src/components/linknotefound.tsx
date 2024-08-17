import Image from "next/image";
import Notfound from "../../public/Notfound.png"
function LinkNotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-4 gap-2 text-center text-VeryDarkBlue">
      <p className="font-semibold">Sorry, the link you are trying to access does not exist.</p>
      <Image
        src={Notfound}
        alt="Not Found"
        width={250}
      />
    </div>
  );
}

export default LinkNotFound;