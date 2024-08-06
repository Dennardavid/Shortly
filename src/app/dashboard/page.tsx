import { redirect } from "next/navigation";

import { createClient } from "../../utils/supbase/server";
import LinkStats from "@/components/linkstats";
export default async function Dashboard() {
  /*   const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  } */

  return (
    <main className="bg-Gray px-32 pt-12 h-screen">
      {/*       <p>Hello {data.user.email}</p> */}
      <h1 className="font-bold text-3xl mb-4 text-VeryDarkBlue">Welcome</h1>

      <LinkStats />
   
    </main>
  );
}
