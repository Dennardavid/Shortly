import { redirect } from "next/navigation";

import { createClient } from "../../utils/supbase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <h1>Dashboard</h1>
    </>
  );
}
