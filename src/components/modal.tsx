"use client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { toPng } from "html-to-image";
import { createClient } from "../utils/supbase/client";

function Modal({ isVisble, onClose }) {
  const [error, setError] = useState("");
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const [formContent, setFormContent] = useState({
    tittle: "",
    longUrl: "",
    customUrl: "",
  });

  const ref = useRef(null);

  const handleURLChange = (e) => {
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

  const handleModalClose = () => {
    setFormContent({ tittle: "", longUrl: "", customUrl: "" });
    setError("");
    onClose();
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const CreateUrl = async (event) => {
    event.preventDefault();
    const supabase = createClient(); // Initialize Supabase client
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setError("User is not authenticated.");
      return;
    }

    if (!formContent.longUrl || error) return;

    try {
      // Convert the QRCode to a blob
      const node = ref.current;
      if (!node) {
        setError("QR code could not be generated. Please try again.");
        return;
      }

      // Convert the QRCode to a PNG image
      const qrCodeBlob = await toPng(node);

      const response = await fetch("./auth/createURLs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          original_url: formContent.longUrl,
          custom_url: formContent.customUrl,
          user_id: user.id,
          tittle: formContent.tittle,
          qr_code: qrCodeBlob,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log("URL created successfully:", data);
      handleModalClose();
    } catch (error) {
      console.log("Error creating URL:", error);
      setError("Failed to create URL");
    }
  };

  if (!isVisble) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40 backdrop-blur-sm flex flex-col justify-center items-center"
        id="
      wrapper"
      >
        <form className="w-[30%] relative" onSubmit={CreateUrl}>
          <button
            className="bg-transparent absolute -right-1 -top-8"
            type="button"
            onClick={handleModalClose}
          >
            <IoIosCloseCircleOutline size={30} />
          </button>
          <div className="bg-white p-5 rounded-xl shadow-lg ">
            <h1 className="text-2xl text-center font-semibold text-VeryDarkBlue">
              shorten a new link
            </h1>
            <div className="flex justify-center bg-slate-500" ref={ref}>
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
                onChange={handleURLChange}
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
                onChange={handleURLChange}
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
                onChange={handleURLChange}
                value={formContent.customUrl}
              />
              <button className="rounded-xl p-2 mt-4" type="submit">
                Shorten Link
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Modal;
