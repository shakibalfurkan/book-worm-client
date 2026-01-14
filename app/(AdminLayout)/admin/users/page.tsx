"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { USER_ROLES } from "@/constant";
import { IUser } from "@/context/user.provider";
import { useGetAllUsers, useUpdateUser } from "@/hooks/user.hook";
import { ShieldCheck, UserCog } from "lucide-react";

export default function UserManagement() {
  const { data: users, isPending, error, isError } = useGetAllUsers();

  const { mutate: updateUser } = useUpdateUser();

  const handleUpdateUser = (id: string, userRole: string) => {
    updateUser({
      id,
      role: userRole,
    });
  };

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold font-serif">Manage Users</h2>
      </div>

      <div className="mt-4">
        <Table className="">
          {users?.data?.length === 0 && <TableCaption>No Users</TableCaption>}
          {isError && <TableCaption>{error?.message}</TableCaption>}
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending &&
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                </TableRow>
              ))}
            {users?.data?.map((user: IUser) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Avatar className="rounded-md size-10">
                    <AvatarImage src={user.photo} alt={user?.name} />
                    <AvatarFallback>{user?.name}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.role}</TableCell>

                <TableCell className="text-right pr-6">
                  <Button
                    size="sm"
                    variant={
                      user?.role === USER_ROLES.ADMIN
                        ? "destructive"
                        : "outline"
                    }
                    className={`gap-2 h-8 min-w-32 transition-all duration-200 ${
                      user?.role !== USER_ROLES.ADMIN
                        ? "hover:bg-primary/10 hover:text-primary border-primary/20"
                        : "hover:bg-destructive/90"
                    }`}
                    onClick={() =>
                      handleUpdateUser(
                        user._id,
                        user?.role === USER_ROLES.ADMIN
                          ? USER_ROLES.USER
                          : USER_ROLES.ADMIN
                      )
                    }
                  >
                    {user?.role === USER_ROLES.ADMIN ? (
                      <>
                        <UserCog className="w-3.5 h-3.5" />
                        <span>Make User</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Make Admin</span>
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
