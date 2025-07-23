// app/(dashboard)/admin/page.tsx

"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ShieldAlert, UserX, UserCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useSwrFetcher } from "@/hooks/useSwrFetcher";

// Define the User type for the admin view
interface UserForAdmin {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  isVerified: boolean;
  createdAt: string;
  id: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const { data, isLoading } = useSwrFetcher(`/api/v1/auth/users`);

  // Placeholder for role change functionality
  const handleRoleChange = (userId: string, newRole: "user" | "admin") => {
    console.log(`Change user ${userId} to role ${newRole}`);
    toast.info("Role change functionality is not yet implemented.");
    // Example API call:
    // await api.put(`/api/v1/users/${userId}/role`, { role: newRole });
  };

  if (!data) return null;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user?.role !== "admin") {
    // This is a fallback in case the redirect is slow
    return (
      <div className="text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-semibold">Access Denied</h2>
        <p className="text-slate-500">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
        <p className="text-slate-500">
          Manage users and content across the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage all registered users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((u: UserForAdmin) => (
                <TableRow key={u._id}>
                  <TableCell className="font-medium">{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={u.role === "admin" ? "default" : "secondary"}
                    >
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {u.isVerified ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200"
                      >
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Not Verified</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {u.role === "user" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRoleChange(u._id, "admin")}
                      >
                        <UserCheck className="h-4 w-4 mr-2" /> Make Admin
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRoleChange(u._id, "user")}
                      >
                        <UserX className="h-4 w-4 mr-2" /> Remove Admin
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
