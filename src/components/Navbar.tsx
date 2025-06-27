"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, User, PenTool } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  console.log(user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="h-8 w-8 text-amber-400" />
            <span className="text-xl font-serif font-bold">Story Nest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/stories"
              className={`hover:text-amber-400 transition-colors ${
                isActive("/stories") ? "text-amber-400" : ""
              }`}
            >
              Stories
            </Link>
            <Link
              href="/write-story"
              className={`hover:text-amber-400 transition-colors ${
                isActive("/write-story") ? "text-amber-400" : ""
              }`}
            >
              Write Story
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-amber-400 hover:bg-slate-800"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/write-story">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900"
              >
                <PenTool className="h-4 w-4 mr-2" />
                Write
              </Button>
            </Link>
            {user ? (
              <>
                <p>{user?.username}</p>
                <Button
                  variant="outline"
                  onClick={logout}
                  size="sm"
                  className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900"
                  >
                    Login
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
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-amber-400"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 py-4 space-y-2">
            <Link
              href="/stories"
              className="block px-4 py-2 hover:bg-slate-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/write-story"
              className="block px-4 py-2 hover:bg-slate-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Write Story
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-slate-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 hover:bg-slate-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-slate-700 pt-4 px-4 space-y-2">
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-white hover:text-amber-400"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/write-story" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Write Story
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
