import { createClient } from "../../../utils/supbase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Get the authenticated user
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse the Url_id from the query parameters
  const url = new URL(request.url);
  const urlId = url.searchParams.get("Url_id");

  if (!urlId) {
    return NextResponse.json({ error: "Url_id is required" }, { status: 400 });
  }

  // Fetch the click details for the specific URL based on Url_id
  const { data, error } = await supabase
    .from("URL_Clicks")
    .select("created_at, url_id, country, city, number_of_clicks")
    .eq("url_id", urlId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return the click details
  return NextResponse.json(data, { status: 200 });
}
