"use client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import Image from "next/image";

function UrlDetailsModal({ isVisible, onClose, urlId }) {
  const [urlDetails, setUrlDetails] = useState(null);
  const [clickDetails, setClickDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUrlDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/auth/getClicks?urlId=${urlId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setUrlDetails(data.url);
      setClickDetails(data.clicks);
    } catch (error) {
      setError("Failed to fetch URL details");
      console.error("Error fetching URL details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlId && isVisible) {
      fetchUrlDetails();
    }
  }, [urlId, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 z-40 backdrop-blur-sm flex flex-col justify-center items-center"
      id="wrapper"
    >
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-2xl p-5 relative">
        <button
          className="bg-transparent absolute -top-10 -right-1 hover:bg-transparent hover:text-LightViolet"
          type="button"
          onClick={onClose}
        >
          <IoIosCloseCircleOutline size={40} />
        </button>

        <h2 className="text-lg md:text-xl lg:text-2xl text-center font-semibold text-VeryDarkBlue mb-4">
          URL Details
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && urlDetails && (
          <>
            <div className="mb-4 w-[80%]">
              <h3 className="text-lg font-bold mb-2">Title: {urlDetails.title}</h3>
              <Image
                src={urlDetails.qr_code}
                alt="QR Code"
                width={100}
                height={100}
                className="rounded-sm ring-2 ring-cyan mb-2"
                style={{ width: "auto", height: "auto" }}
              /> 
              <p className="mb-2">Original URL: {urlDetails.original_url}</p>
              <p className="mb-2">Short URL: {urlDetails.short_url}</p>
              
              <p>Created At: {new Date(urlDetails.created_at).toLocaleDateString()}</p>
            </div>

            {clickDetails.length > 0 ? (
              <table className="mt-4 border-collapse border border-gray-200 w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Country</th>
                    <th className="border border-gray-300 p-2">Device</th>
                    <th className="border border-gray-300 p-2">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {clickDetails.map((detail, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 p-2">
                        {new Date(detail.created_at).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.country}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.device}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.number_of_clicks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No click details available for this URL.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UrlDetailsModal;
