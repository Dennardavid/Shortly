"use client";

import { FaRegCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import Modal from "./modal";
import Loading from "./urlLoading";
import { useEffect, useState } from "react";

export function DashboardShortener() {
  const [showModal, setShowModal] = useState(false);
  const [urls, setUrls] = useState([]);

  const handleAddUrl = (newUrl) => {
    setUrls((prevUrls) => [...prevUrls, newUrl]);
  };

  return (
    <div className="mt-7 flex flex-col">
      <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-between mt-9 mb-2">
        <form className="md:w-4/5">
          <label htmlFor="search" className="sr-only">
            Search for a link
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full"
            placeholder="Search for a link...."
          />
        </form>
        <button
          className="md:self-end rounded-xl px-4 py-2 mb-3"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Shorten Link
        </button>
      </div>
      <ShortenedComp urls={urls} setUrls={setUrls} />
      <Modal
        isVisble={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onUrlCreated={handleAddUrl}
      />
    </div>
  );
}

function ShortenedComp({ urls, setUrls }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrls() {
      setLoading(true);
      try {
        fetch("./auth/getURLs")
          .then((res) => res.json())
          .then((data) => {
            if (!data.error) {
              setUrls(data);
              setLoading(false);
            } else {
              console.error(data.error);
              setLoading(false);
            }
          });
      } catch (error) {
        console.error("Error fetching URLs:", error);
        setLoading(false);
      }
    }

    fetchUrls();
  }, [setUrls]);

  if (loading) {
    return <Loading />;
  }

  const deleteURl = async (id: Number) => {
    try {
      const response = await fetch("./auth/deleteURLs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send the ID in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to delete URL");
      }

      const data = await response.json();
      console.log("URL deleted:", data);

      // Optionally update the UI by removing the deleted URL from the state
      setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  /* Function to download QR code image */
  const downloadQrCode = async (url) => {
    try {
      const response = await fetch(url.qr_code, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = `${url.tittle || "download"}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      // Release the blob URL after download
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the QR code:", error);
    }
  };

  return (
    <div className="mb-3 flex flex-col gap-4 justify-between bg-Gray">
      {urls.map((url) => (
        <article
          key={url.id}
          className="mb-3 flex flex-col md:flex-row justify-between w-full items-center bg-white rounded-xl shadow-lg p-5 "
        >
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-center">
              <Image
                src={`${url.qr_code}`}
                alt="qr code"
                width={100}
                height={100}
                className="rounded-sm ring-2 ring-cyan"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-lg md:text-2xl lg:text-3xl">
                {url.title}
              </h2>
              <p className="hover:underline md:text-lg lg:text-xl font-semibold text-LightViolet hover:cursor-pointer">
                Shortened URL: {url.short_url}
              </p>
              <p className="hover:underline text-xs lg:text-sm">
                Original URL: {url.original_url}
              </p>

              <p className="text-xs self-start font-extralight mt-2">
                {new Date(url.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            <button
              title="download QR code"
              className="bg-transparent"
              onClick={() => downloadQrCode(url)}
            >
              <MdOutlineFileDownload size={24} color="hsl(256, 26%, 33%)" />
            </button>
            <button
              title="Copy Short URL"
              className="bg-transparent"
              onClick={() => {
                navigator.clipboard.writeText(url.short_url);
                console.log(`Copied: ${url.short_url}`);
              }}
            >
              <FaRegCopy size={19} color="hsl(256, 26%, 33%)" />
            </button>
            <button
              title="Delete shortened URL"
              className="bg-transparent"
              onClick={() => deleteURl(url.id)}
            >
              <MdDeleteOutline size={24} color="hsl(256, 26%, 33%)" />
            </button>
            <button title="View URL stats" className="rounded-full px-4 py-1">
              details
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
