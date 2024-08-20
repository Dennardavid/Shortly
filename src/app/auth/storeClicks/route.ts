import { UAParser } from "ua-parser-js";
import { createClient } from "../../../utils/supbase/server";
import { NextRequest, NextResponse } from "next/server";

const parser = new UAParser();

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const body = await request.json();

    // Ensure the id field is present in the request body
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "URL ID is required" }, { status: 400 });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error(authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the user-agent string
    const res = parser.getResult();
    const device = res.type || "desktop";

    // Fetch geolocation data
    let city = "Unknown";
    let country = "Unknown";
    try {
      const response = await fetch("https://ipapi.co/json");
      if (response.ok) {
        const geoData = await response.json();
        console.log("Geolocation data:", geoData);
        city = geoData.city || city;
        country = geoData.country_name || country;
      } else {
        console.error("Failed to fetch geolocation data");
      }
    } catch (geoError) {
      console.error("Error fetching geolocation:", geoError);
    }

    // Record the click in the database
    const { error } = await supabase.from("URL_Clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    if (error) {
      console.error("Error inserting click data:", error);
      return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
    }

    return NextResponse.json({ message: "Click recorded successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
