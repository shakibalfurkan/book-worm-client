import Sidebar from "@/components/admin/Sidebar/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookWorm",
  description: "Welcome to BookWorm, your personal library.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-[calc(100vh-89px)] grid grid-cols-1 lg:grid-cols-[17.5rem_1fr]">
      <Sidebar />
      <section className="p-4 overflow-y-auto">{children}</section>
    </section>
  );
}
