import "../globals.css";
import Dashboard from "./page";

export default function DashBoard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className="bg-Gray h-full">{children}</body>;
}
