import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans", // Use --font-sans for the main font
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono", // Use --font-mono for the monospace font
});

export const metadata = {
  title: "Story Nest | Interactive Storytelling Platform",
  description:
    "Story Nest is an interactive storytelling platform where readers and writers create, explore, and share branching narratives with endless possibilities.",
  keywords: [
    "Story Nest",
    "interactive storytelling",
    "branching narratives",
    "choose your own adventure",
    "creative writing",
    "story platform",
    "writers",
    "readers",
  ],
  authors: [{ name: "Story Nest Team" }],
  openGraph: {
    title: "Story Nest | Interactive Storytelling Platform",
    description:
      "Create, explore, and share branching narratives with endless possibilities on Story Nest.",
    url: "https://storyy-nest.vercel.app/",
    siteName: "Story Nest",
    images: [
      {
        url: "/android-chrome-512x512.png", // Replace with your OG image path
        width: 1200,
        height: 630,
        alt: "Story Nest - Interactive Storytelling Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Story Nest | Interactive Storytelling Platform",
    description:
      "Discover interactive stories, branching narratives, and immersive storytelling on Story Nest.",
    images: ["/android-chrome-192x192.png"],
    creator: "@storynest", // replace with your handle if available
  },
};





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <html lang="en">
      <head>
        <link href="/favicon.png" rel="icon" />
      </head>
      <body className={`${inter.variable} ${jetbrains_mono.variable}`}>
        <AuthProvider>
          <GoogleOAuthProvider clientId={googleClientId}>
            <Navbar />
            {children}
            <ToastContainer autoClose={3000} />
            <Footer />
          </GoogleOAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
