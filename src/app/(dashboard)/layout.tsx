"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  PenSquare,
  User,
  Shield,
  LogOut,
  Edit3,
  Book,
  Menu, // The Menu icon for the new header
  X,
  PanelRightOpen, // The Close icon for the drawer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthProvider";
import AuthGuard from "@/components/auth/AuthGuard";
import { useState, useEffect } from "react";

// This is the main layout for any page inside the (dashboard) group
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthContext();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: BookOpen },
    { name: "Write Story", href: "/write-story", icon: Edit3 },
    { name: "Profile", href: "/profile", icon: User },
  ];

  // Add links if the user is an ADMIN or SUPER-ADMIN
  if (user && ["admin", "super-admin"].includes(user.role)) {
    navLinks.push(
      { name: "My Stories", href: "/admin-stories", icon: BookOpen },
      { name: "All Stories", href: "/all-stories", icon: Book },
      { name: "Admin Panel", href: "/admin", icon: Shield }
    );
  }

  // Add links ONLY if the user is a SUPER-ADMIN
  if (user?.role === "super-admin") {
    navLinks.push({ name: "Super Admin", href: "/super-admin", icon: Shield });
    navLinks.push({ name: "Categories", href: "/categories", icon: PenSquare });
  }

  // Close the mobile menu automatically when the user navigates
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        {/* DESKTOP SIDEBAR (No changes here) */}
        <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white p-6">
          <div className="mb-10 text-2xl font-bold font-serif text-slate-900">
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
                  {link.name}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="mb-4 flex items-center space-x-3">
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

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col">
          {/* ======================================================================= */}
          {/* --- CHANGE START: 1. NEW MOBILE HEADER ADDED ---                        */}
          {/* This header is visible only on small screens (lg:hidden) and contains   */}
          {/* the menu button, app title, and user avatar. It replaces the old FAB.   */}
          {/* ======================================================================= */}
          <header className="lg:hidden sticky top-0 z-20 flex items-center justify-between border-b bg-white p-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <PanelRightOpen className="h-6 w-6" />
            </Button>
            <div className="text-xl font-bold font-serif text-slate-900">
              StoryNest
            </div>
            <Link href="/profile">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
          {/* --- CHANGE END: 2. MAIN PADDING ADJUSTED --- */}
        </div>

        {/* ======================================================================= */}
        {/* MOBILE NAVIGATION - DRAWER AND OVERLAY                                  */}
        {/* ======================================================================= */}

        {/* --- CHANGE END: 3. FLOATING ACTION BUTTON (FAB) REMOVED --- */}

        {/* DRAWER AND OVERLAY CONTAINER (No changes here, it works as before) */}
        <div
          className={`fixed inset-0 z-40 lg:hidden ${
            isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* OVERLAY with fade transition */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
              isMobileMenuOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* DRAWER with slide transition */}
          <div
            className={`relative flex h-full w-64 flex-col bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* 1. HEADER WITH TITLE AND THE CLOSE ICON */}
            <div className="mb-10 flex items-center justify-between">
              <span className="text-2xl font-bold font-serif text-slate-900">
                StoryNest
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6 text-slate-500" />
              </Button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <Button
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm"
                  >
                    <link.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    <span>{link.name}</span>
                  </Button>
                </Link>
              ))}
            </nav>

            {/* User Info and Sign Out */}
            <div className="mt-auto">
              <div className="mb-4 flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm truncate">
                    {user?.username}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
