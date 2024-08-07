import { createClient } from "../../../utils/supbase/server";
import { NextResponse } from "next/server";

export async function POST(
  { original_url, custom_url, user_id, tittle },
  qr_code: string
) {
  const supabase = createClient();

  const short_url = Math.random().toString(36).substring(2, 7);
  const filename = `qr_${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("QR_code")
    .upload("file_path", filename);

  if (storageError) {
    console.log("error uploading QR code URLs");
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }
  const qr = `${supabaseUrl}/storage/v1/object/public/QR_code/${filename}`;

  const { data, error } = await supabase
    .from("URLS")
    .insert([{ original_url, custom_url, user_id, tittle, qr_code: qr }]);

  return NextResponse.json(data, { status: 200 });
}
