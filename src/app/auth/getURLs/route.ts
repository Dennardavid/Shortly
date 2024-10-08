import { createClient } from "../../../utils/supbase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("URLS")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }); 

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
