// app/(dashboard)/dashboard/page.tsx

"use client";

import useAuth from "@/hooks/useAuth";
import UserDashboard from "@/components/dashboard/UserDashboard"; // We'll create this
import { Loader2, ShieldAlert } from "lucide-react";
import AllStories from "@/components/dashboard/AllStories";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400 " />
      </div>
    );
  }

  if (user?.role !== "admin" && user?.role !== "super-admin") {
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

      <AllStories />
    </div>
  );
}
