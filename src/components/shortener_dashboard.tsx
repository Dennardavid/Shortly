"use client";

import { FaRegCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import Modal from "./modal";
import { useEffect, useState } from "react";

export function DashboardShortener() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="mt-7 flex flex-col">
      <div className="flex justify-between mt-9 mb-2">
        <form className="w-4/5">
          <label htmlFor="shortener" className="sr-only">
            shorten links
          </label>
          <input
            type="text"
            name="shortener"
            id="shortener"
            className="w-full"
            placeholder="Shorten your links...."
          />
        </form>
        <button
          className="self-end rounded-xl px-4 py-2 mb-3"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Shorten Link
        </button>
      </div>
      <ShortenedComp />
      <Modal
        isVisble={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}

function ShortenedComp() {
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    fetch("./auth/getURLs")
      .then((res) => res.json())
      .then((data) => {
        setUrls(data);
        return data;
      });
  }, []);

  const downloadQrCode = () => {
    const ImageURL = urls[0].qr_code;
    const fileName = urls[0].tittle;

    const anchor = document.createElement("a");
    anchor.href = ImageURL;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  return (
    <div className="mb-3 flex flex-col gap-4 justify-between">
      {urls.map((url) => (
        <article
          key={url.id}
          className="mb-3 flex justify-between w-full items-center bg-white rounded-xl shadow-lg p-5 "
        >
          <div className="flex gap-5">
            <div className="flex items-center">
              <Image
                src={`${url.qr_code}` || ""}
                alt="qr code"
                width={120}
                height={120}
                className="rounded-sm ring-2 ring-cyan"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-3xl">{url.tittle}</h2>
              <p className="hover:underline text-xl font-semibold text-LightViolet hover:cursor-pointer">
                Shortened URL: {url.short_url}
              </p>
              <p className="hover:underline">
                Original URL: {url.original_url}
              </p>

              <p className="text-xs self-start font-extralight mt-2">
                {new Date(url.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-transparent" onClick={downloadQrCode}>
              <MdOutlineFileDownload size={24} color="hsl(256, 26%, 33%)" />
            </button>
            <button
              className="bg-transparent"
              onClick={() => {
                navigator.clipboard.writeText(url.short_url);
                console.log(`Copied: ${url.short_url}`);
              }}
            >
              <FaRegCopy size={19} color="hsl(256, 26%, 33%)" />
            </button>
            <button className="bg-transparent">
              <MdDeleteOutline size={24} color="hsl(256, 26%, 33%)" />
            </button>
            <button className="rounded-full px-4 py-1">details</button>
          </div>
        </article>
      ))}
    </div>
  );
}
