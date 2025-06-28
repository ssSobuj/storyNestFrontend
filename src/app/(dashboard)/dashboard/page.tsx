// app/(dashboard)/dashboard/page.tsx

"use client";

import useAuth from "@/hooks/useAuth";
import UserDashboard from "@/components/dashboard/UserDashboard"; // We'll create this
import AdminDashboard from "@/components/dashboard/AdminDashboard"; // We'll create this
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400 " />
      </div>
    );
  }

  // Role-based rendering
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-slate-500">
          Here's what's happening with your stories today.
        </p>
      </div>

      {user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}
