import { createClient } from "../../../utils/supbase/server";


export async function getURLs(user_id) {
    const supabase = createClient();

  const { data, error } = await supabase
    .from("URLS")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log("error fetching URLs");
    return error.message;
  }
  return data;
}
