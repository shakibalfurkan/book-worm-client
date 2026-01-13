import Navbar from "@/components/shared/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookWorm",
  description: "Welcome to BookWorm, your personal library.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      <section>{children}</section>
    </section>
  );
}
