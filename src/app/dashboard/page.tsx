import { redirect } from "next/navigation";

import { createClient } from "../../utils/supbase/server";
import LinkStats from "@/components/linkstats";
import { DashboardShortener } from "@/components/shortener_dashboard";
import { MdLogout } from "react-icons/md";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const userName: string = data?.user?.user_metadata?.user_name;
  return (
    <main className="bg-Gray px-32 pt-12 h-full">
      <nav className="flex justify-between items-center">
        <h1 className="font-bold text-3xl mb-4 text-VeryDarkBlue">
          Welcome, {userName}
        </h1>
        <form action="./auth/signout" method="POST">
          <button
            type="submit"
            className="flex items-center px-3 py-1 rounded-full gap-2"
          >
            <MdLogout /> Logout
          </button>
        </form>
      </nav>
      <LinkStats />
      <DashboardShortener />
    </main>
  );
}
