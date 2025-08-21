// app/(dashboard)/super-admin/page.tsx

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
import {
  Loader2,
  ShieldAlert,
  UserX,
  UserCheck,
  Trash2,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { toast } from "react-toastify";

interface UserForSuperAdmin {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin" | "super-admin";
  isVerified: boolean;
  createdAt: string;
}

export default function SuperAdminPage() {
  const { user: currentUser } = useAuthContext();

  // 2. Fetch data using your hook (default GET method is perfect)
  const { data, isLoading, mutate } = useSwrFetcher(`/api/v1/auth/users`);

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleApiCall = async (
    userId: string,
    action: "promote" | "demote" | "delete"
  ) => {
    setLoadingUserId(userId);

    const apiActions = {
      promote: () => api.put(`/api/v1/auth/users/${userId}/promote`),
      demote: () => api.put(`/api/v1/auth/users/${userId}/demote`),
      delete: () => api.delete(`/api/v1/auth/users/${userId}`),
    };

    try {
      // 3. Perform the mutation using the 'api' instance
      await apiActions[action]();
      toast.success(`User successfully ${action}d.`);

      // 4. Trigger a re-fetch of the user list using the 'mutate' from your hook
      mutate();
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "An unexpected error occurred."
      );
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

  if (currentUser?.role !== "super-admin") {
    return (
      <div className="text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-semibold">Access Denied</h2>
        <p className="text-slate-500">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  // The JSX remains exactly the same
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Super Admin Panel</h1>
        <p className="text-slate-500">
          Manage all users and promote or demote administrators.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User & Admin Management</CardTitle>
          <CardDescription>
            Full control over user roles and access.
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
              {/* Note: The fetched data is now in data, not data.data */}
              {data?.data?.map((u: UserForSuperAdmin) => (
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
                    {u.role === "user" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApiCall(u._id, "promote")}
                        disabled={loadingUserId === u._id}
                      >
                        {loadingUserId === u._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            Promote
                          </>
                        )}
                      </Button>
                    )}
                    {u.role === "admin" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApiCall(u._id, "demote")}
                        disabled={loadingUserId === u._id}
                        className="border-red-700 text-red-700"
                      >
                        {loadingUserId === u._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            {" "}
                            <ShieldX className="h-4 w-4 mr-2" />
                            Demote
                          </>
                        )}
                      </Button>
                    )}
                    {u.role !== "super-admin" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete ${u.username}?`
                            )
                          )
                            handleApiCall(u._id, "delete");
                        }}
                        disabled={loadingUserId === u._id}
                      >
                        {loadingUserId === u._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4" />
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
