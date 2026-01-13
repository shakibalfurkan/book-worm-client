"use client";

import { useUser } from "@/context/user.provider";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LuMenu } from "react-icons/lu";
import { Button } from "../ui/button";
import { adminSidebarRoutes, userNavRoutes } from "@/routes";
import Link from "next/link";
import { useState } from "react";

export default function NavMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  const navRoutes = user?.role === "USER" ? userNavRoutes : adminSidebarRoutes;

  return (
    <section className="lg:hidden">
      <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-lg">
            <LuMenu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Routes</SheetTitle>

            {navRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsModalOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground ${
                  pathname === route.path
                    ? "bg-primary/20 hover:bg-primary/18  border-l-4 border-primary"
                    : "text-foreground/70"
                }`}
              >
                <h4>{route.label}</h4>
              </Link>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
}
