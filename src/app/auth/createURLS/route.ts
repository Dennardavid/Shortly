import { createClient } from "../../../utils/supbase/server";
import { NextResponse, type NextRequest } from "next/server";
import { Buffer } from "buffer";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();

  const { original_url, short_url, user_id, title, qr_code } = body;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error(authError);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filename = `qr_${title}.png`;

  const ImagePNG = Buffer.from(qr_code, "base64");

  const { error: storageError } = await supabase.storage
    .from("QR_code")
    .upload(filename, ImagePNG, {
      contentType: "image/png", // Set the correct content type
    });

  if (storageError) {
    console.error("Error uploading QR code:", storageError.message);
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }

  const qr = `https://qwyznumhzaledxnrjxtt.supabase.co/storage/v1/object/public/QR_code/${filename}`;

  const { data, error } = await supabase
    .from("URLS")
    .insert([
      {
        original_url,
        short_url,
        user_id,
        title,
        qr_code: qr,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
