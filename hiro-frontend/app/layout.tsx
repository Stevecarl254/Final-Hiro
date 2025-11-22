import "./globals.css";
import Navbar from "../components/Navbar";
import { Figtree } from "next/font/google";
import type { Metadata } from "next";
import { ReactNode } from "react";
import ClientWrapper from "../components/ClientWrapper";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hiro Catering Services",
  description:
    "One-stop site for all catering equipment, corporate hospitality, and event services.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${figtree.className} bg-gray-50 text-gray-900`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
