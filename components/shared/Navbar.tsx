"use client";
import { useUser } from "@/context/user.provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "./Logo";
import { USER_ROLES } from "@/constant";
import { userNavRoutes } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div className="border-b bg-sidebar px-3 py-5 flex items-center justify-between">
      <Logo />
      {user?.role === USER_ROLES.USER && (
        <div className="flex items-center gap-6">
          {userNavRoutes.map((route) => (
            <Link
              key={route.path}
              className={`text-sm hover:text-primary p-1 ${
                pathname === route.path && "text-primary"
              }`}
              href={route.path}
            >
              {route.label}
            </Link>
          ))}
        </div>
      )}

      <Avatar className="size-10">
        <AvatarImage src={user?.photo} alt={user?.name} />
        <AvatarFallback className="uppercase bg-brand-hover text-xl text-black font-semibold">
          {user?.name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
