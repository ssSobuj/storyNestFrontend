// // app/(dashboard)/layout.tsx

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   BookOpen,
//   PenSquare,
//   User,
//   Shield,
//   LogOut,
//   Edit3,
//   Book,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { useAuthContext } from "@/context/AuthProvider";
// import AuthGuard from "@/components/auth/AuthGuard";
// import { useState } from "react";

// // This is the main layout for any page inside the (dashboard) group
// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, logout } = useAuthContext();
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Dashboard", href: "/dashboard", icon: BookOpen },
//     { name: "Write Story", href: "/write-story", icon: Edit3 },
//     { name: "Edit Story", href: "/profile", icon: PenSquare },
//     { name: "Profile", href: "/profile", icon: User },
//     // Conditionally add the admin link
//     ...(user?.role === "admin"
//       ? [
//           { name: "My Stories", href: "/admin-stories", icon: BookOpen },
//           { name: "All Stories", href: "/all-stories", icon: Book },
//           { name: "Admin Panel", href: "/admin", icon: Shield },
//         ]
//       : []),
//   ];

//   const userMobileLinks = [{ name: "Profile", href: "/profile", icon: User }];
//   return (
//     <AuthGuard>
//       <div className="flex min-h-screen bg-slate-50">
//         <aside className="hidden md:flex w-64 flex-shrink-0 border-r border-slate-200 bg-white p-6 flex-col">
//           <div className="text-2xl font-bold font-serif text-slate-900 mb-10">
//             StoryNest
//           </div>
//           <nav className="flex flex-col space-y-2">
//             {navLinks.map((link) => (
//               <Link key={link.name} href={link.href}>
//                 <Button
//                   variant={pathname === link.href ? "secondary" : "ghost"}
//                   className="w-full justify-start text-sm"
//                 >
//                   <link.icon className="mr-3 h-4 w-4" />
//                   {/* Show full name on desktop */}
//                   {link.name === "Write" ? "Write Story" : link.name}
//                   {link.name === "Admin" ? " Panel" : ""}
//                 </Button>
//               </Link>
//             ))}
//           </nav>
//           <div className="mt-auto">
//             <div className="flex items-center space-x-3 mb-4">
//               <Avatar>
//                 <AvatarFallback>
//                   {user?.username.charAt(0).toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-semibold text-sm">{user?.username}</p>
//                 <p className="text-xs text-slate-500">{user?.email}</p>
//               </div>
//             </div>
//             <Button variant="outline" className="w-full" onClick={logout}>
//               <LogOut className="mr-2 h-4 w-4" />
//               Sign Out
//             </Button>
//           </div>
//         </aside>

//         {/* ======================================================================= */}
//         {/* MAIN CONTENT AREA & MOBILE HEADER                                     */}
//         {/* ======================================================================= */}
//         <div className="flex-1 flex flex-col">
//           {/* Mobile Header - Visible on mobile, hidden on medium screens and up */}
//           <header className="md:hidden sticky top-0 flex items-center justify-between p-4 bg-white border-b z-10">
//             <Link href="/dashboard">
//               <span className="text-xl font-bold font-serif text-slate-900">
//                 StoryNest
//               </span>
//             </Link>

//             {/* User Avatar and Dropdown Menu Trigger */}
//             <div className="relative">
//               <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                 <Avatar className="h-9 w-9">
//                   <AvatarFallback>
//                     {user?.username.charAt(0).toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               </button>

//               {/* Dropdown Menu for Mobile */}
//               {isMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
//                   <div className="px-4 py-2 border-b">
//                     <p className="font-semibold text-sm truncate">
//                       {user?.username}
//                     </p>
//                     <p className="text-xs text-slate-500 truncate">
//                       {user?.email}
//                     </p>
//                   </div>
//                   {userMobileLinks.map((link) => (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <div className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
//                         <link.icon className="mr-3 h-4 w-4" />
//                         {link.name}
//                       </div>
//                     </Link>
//                   ))}
//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
//                   >
//                     <LogOut className="mr-3 h-4 w-4" />
//                     Sign Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           </header>

//           {/* Main Content */}
//           <main className="flex-1 p-4 md:p-8 overflow-auto pb-20 md:pb-8">
//             {children}
//           </main>
//         </div>

//         {/* ======================================================================= */}
//         {/* MOBILE BOTTOM NAV - Visible on mobile, hidden on medium and up          */}
//         {/* ======================================================================= */}
//         <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t p-2 z-10">
//           {navLinks.map((link) => (
//             <Link key={link.name} href={link.href}>
//               <div
//                 className={`flex flex-col items-center p-2 rounded-md ${
//                   pathname === link.href ? "text-blue-600" : "text-slate-500"
//                 }`}
//               >
//                 <link.icon className="h-5 w-5 mb-1" />
//                 <span className="text-xs font-medium">{link.name}</span>
//               </div>
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </AuthGuard>
//   );
// }

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
  Menu, // Icon for the Floating Action Button
  X, // The new CLOSE ICON
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
    // { name: "Edit Story", href: "/edit-story", icon: PenSquare },
    { name: "Profile", href: "/profile", icon: User },
    ...(user?.role === "admin"
      ? [
          { name: "My Stories", href: "/admin-stories", icon: BookOpen },
          { name: "All Stories", href: "/all-stories", icon: Book },
          { name: "Admin Panel", href: "/admin", icon: Shield },
        ]
      : []),
  ];

  // Close the mobile menu automatically when the user navigates
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        {/* DESKTOP SIDEBAR */}
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
          <main className="flex-1 overflow-auto p-4 pb-24 md:p-8 md:pb-8">
            {children}
          </main>
        </div>

        {/* ======================================================================= */}
        {/* MOBILE NAVIGATION - DRAWER AND FLOATING ACTION BUTTON (FAB)           */}
        {/* ======================================================================= */}

        {/* FLOATING ACTION BUTTON (FAB) */}
        <div className="fixed bottom-6 right-6 z-30 lg:hidden">
          <Button
            onClick={() => setIsMobileMenuOpen(true)}
            size="icon"
            className="h-14 w-14 rounded-full bg-amber-600 hover:bg-amber-700 shadow-lg"
          >
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>

        {/* DRAWER AND OVERLAY CONTAINER */}
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
            className={`relative flex h-full w-64 flex-col bg-white p-6 pt-20 shadow-xl transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* 1. HEADER WITH TITLE AND THE NEW CLOSE ICON */}
            <div className="mb-10 flex items-center justify-between">
              <span className="text-2xl font-bold font-serif text-slate-900">
                StoryNest
              </span>
              {/* This is the new close button */}
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
