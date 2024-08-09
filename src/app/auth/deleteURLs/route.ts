import { createClient } from "../../../utils/supbase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const supabase = createClient();

  const { id } = await request.json(); // Get id from the request body

  const { data, error } = await supabase.from("URLS").delete().eq("id", id);

  if (error) {
    console.log("Error deleting URL:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
