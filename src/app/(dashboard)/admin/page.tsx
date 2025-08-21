// app/(dashboard)/admin/page.tsx

"use client";

import { useState } from "react";
import { useAuthContext } from "@/context/AuthProvider";
import { useSwrFetcher } from "@/hooks/useSwrFetcher"; // <-- 1. Use your specific hook
import api from "@/lib/api"; // <-- And your axios instance for mutations

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
import { Loader2, ShieldAlert, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface UserForAdmin {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin" | "super-admin";
  isVerified: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const { user: currentUser } = useAuthContext();

  // 2. Fetch data using your hook
  const { data, isLoading, mutate } = useSwrFetcher(`/api/v1/auth/users`);

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleDeleteUser = async (userId: string, username: string) => {
    if (
      !window.confirm(`Are you sure you want to delete the user: ${username}?`)
    ) {
      return;
    }

    setLoadingUserId(userId);

    try {
      // 3. Perform the mutation using the 'api' instance
      await api.delete(`/api/v1/auth/users/${userId}`);
      toast.success("User deleted successfully.");

      // 4. Trigger a re-fetch using 'mutate' from your hook
      mutate();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete user.");
    } finally {
      setLoadingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!currentUser || !["admin", "super-admin"].includes(currentUser.role)) {
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

  // The JSX remains exactly the same
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
                      variant={
                        u.role === "admin"
                          ? "default"
                          : u.role === "super-admin"
                          ? "destructive"
                          : "secondary"
                      }
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
                    {u.role !== "super-admin" &&
                      currentUser.email !== u.email && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(u._id, u.username)}
                          disabled={loadingUserId === u._id}
                        >
                          {loadingUserId === u._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4 " />
                            </>
                          )}
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
