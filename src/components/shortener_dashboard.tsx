"use client"

import { FaRegCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";


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
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    fetch("/auth/getURLs")
      .then((res) => res.json())
      .then((data) => {
        setUrls(data);
      });
  }, []);

  return (
    <div className="mb-3 flex justify-between">
      {urls.map((url) => (
        <div key={url.id}>
          <Image src={url.qr_code || ''} alt='qr code' width={50} height={50} />
          <p>{url.original_url}</p>
          <p>{url.short_url}</p>
          <div className="flex items-center gap-4">
            <FaRegCopy size={19} />
            <MdDeleteOutline size={20} />
            <button className="rounded-full px-4 py-1">details</button>
          </div>
        </div>
      ))}
    </div>
  );
}
