// components/Navbar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Menu,
  X,
  User,
  PenSquare,
  LogOut,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For a better user menu
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  // ==> 2. Use the context hook to get the shared auth state
  const { user, isLoading, logout } = useAuth();
  console.log(user, isLoading);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // A helper component for the right side of the navbar to keep the main return clean
  const AuthButtons = () => {
    if (isLoading) {
      return <Loader2 className="h-6 w-6 animate-spin text-slate-400" />;
    }

    if (user) {
      return (
        <div className="flex items-center space-x-4">
          <Link href="/write-story">
            <Button
              variant="outline"
              size="sm"
              className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900"
            >
              <PenSquare className="h-4 w-4 mr-2" />
              Write
            </Button>
          </Link>
          <Link href="/dashboard">
            <Avatar className="h-9 w-9 cursor-pointer">
              {/* <AvatarImage src={user.avatarUrl || ""} alt={user.username} /> */}
              <AvatarFallback>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-white hover:text-red-400 hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    // Logged-out user view
    return (
      <div className="flex items-center space-x-2">
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-amber-400 hover:bg-slate-800"
          >
            Sign In
          </Button>
        </Link>
        <Link href="/register">
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-slate-900"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-amber-400" />
            <span className="text-xl font-serif font-bold">StoryNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/stories"
              className={`hover:text-amber-400 transition-colors ${
                isActive("/stories") ? "text-amber-400" : ""
              }`}
            >
              Stories
            </Link>
            <Link
              href="/about"
              className={`hover:text-amber-400 transition-colors ${
                isActive("/about") ? "text-amber-400" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`hover:text-amber-400 transition-colors ${
                isActive("/contact") ? "text-amber-400" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center">
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 absolute w-full left-0">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/stories"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-slate-700 px-5">
            {/* Render AuthButtons for mobile too */}
            <AuthButtons />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
