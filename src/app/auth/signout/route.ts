import { createClient } from "../../../utils/supbase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) {
      console.error("Error fetching user:", getUserError.message);
      return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }

    if (user) {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        console.error("Error signing out:", signOutError.message);
        return NextResponse.json({ error: "Error signing out" }, { status: 500 });
      }
    }

    // Revalidate the cache for the homepage
    revalidatePath("/");

    // Redirect to the login page after signing out
    return NextResponse.redirect(new URL("/login", req.url), {
      status: 302,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
