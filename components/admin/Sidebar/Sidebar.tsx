"use client";

import { adminSidebarRoutes } from "@/routes";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <section className="bg-sidebar border-r py-4 pl-1 hidden lg:block">
      {adminSidebarRoutes.map((route) => (
        <SidebarItem
          key={route.path}
          title={route.label}
          href={route.path}
          icon={route.icon}
          isActive={route.path === pathname}
        />
      ))}
    </section>
  );
}
