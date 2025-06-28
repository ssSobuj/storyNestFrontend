// app/(dashboard)/layout.tsx

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Loader2,
  BookOpen,
  PenSquare,
  User,
  Shield,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthProvider";
import AuthGuard from "@/components/auth/AuthGuard";

// This is the main layout for any page inside the (dashboard) group
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthContext();
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: BookOpen },
    { name: "Write Story", href: "/write-story", icon: PenSquare },
    { name: "Profile", href: "/profile", icon: User },
    // Conditionally add the admin link
    ...(user?.role === "admin"
      ? [{ name: "Admin Panel", href: "/admin", icon: Shield }]
      : []),
  ];

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white p-6 flex flex-col">
          <div className="text-2xl font-bold font-serif text-slate-900 mb-10">
            StoryNest
          </div>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.name}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                {/* <AvatarImage src={user.avatarUrl || ""} alt={user.username} /> */}
                <AvatarFallback>
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{user?.username}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </AuthGuard>
  );
}
