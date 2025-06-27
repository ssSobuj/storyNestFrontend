import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-amber-400" />
              <span className="text-xl font-serif font-bold">Story Nest</span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md">
              Your cozy corner of the literary world. Share your tales, discover
              amazing stories, and connect with fellow storytellers in our warm
              community nest.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/stories"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  Browse Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/write-story"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  Write Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-slate-300">
                <Mail className="h-4 w-4" />
                <span>hello@storynest.com</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <MapPin className="h-4 w-4" />
                <span>Literary District, Story City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>
            &copy; 2024 Story Nest. All rights reserved. Made with love for
            storytellers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
