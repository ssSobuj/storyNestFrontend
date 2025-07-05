// app/(dashboard)/layout.tsx

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, PenSquare, User, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthProvider";
import AuthGuard from "@/components/auth/AuthGuard";
import { useState } from "react";

// This is the main layout for any page inside the (dashboard) group
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthContext();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: BookOpen },
    { name: "Write Story", href: "/write-story", icon: PenSquare },
    { name: "Profile", href: "/profile", icon: User },
    // Conditionally add the admin link
    ...(user?.role === "admin"
      ? [{ name: "Admin Panel", href: "/admin", icon: Shield }]
      : []),
  ];

  const userMobileLinks = [{ name: "Profile", href: "/profile", icon: User }];
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        <aside className="hidden md:flex w-64 flex-shrink-0 border-r border-slate-200 bg-white p-6 flex-col">
          <div className="text-2xl font-bold font-serif text-slate-900 mb-10">
            StoryNest
          </div>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm"
                >
                  <link.icon className="mr-3 h-4 w-4" />
                  {/* Show full name on desktop */}
                  {link.name === "Write" ? "Write Story" : link.name}
                  {link.name === "Admin" ? " Panel" : ""}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
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

        {/* ======================================================================= */}
        {/* MAIN CONTENT AREA & MOBILE HEADER                                     */}
        {/* ======================================================================= */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header - Visible on mobile, hidden on medium screens and up */}
          <header className="md:hidden sticky top-0 flex items-center justify-between p-4 bg-white border-b z-10">
            <Link href="/dashboard">
              <span className="text-xl font-bold font-serif text-slate-900">
                StoryNest
              </span>
            </Link>

            {/* User Avatar and Dropdown Menu Trigger */}
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Dropdown Menu for Mobile */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold text-sm truncate">
                      {user?.username}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  {userMobileLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        <link.icon className="mr-3 h-4 w-4" />
                        {link.name}
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 overflow-auto pb-20 md:pb-8">
            {children}
          </main>
        </div>

        {/* ======================================================================= */}
        {/* MOBILE BOTTOM NAV - Visible on mobile, hidden on medium and up          */}
        {/* ======================================================================= */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t p-2 z-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div
                className={`flex flex-col items-center p-2 rounded-md ${
                  pathname === link.href ? "text-blue-600" : "text-slate-500"
                }`}
              >
                <link.icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{link.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </AuthGuard>
  );
}
