import { createClient } from "../../../utils/supbase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase.from("URLS").select("*");

  if (error) {
    console.log("error fetching URLs");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  console.log("this is from the api route",data);
  return NextResponse.json(data, { status: 200 });
}
