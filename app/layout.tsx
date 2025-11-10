import "./globals.css";
import Navbar from "../components/Navbar";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hiro Catering Services",
  description:
    "One-stop site for all catering equipment, corporate hospitality, and event services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${figtree.className} bg-gray-50 text-gray-900`}>
        {/* Always render Navbar here */}
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
