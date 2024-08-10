"use client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";

function Modal({ isVisble, onClose }) {
  const [error, setError] = useState("");
  const [formContent, setFormContent] = useState({
    tittle: "",
    longUrl: "",
    customUrl: "",
  });

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error if longUrl is emptied
    if (name === "longUrl") {
      if (value === "") {
        setError("");
        setFormContent({ ...formContent, [name]: value });
        return;
      }

      // Check if the URL is valid
      if (!urlRegex.test(value)) {
        setError("Please enter a valid URL");
        setFormContent({ ...formContent, [name]: value });
        return;
      } else {
        setError("");
      }
    }

    // Update form content
    setFormContent({ ...formContent, [name]: value });
  };

  if (!isVisble) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40 backdrop-blur-sm flex flex-col justify-center items-center"
        id="
      wrapper"
      >
        <form className="w-[30%] relative">
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
            <div className="flex justify-center">
              {formContent.longUrl && !error && (
                <QRCode value={formContent?.longUrl} size={250} />
              )}
            </div>
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
                required
                onChange={handleChange}
                value={formContent.tittle}
              />
              <label htmlFor="longUrl" className="">
                Long Link
              </label>
              <input
                type="text"
                name="longUrl"
                id="longUrl"
                className="w-full rounded-lg p-2"
                placeholder="long URL here..."
                required
                onChange={handleChange}
                value={formContent.longUrl}
              />
              <span className="text-Red">{error}</span>
              <label htmlFor="alias" className="">
                Custom Alias
              </label>
              <input
                type="text"
                name="customUrl"
                id="customUrl"
                className="w-full rounded-lg p-2"
                placeholder="Custom Alias here (Optional)..."
                onChange={handleChange}
                value={formContent.customUrl}
              />
              <button className="rounded-xl p-2 mt-4" type="submit">Shorten Link</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Modal;
