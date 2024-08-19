"use client";

import { useState } from "react";

function UrlDetails({ urlId }) {
  const [clickDetails, setClickDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUrlClicks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/auth/getClicks?Url_id=${urlId}`);
      const data = await response.json();

      if (!response.ok) {
        console.error(data.error.message);
        throw new Error(data.error);
      }

      setClickDetails(data);
    } catch (error) {
      setError("Failed to fetch click details");
      console.error("Error fetching URL clicks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        className="rounded-full px-4 py-1 bg-Cyan text-white"
        onClick={fetchUrlClicks}
      >
        Load Details
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-Red">{error}</p>}

      {clickDetails.length > 0 && (
        <table className="mt-4 border-collapse border border-gray-200 w-full">
          <thead>
            <tr className="bg-Gray">
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
                <td className="border border-gray-300 p-2">{detail.country}</td>
                <td className="border border-gray-300 p-2">{detail.city}</td>
                <td className="border border-gray-300 p-2">{detail.number_of_clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UrlDetails;
