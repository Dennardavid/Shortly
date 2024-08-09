import { on } from "events";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";

function Modal({ isVisble, onClose }) {
  if (!isVisble) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40 backdrop-blur-sm flex flex-col justify-center items-center"
        id="
      wrapper"
      >
        <form className="w-[20%] relative">
          <button
            className="bg-transparent absolute -right-1 -top-8"
            onClick={() => {
              onClose();
            }}
          >
            <IoIosCloseCircleOutline size={30} />
          </button>
          <div className="bg-white p-5 rounded-xl shadow-lg ">
            <h1 className="text-2xl text-center font-semibold text-VeryDarkBlue">
              shorten a new link
            </h1>
            {/* <Image src="" alt="qr code" /> */}
            <div className="flex flex-col gap-4 mt-5">
              <label htmlFor="tittle" className="">
                Tittle
              </label>
              <input
                type="text"
                name="tittle"
                id="tittle"
                className="w-full rounded-lg p-2"
                placeholder="Enter URL tittle here..."
              />
              <label htmlFor="link" className="">
                Long Link
              </label>
              <input
                type="text"
                name="link"
                id="link"
                className="w-full rounded-lg p-2"
                placeholder="long URL here..."
              />
              <label htmlFor="alias" className="">
                Custom Alias
              </label>
              <input
                type="text"
                name="alias"
                id="alias"
                className="w-full rounded-lg p-2"
                placeholder="Custom Alias here..."
              />
              <button className="rounded-xl p-2 mt-4">Shorten Link</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Modal;
