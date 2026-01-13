"use client";
import { useUser } from "@/context/user.provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "./Logo";
import { USER_ROLES } from "@/constant";
import { userNavRoutes } from "@/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/services/AuthService";
import NavMobile from "./NavMobile";

export default function Navbar() {
  const { user, setUser } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();

    if (result?.success) {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <div className="border-b bg-sidebar px-4 py-4 flex items-center justify-between">
      <NavMobile />
      <Logo />
      {user?.role === USER_ROLES.USER && (
        <div className="hidden lg:flex items-center gap-6">
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

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="size-10">
            <AvatarImage src={user?.photo} alt={user?.name} />
            <AvatarFallback className="uppercase bg-brand-hover text-xl text-black font-semibold">
              {user?.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
