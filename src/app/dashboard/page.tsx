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

  const userName: string = data?.user?.user_metadata?.user_name
  
  return (
    <main className="bg-Gray px-6 md:px-10 lg:px-20 pt-12 min-h-screen">
      <nav className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-VeryDarkBlue">
          Welcome, {userName}
        </h1>
        <form action="./auth/signout" method="POST" className="flex items-center">
          <button
            type="submit"
            className="flex px-3 py-1 rounded-full gap-2 items-center"
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